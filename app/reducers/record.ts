import { IActionWithPayload } from '../actions/helpers';
import { Record } from '../api/logicgate-api/Record';
import { setRecordHelper } from './../actions/record';

export type TRecordState = Record;

export default function record(state: Record[] = [], action: IActionWithPayload<Record>) {
  if (setRecordHelper.test(action)) {
    state = [...state, action.payload];
  }

  return state;
}
