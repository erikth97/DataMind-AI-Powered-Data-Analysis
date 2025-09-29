import { generateUuid } from '../utils/uuid';

const SESSION_KEY = 'askdata:session';

export function useSessionId() {
  const get = (): string => {
    return localStorage.getItem(SESSION_KEY) ?? '';
  };

  const create = (): string => {
    const id = generateUuid();
    localStorage.setItem(SESSION_KEY, id);
    return id;
  };

  const getOrCreate = (): string => {
    const existing = get();
    return existing || create();
  };

  const reset = (): void => {
    localStorage.removeItem(SESSION_KEY);
  };

  const update = (newSessionId: string): void => {
    localStorage.setItem(SESSION_KEY, newSessionId);
  };

  return {
    get,
    create,
    getOrCreate,
    reset,
    update,
    key: SESSION_KEY,
  };
}