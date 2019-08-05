import { IActionWithPayload } from "../actions/helpers";
import { setTokenHelper } from "../actions/account";

export type TAccountState = string;

export default function account(
  state: string = "",
  action: IActionWithPayload<string>
) {
  if (setTokenHelper.test(action)) {
    state = action.payload;
  }

  return state;
}
