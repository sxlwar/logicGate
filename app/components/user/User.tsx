import { Button, Theme, withStyles } from '@material-ui/core';

import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IState } from '../../reducers';
import * as EntriesActions from '../../actions/entries';
import { bindActionCreators } from 'redux';
import LdapClient from '../../services/searchLdap';
import { SearchEntry } from 'ldapjs';

interface EntryProps {
  token: string;

  setEntries(entries: SearchEntry[]): void;

  classes: any;
}

const themes: any = (theme: Theme) => ({
  button: {
    margin: theme.spacing()
  }
});

class EntryComponent extends React.Component<EntryProps> {
  private ldapClient = new LdapClient();

  private fetchUsers = async () => {
    const { setEntries } = this.props;

    await this.ldapClient.connect();
    const searchEntries = await this.ldapClient.searchUsers();
    setEntries(searchEntries);
  };

  public async componentWillUnmount() {
    await this.ldapClient.disconnect();
  }

  public render() {
    const { classes } = this.props;

    return (
      <Button variant="contained" color="primary" onClick={this.fetchUsers} className={classes.button}>
        Fetch User
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<EntryProps> {
  return bindActionCreators(EntriesActions as any, dispatch);
}

// @ts-ignore FIXME
export default connect(
  (state: IState) => ({
    token: state.account
  }),
  mapDispatchToProps
  // @ts-ignore FIXME
)(withStyles(themes)(EntryComponent));
