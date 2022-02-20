// Вспомогательные функции
import {PAGE_SIZE} from '../settings';

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

export function getDateString(dateString: string): string {
  const date = new Date(Date.parse(dateString));
  const day = ('00' + date.getDate()).slice(-2);
  const mon = ('00' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hour = ('00' + date.getHours()).slice(-2);
  const min = ('00' + date.getMinutes()).slice(-2);
  return `${day}.${mon}.${year} ${hour}:${min}`;
}
