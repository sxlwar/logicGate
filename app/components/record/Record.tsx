import {
  Button,
  Card,
  CardActions,
  CircularProgress,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider
} from '@material-ui/core';
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

class RecordComponent extends React.Component<RecordProps> {
  public state = {
    isBtnClick: false,
    open: false
  };
  public async addRecords() {
    this.setState({
      isBtnClick: true
    });
    const { token, entries, setRecords } = this.props;
    const arr: Record[] = [];
    for (let entry of entries) {
      const record = await createContactRecordForLdapUser(token, contactStepId, entry);
      arr.push(record);
    }
    this.setState({
      isBtnClick: false
    });
    setRecords(arr);

    this.setState({
      open: true
    });
    setTimeout(() => {
      this.setState({
        open: false
      });
    }, 4000);
  }

  public render() {
    const { records } = this.props;
    return (
      <Card className={styles.containerCard}>
        <h3 style={{ textIndent: '10px' }}>
          Step2. post to logicgate
          <br />
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={() => this.addRecords()}
            style={{ margin: '10px' }}
          >
            Add all to Record {this.state.isBtnClick ? <CircularProgress /> : ''}
          </Button>
        </h3>
        <Divider />
        <Table size="small">
          <TableHead>
            <TableRow>
              {['name', 'id', 'status', 'updated', 'created', 'sequenceId'].map((s, i) => (
                <TableCell key={i}>{s}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {records.length > 0 ? (
            <TableBody>
              {records.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.updated!.toDateString()}</TableCell>
                  <TableCell align="right">{row.created!.toDateString()}</TableCell>
                  <TableCell align="right">{row.sequenceId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody />
          )}
        </Table>

        <CardActions>
          {records.length > 0 ? (
            ''
          ) : (
            <h5 style={{ width: '1200px', textAlign: 'center', textIndent: '10px' }}>
              No entries data here, try to click
              <Button variant="contained" size="small" color="secondary" style={{ margin: 'auto 5px' }} disabled>
                Add all to Record
              </Button>
              button
            </h5>
          )}
        </CardActions>
        <Snackbar
          open={this.state.open}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          message={<span>all data lodaed from origin</span>}
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
