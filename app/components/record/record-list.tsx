import { Card, Table, Button } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { connect } from 'react-redux';
import { Record } from '../../api/logicgate-api/Record';
import { IState } from '../../reducers';
import { LdapUser } from '../../services/convertToLdapUser';

const styles = require('./record.scss');

interface TableProps {
  classes: any;
  records: Record[];
  entries: LdapUser[];
}

class TableComponent extends React.Component<TableProps> {
  public render() {
    const { records } = this.props;
    
    return (
      <Card className={styles.containerCard}>
        {records.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                {['name', 'id', 'status', 'updated', 'created', 'sequenceId'].map((s, i) => (
                  <TableCell key={i} align="center">{s}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map(row => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.updated!.toDateString()}</TableCell>
                  <TableCell align="center">{row.created!.toDateString()}</TableCell>
                  <TableCell align="center">{row.sequenceId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <h5 style={{ width: '1200px', textAlign: 'center', textIndent: '10px' }}>
            No entries data here, try to click
            <Button variant="contained" color="secondary" className={styles.margin} disabled>
              Add all to Record
            </Button>
            button
          </h5>
        )}
      </Card>
    );
  }
}

// @ts-ignore FIXME
export default connect((state: IState) => ({
  token: state.account,
  entries: state.entries,
  records: state.records
  // @ts-ignore FIXME
}))(TableComponent);
