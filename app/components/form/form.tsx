import React from 'react';
import { connect } from 'react-redux';
import { Record } from '../../api/logicgate-api/Record';
import { IState } from '../../reducers';
import { LdapUser } from '../../services/convertToLdapUser';
import { searchOptions } from '../../services/searchLdap';
import { TextField, Box } from '@material-ui/core';
import { style } from '@material-ui/system';
const styles = require('./form.scss');
interface FormProps {
  classes: any;
  records: Record[];
  entries: LdapUser[];
}

class FormComponent extends React.Component<FormProps> {
  public render() {
    return (
      <Box color="common.white" className={styles.whiteBoard}>
        <form className={styles.form}>
          <p>[base config of entries]</p>
          <h3>scope</h3>
          <TextField className={styles.input} disabled value={searchOptions.scope} />
          <br />
          <h3>filter</h3>
          <TextField className={styles.input} disabled value={searchOptions.filter} />
          <br />
          <br />
          <h3>attributes: </h3>
          {searchOptions.attributes.map((attr: string, index) => (
            <TextField className={styles.input} value={attr} key={index} disabled />
          ))}
        </form>
      </Box>
    );
  }
}

// @ts-ignore FIXME
export default connect((state: IState) => ({
  token: state.account,
  entries: state.entries,
  records: state.records
  // @ts-ignore FIXME
}))(FormComponent);
