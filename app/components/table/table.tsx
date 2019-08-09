import { Table } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { connect } from 'react-redux';
import { Record } from '../../api/logicgate-api/Record';
import { IState } from '../../reducers';

interface TableProps {
  classes: any;
  records: Record[];
  entries: any[];
}

class TableComponent extends React.Component<TableProps> {
  public render() {
    const { records } = this.props;
    return (
      records &&
      records.length && (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {['name', 'id', 'status', 'updated', 'created', 'sequenceId'].map((s, i) => (
                  <TableCell key={i}>{s}</TableCell>
                ))}
              </TableRow>
            </TableHead>

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
          </Table>
        </Paper>
      )
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
