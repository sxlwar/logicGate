import { Record } from '../api/logicgate-api/Record';
import { actionCreator } from './helpers';

export const setRecordHelper = actionCreator<Record[]>('SET_RECORD');

export function setRecords(payload: Record[]) {
  return (dispatch: Function) => {
    dispatch(setRecordHelper(payload));
  };
}
