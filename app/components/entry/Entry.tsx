import { Button, Card, CardActions, Divider, Snackbar, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as EntriesActions from '../../actions/entries';
import { IState } from '../../reducers';
import convertToLdapUser, { LdapUser } from '../../services/convertToLdapUser';
import LdapClient, { searchOptions } from '../../services/searchLdap';

const styles = require('./entry.scss');

interface EntryProps {
  token: string;
  setEntries(entries: LdapUser[]): void;
  classes: any;
}

interface EntryState {
    loading: boolean;
    showSnack: boolean;
}

class EntryComponent extends React.Component<EntryProps, EntryState> {
  private ldapClient = new LdapClient();

  public state = {
    loading: false,
    showSnack: false,
  };

  private tipMessage: string = 'Fetch user across ldap success!'

  private fetchUsers = async () => {
    this.setState({ loading: true });
    const { setEntries } = this.props;
    await this.ldapClient.connect();
    const searchEntries = await this.ldapClient.searchUsers();
    const ldapUsers = searchEntries.map(e => convertToLdapUser(e));
    setEntries(ldapUsers);
    this.setState({ loading: false, showSnack: true });
    this.hideSnack();
  };

  private hideSnack() {
      setTimeout(() => {
        this.setState({showSnack: false})
      }, 3000);
  }

  public async componentWillUnmount() {
    await this.ldapClient.disconnect();
  }

  public render() {
    return (
      <Card style={{ width: '1200px' }}>
        <form className={styles.form}>
          <h3>Step1. fetch user</h3>
          <Divider />
          <h4>base config of entries (readonly)</h4>
          <TextField label="scope" className={styles.input} value="exampleScope" variant="outlined" />
          <TextField label="filter" className={styles.input} value="exampleFilter" variant="outlined" />
          <br />
          {searchOptions.attributes.map((attr: string, index) => (
            <TextField
              label={'attributes.' + attr}
              className={styles.input}
              value={attr}
              key={index}
              variant="outlined"
            />
          ))}
        </form>
        <CardActions>
          <Button variant="contained" color="primary" onClick={this.fetchUsers}>
            Fetch User
            {this.state.loading ? <CircularProgress color="secondary" className={styles.marginLeft} /> : ''}
          </Button>
        </CardActions>
        <Snackbar
          open={this.state.showSnack}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          message={<span>{this.tipMessage}</span>}
        />
      </Card>
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
)(EntryComponent);
