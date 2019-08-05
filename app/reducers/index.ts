import { combineReducers, Reducer } from "redux";
import { routerReducer as routing } from "react-router-redux";
import account, { TAccountState } from "./account";

const rootReducer = combineReducers({
  account,
  routing: routing as Reducer<any>
});

export interface IState {
  account: TAccountState;
}

export default rootReducer;
