import {COMPETITION_LIST_URL, TEAM_LIST_URL} from './settings';
import {TCompetition, TCompetitionPayload, TTeam, TTeamPayload} from './types';

async function load<T = TCompetitionPayload | TTeamPayload>(url: string, errorMessage: string): Promise<T> {
  const headers: HeadersInit = new Headers();
  headers.set('X-Auth-Token', process.env.REACT_APP_API_KEY as string);

  let response;
  try {
    response = await fetch(url, {headers});
  } catch (err) {
    const {message} = (err as Error);
    throw new Error(`${errorMessage}. Возможно, превышен лимит запросов. Попробуйте позже. (${message})`);
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
  if (!response.ok) {
    throw new Error(`${errorMessage}. Код ошибки - ${response.status}`);
  }

  return await response.json();
}

export async function loadCompetitionList(): Promise<Array<TCompetition>> {
  const payload: TCompetitionPayload = await load<TCompetitionPayload>(
      COMPETITION_LIST_URL,
      'Не удалось загрузить список лиг',
  );
  return payload.competitions;
}

export async function loadTeamList(): Promise<Array<TTeam>> {
  const payload: TTeamPayload = await load<TTeamPayload>(
      TEAM_LIST_URL,
      'Не удалось загрузить список команд',
  );
  return payload.teams;
}