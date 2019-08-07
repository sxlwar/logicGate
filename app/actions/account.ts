import { actionCreator } from './helpers';

export const setTokenHelper = actionCreator('SET_ACCESS_TOKEN');

export function setToken(payload: string) {
  return (dispatch: Function) => {
    dispatch(setTokenHelper(payload));
  };
}
