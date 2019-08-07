import { Button, Theme, withStyles } from '@material-ui/core';
import { ifError } from 'assert';
import { createClient, SearchCallbackResponse, SearchEntry, LDAPResult, Client } from 'ldapjs';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IState } from '../../reducers';
import * as EntriesActions from '../../actions/entries';
import { bindActionCreators } from 'redux';

function getClient(adSuffix: string): Client {
  const dn = `cn=read-only-admin,${adSuffix}`;
  const pw = 'password';
  const client = createClient({
    url: 'ldap://ldap.forumsys.com'
  });

  client.bind(dn, pw, err => {
    ifError(err);
  });

  return client;
}

interface EntryProps {
  token: string;
  setEntries(e: SearchEntry[]): void;
  classes: any;
}

const themes: any = (theme: Theme) => ({
  button: {
    margin: theme.spacing()
  }
});

class EntryComponent extends React.Component<EntryProps> {
  private readonly adSuffix = 'dc=example,dc=com';

  private searchOptions = {
    filter: `(mail=*@ldap.forumsys.com)`,
    scope: 'sub',
    attributes: ['dn', 'cn', 'givenName', 'sn', 'telephoneNumber', 'mail', 'manager', 'objectClass']
  };

  private client: Client = getClient(this.adSuffix);

  private fetchUser = () => {
    this.client.search(this.adSuffix, this.searchOptions, (err: Error | null, res: SearchCallbackResponse) => {
      ifError(err);

      const entries: SearchEntry[] = [];

      // listen searchEntry even to get all
      res.on('searchEntry', (entry: SearchEntry) => {
        entries.push(entry);
      });

      // listen searchEntry even to get all
      res.on('end', (result: LDAPResult) => {
        const { setEntries } = this.props;

        if (result.status === 0) {
          // 0 success;
          setEntries(entries);

          console.log(entries);
          const first = entries[0].json;
          console.log(first);
        }
      });
    });
  };

  public componentWillUnmount() {
    this.client.unbind(err => {
      ifError(err);
      console.log('unbind success, disconnect now!');
    });
  }

  public render() {
    const { classes } = this.props;

    return (
      <Button variant="contained" color="primary" onClick={this.fetchUser} className={classes.button}>
        Fetch User
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<EntryProps> {
  return bindActionCreators(EntriesActions as any, dispatch);
}

export default connect(
  (state: IState) => ({
    token: state.account
  }),
  mapDispatchToProps
)(withStyles(themes)(EntryComponent));
