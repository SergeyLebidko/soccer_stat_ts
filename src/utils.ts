import {COMPETITION_LIST_URL, TEAM_LIST_URL} from './settings';

// Защита типа для корректного чтения сообщений об ошибках в блоках catch
function isError(e: unknown): e is Error {
  return e instanceof Error;
}

async function load(url: string, errorMessage: string): Promise<any> {
  const headers: HeadersInit = new Headers();
  headers.set('X-Auth-Token', process.env.REACT_APP_API_KEY as string);

  let response;
  try {
    response = await fetch(url, {headers});
  } catch (err) {
    if (isError(err)) {
      throw new Error(`${errorMessage}. Возможно, превышен лимит запросов. Попробуйте позже. (${err.message})`);
    }
    return;
  }

  if (response.status === 403) {
    throw new Error(`${errorMessage}. Данные не доступны для вашего тарифного плана.`);
  }
  if (response.status === 404) {
    throw new Error(`${errorMessage}. Запрошенные данные отсутствуют на сервере.`);
  }
  if (response.status === 429) {
    throw new Error(`${errorMessage}. Превышен лимит количества запросов. Попробуйте позже.`);
  }

  const json = await response.json();

  if (response.status === 400) throw new Error(`${errorMessage}. (${json.message}).`);
  if (!response.ok) throw new Error(`${errorMessage}. Код ошибки - ${response.status}`);

  return json;
}

export function loadCompetitionList() {
  return load(COMPETITION_LIST_URL, 'Не удалось загрузить список лиг');
}

export function loadTeamList() {
  return load(TEAM_LIST_URL, 'Не удалось загрузить список команд');
}
