import {COMPETITION_URL, PAGE_SIZE, TEAM_URL} from './settings';
import {
  ApiPayload,
  TCompetition, TCompetitionCalendarPayload,
  TCompetitionListPayload,
  TMatch,
  TTeam, TTeamCalendarPayload,
  TTeamListPayload,
} from './types';

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

// eslint-disable-next-line max-len
export async function loadCompetitionCalendar(id: string): Promise<Array<TMatch>> {
  const payload = await load<TCompetitionCalendarPayload>(
      `${COMPETITION_URL}${id}/matches/`,
      'Не удалось загрузить календарь лиги',
  );
  return payload.matches;
}

export async function loadTeamCalendar(id: string): Promise<Array<TMatch>> {
  const payload = await load<TTeamCalendarPayload>(
      `${TEAM_URL}${id}/matches/`,
      'Не удалось загрузить календарь команды',
  );
  return payload.matches;
}

// Вспомогательные функции
const getRandomLetter = (sequence: string): string => sequence[Math.floor(Math.random() * sequence.length)];

export function createRandomString(size = 8): string {
  const result = [];
  for (let index = 0; index < size; index++) {
    result.push(getRandomLetter('QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm'));
  }
  return result.join('');
}

export function getPaginatedList<T = any>(list: Array<T>, pageStart: number): Array<T> {
  return list.filter((_, index) => index >= pageStart && index <= (pageStart + PAGE_SIZE - 1));
}

export function getDateString(rawData: string):string {
  const date = new Date(Date.parse(rawData));
  const day = ('00' + date.getDate()).slice(-2);
  const mon = ('00' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hour = ('00' + date.getHours()).slice(-2);
  const min = ('00' + date.getMinutes()).slice(-2);
  return `${day}.${mon}.${year} ${hour}:${min}`;
}
