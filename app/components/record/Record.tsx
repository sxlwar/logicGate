import { Button } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';

import React from 'react';
import { connect } from 'react-redux';

import { baseUrl } from '../../config/endpoint';
import { IState } from '../../reducers';
import createContactRecordForLdapUser from '../../services/createContactRecordForLdapUser';
import { contactStepId } from '../../config/logicgate';
import { SearchEntry } from 'ldapjs';
import convertToLdapUser from '../../services/convertToLdapUser';

const themes: any = (theme: Theme) => ({
  button: {
    margin: theme.spacing()
  }
});

interface RecordProps {
  classes: any;
  token: string;
  entries: SearchEntry[];
}

class RecordComponent extends React.Component<RecordProps> {
  public async addRecords() {
    console.log('> addRecords', this.props);

    const { token, entries } = this.props;
    await Promise.all(
      entries
        .map(convertToLdapUser)
        .map(async ldapUser => await createContactRecordForLdapUser(baseUrl, token, contactStepId, ldapUser))
    );

    console.log('created');
  }

  public render() {
    const { classes } = this.props;

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
  entries: state.entries
  // @ts-ignore FIXME
}))(withStyles(themes)(RecordComponent));
