import { combineReducers, Reducer } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import account, { TAccountState } from './account';
import entries, { TEntriesState } from './entries';
import record, { TRecordState } from './record';

const rootReducer = combineReducers({
  account,
  entries,
  record,
  routing: routing as Reducer<any>
});

export interface IState {
  account: TAccountState;
  entries: TEntriesState;
  records: TRecordState;
}

export default rootReducer;
