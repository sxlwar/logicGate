import { setEntriesHelper } from '../actions/entries';
import { IActionWithPayload } from '../actions/helpers';
import { LdapUser } from '../services/convertToLdapUser';

export type TEntriesState = LdapUser[];

export default function entries(state: LdapUser[] = [], action: IActionWithPayload<LdapUser[]>) {
  if (setEntriesHelper.test(action)) {
    state = action.payload;
  }

  return state;
}
