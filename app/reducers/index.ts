import { combineReducers, Reducer } from "redux";
import { routerReducer as routing } from "react-router-redux";
import account, { TAccountState } from "./account";
import entries, { TEntriesState } from './entries';

const rootReducer = combineReducers({
  account,
  entries,
  routing: routing as Reducer<any>
});

export interface IState {
  account: TAccountState;
  entries: TEntriesState;
}

export default rootReducer;
