import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import account, { TAccountState } from './account';
import entries, { TEntriesState } from './entries';
import records, { TRecordState } from './records';

const rootReducer = combineReducers({
  account,
  entries,
  records,
  routing: routing as Reducer<any>
});

export interface IState {
  account: TAccountState;
  entries: TEntriesState;
  records: TRecordState;
}

export default rootReducer;
