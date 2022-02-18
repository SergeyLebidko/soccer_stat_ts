// Размер страницы для пагинатора
export const PAGE_SIZE = 18;

const URL_PREFIX = 'https://api.football-data.org/v2';

export const COMPETITION_URL = `${URL_PREFIX}/competitions/`;
export const TEAM_URL = `${URL_PREFIX}/teams/`;

export const STATUS_LIST: any = {
  'SCHEDULED': 'Запланирован',
  'LIVE': 'В прямом эфире',
  'IN_PLAY': 'В игре',
  'PAUSED': 'Пауза',
  'FINISHED': 'Завершен',
  'POSTPONED': 'Отложен',
  'SUSPENDED': 'Приостановлен',
  'CANCELED': 'Отменен',
};

