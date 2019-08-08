import { Button } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import { SearchEntry } from 'ldapjs';
import React from 'react';
import { connect } from 'react-redux';
import { Record } from '../../api/logicgate-api/Record';
import { baseUrl } from '../../config/endpoint';
import { contactStepId } from '../../config/logicgate';
import { IState } from '../../reducers';
import convertToLdapUser from '../../services/convertToLdapUser';
import createContactRecordForLdapUser from '../../services/createContactRecordForLdapUser';

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

class RecordComponent extends React.Component {
  /**
   * 将 convert(ldap) => Record;
   */
  public async addRecords() {
    const { token, entries, setRecords } = this.props as RecordProps;
    console.log('> addRecords', this.props);

    const response = await Promise.all(
      entries
        .map(convertToLdapUser)
        .map(ldapUser => createContactRecordForLdapUser(baseUrl, token, contactStepId, ldapUser))
    );
    response.map(res => setRecords(res));

    console.log('created');
  }
  public render() {
    const { classes } = this.props as RecordProps;

    return (
      <Button variant="contained" color="secondary" onClick={() => this.addRecords()} className={classes.button}>
        Add Record
      </Button>
    );
  }
}

// @ts-ignore FIXME
export default connect((state: IState) => ({
  token: state.account,
  entries: state.entries,
  records: state.records
  // @ts-ignore FIXME
}))(withStyles(themes)(RecordComponent));
