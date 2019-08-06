import { IActionWithPayload } from "../actions/helpers";
import { setEntriesHelper } from "../actions/entries";
import { SearchEntry } from "ldapjs";

export type TEntriesState = SearchEntry[];

export default function entries(
  state: SearchEntry[] = [],
  action: IActionWithPayload<SearchEntry[]>
) {
  if (setEntriesHelper.test(action)) {
    state = action.payload;
  }

  return state;
}
