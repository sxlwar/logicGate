import { Button } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';

import { SearchEntry } from 'ldapjs';
import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as RecordActions from '../../actions/records';
import { Record } from '../../api/logicgate-api/Record';
import { contactStepId } from '../../config/logicgate';
import { IState } from '../../reducers';
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
  setRecords(records: Record[]): void;
}

class RecordComponent extends React.Component<RecordProps> {
  public async addRecords() {
    const { token, entries, setRecords } = this.props;
    const record = await createContactRecordForLdapUser(token, contactStepId, entries[0]);
    const record1 = await createContactRecordForLdapUser(token, contactStepId, entries[1]);
    const record2 = await createContactRecordForLdapUser(token, contactStepId, entries[2]);

    console.log(record, record1, record2);

    // const response = await Promise.all(
    //   entries
    //     .map(ldapUser => createContactRecordForLdapUser(token, contactStepId, ldapUser))
    // ).catch(err => {
    //   console.error('create contact record error :', err);
    // });

    // console.log(response);
    // setRecords(response || []);
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
