import { Button, Card, CardActions, CircularProgress, Divider, Snackbar, TextField } from '@material-ui/core';

import { SearchEntry } from 'ldapjs';
import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as RecordActions from '../../actions/records';
import { Record } from '../../api/logicgate-api/Record';
import { contactStepId } from '../../config/logicgate';
import { IState } from '../../reducers';
import createContactRecordForLdapUser from '../../services/createContactRecordForLdapUser';

const styles = require('./record.scss');

interface RecordProps {
  classes: any;
  token: string;
  entries: SearchEntry[];
  setRecords(records: Record[]): void;
  records: Record[];
}

interface RecordState {
  loading: boolean;
  showSnack: boolean;
  tipMessage: string;
}

class RecordComponent extends React.Component<RecordProps, RecordState> {
  public state = {
    loading: false,
    showSnack: false,
    tipMessage: 'please excute step1 before post to logicgate!'
  };

  public async addRecords() {
    if (!this.props.entries || this.props.entries.length === 0) {
      this.setState({ showSnack: true });
      this.hideSnack();
      return;
    }

    this.setState({
      loading: true,
      tipMessage: 'please excute step1 before post to logicgate!'
    });

    const { token, entries, setRecords } = this.props;
    const arr: Record[] = [];

    /**
     * The server may have a frequency limit.
     * Using the promise.all concurrent request will cause a server error, so use 'for of' loop request instead.
     */
    for (let entry of entries) {
      const record = await createContactRecordForLdapUser(token, contactStepId, entry);
      arr.push(record);
    }

    setRecords(arr);

    this.setState({
      loading: false,
      showSnack: true,
      tipMessage: 'all data lodaed from origin'
    });
  }

  /**
   * !FIXME without this function, snack bar cannot disappear. autoHideDuration has no effect;
   * 
   * use a global snake instead.
   */
  private hideSnack() {
      setTimeout(() => {
        this.setState({showSnack: false})
      }, 3000);
  }

  public render() {
    return (
      <Card className={styles.containerCard}>
        <h3>Step2. post to logicGate</h3>
        <Divider />
        <h4>base credential (readonly)</h4>
        <TextField label="username" className={styles.margin} value="exampleUsername" variant="outlined" />
        <TextField label="password" className={styles.margin} value="examplePassword" variant="outlined" />
        <TextField label="access_token" className={styles.margin} value="exampleAccessToken" variant="outlined" />

        <CardActions>
          <Button variant="contained" color="secondary" onClick={() => this.addRecords()} className={styles.margin}>
            Add all to Record {this.state.loading ? <CircularProgress /> : ''}
          </Button>
        </CardActions>
        <Snackbar
          open={this.state.showSnack}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          message={<span>{this.state.tipMessage}</span>}
        />
      </Card>
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
    entries: state.entries,
    records: state.records
  }),
  mapDispatchToProps
)(RecordComponent);
