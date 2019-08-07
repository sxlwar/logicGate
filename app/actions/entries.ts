import { actionCreator } from './helpers';
import { SearchEntry } from 'ldapjs';

export const setEntriesHelper = actionCreator('SET_ENTRIES');

export function setEntries(payload: SearchEntry[]) {
  return (dispatch: Function) => {
    dispatch(setEntriesHelper(payload));
  };
}
