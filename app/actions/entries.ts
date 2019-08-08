import { actionCreator } from './helpers';
import { LdapUser } from '../services/convertToLdapUser';

export const setEntriesHelper = actionCreator('SET_ENTRIES');

export function setEntries(payload: LdapUser[]) {
  return (dispatch: Function) => {
    dispatch(setEntriesHelper(payload));
  };
}
