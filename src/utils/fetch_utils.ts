import {COMPETITION_URL, TEAM_URL} from '../settings';
import {
  ApiPayload,
  TCompetition,
  TCompetitionCalendarPayload,
  TCompetitionListPayload,
  TMatch,
  TTeam,
  TTeamCalendarPayload,
  TTeamListPayload,
} from '../types';

// Сетевые функции
async function load<T = ApiPayload>(url: string, errorMessage: string): Promise<T> {
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
  const payload = await load<TCompetitionListPayload>(
      COMPETITION_URL,
      'Не удалось загрузить список лиг',
  );
  return payload.competitions;
}

export async function loadTeamList(): Promise<Array<TTeam>> {
  const payload = await load<TTeamListPayload>(
      TEAM_URL,
      'Не удалось загрузить список команд',
  );
  return payload.teams;
}

export async function loadCompetitionCalendar(id: string, from: string, to: string): Promise<Array<TMatch>> {
  const payload = await load<TCompetitionCalendarPayload>(
      `${COMPETITION_URL}${id}/matches/${!!from && !!to ? `?dateFrom=${from}&dateTo=${to}` : ''}`,
      'Не удалось загрузить календарь лиги',
  );
  return payload.matches;
}

export async function loadTeamCalendar(id: string, from: string, to: string): Promise<Array<TMatch>> {
  const payload = await load<TTeamCalendarPayload>(
      `${TEAM_URL}${id}/matches/${!!from && !!to ? `?dateFrom=${from}&dateTo=${to}` : ''}`,
      'Не удалось загрузить календарь команды',
  );
  return payload.matches;
}

export async function loadTeam(id: string): Promise<TTeam> {
  return await load<TTeam>(
      `${TEAM_URL}${id}/`,
      'Не удалось получить сведения о команде',
  );
}

export async function loadCompetition(id: string): Promise<TCompetition> {
  return await load<TCompetition>(
      `${COMPETITION_URL}${id}/`,
      'Не удалось получить сведения о лиге',
  );
}
