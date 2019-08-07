import { fetchToken } from '../api/fetchToken';
import React from 'react';
import { connect, Dispatch, DispatchProp } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as AccountActions from '../actions/account';
import { IState } from '../reducers';

interface AppProps extends DispatchProp<string> {
  account: string;
  setToken(token: string): void;
}

class App extends React.Component<AppProps, {}> {
  async componentWillMount() {
    const { account, setToken } = this.props;

    if (!account) {
      const token = await fetchToken();
      setToken(token);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<AppProps> {
  return bindActionCreators(AccountActions as any, dispatch);
}

export default connect(
  (state: IState) => ({
    account: state.account
  }),
  mapDispatchToProps
)(App);
