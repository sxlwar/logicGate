import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import { SearchEntry } from 'ldapjs';
import { Record } from '../../api/logicgate-api/Record';
import { baseUrl } from '../../config/endpoint';
import { contactStepId } from '../../config/logicgate';
import { IState } from '../../reducers';
import convertToLdapUser from '../../services/convertToLdapUser';
import createContactRecordForLdapUser from '../../services/createContactRecordForLdapUser';
import * as RecordActions from '../../actions/record';

const themes: any = (theme: Theme) => ({
  button: {
    margin: theme.spacing()
  }
});

interface RecordProps {
  classes: any;
  token: string;
  entries: SearchEntry[];
  setRecords(records: Record): void;
}

class RecordComponent extends React.Component<RecordProps> {
  /**
   * 将 convert(ldap) => Record;
   */
  public async addRecords() {
    const { token, entries, setRecords } = this.props;
    console.log('> addRecords', this.props);

    const response = await Promise.all(
      entries
        .map(e => convertToLdapUser(e))
        .map(ldapUser => createContactRecordForLdapUser(baseUrl, token, contactStepId, ldapUser))
    );

    console.log('created!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(response);
    response.map(r => setRecords(r));
  }
  public render() {
    const { classes, entries } = this.props;
    console.log(entries);

    return (
      <Button variant="contained" color="secondary" onClick={() => this.addRecords()} className={classes.button}>
        Add Record
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<IState>): Partial<RecordProps> {
  return bindActionCreators(RecordActions as any, dispatch);
}

// @ts-ignore FIXME
export default connect(
  (state: IState) => ({
    token: state.account,
    entries: state.entries
  }),
  mapDispatchToProps
)(withStyles(themes)(RecordComponent));
