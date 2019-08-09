import { IActionWithPayload } from '../actions/helpers';
import { Record } from '../api/logicgate-api/Record';
import { setRecordHelper } from '../actions/records';

export type TRecordState = Record[];

export default function records(state: Record[] = [], action: IActionWithPayload<Record[]>) {
  if (setRecordHelper.test(action)) {
    state = action.payload;
  }

  return state;
}
