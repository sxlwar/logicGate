import { Table } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field } from '../../api/logicgate-api/Field';
import { IState } from '../../reducers';

interface TableProps {
  classes: any;
  records: Field[];
}

function createData(name: string, id: string, status: string, updated: string, created: string, sequenceId: string) {
  return { name, id, status, updated, created, sequenceId };
}

const rows = [
  createData('name1', 'id', 'status', 'updated', 'created', 'sequenceId'),
  createData('name2', 'id', 'status', 'updated', 'created', 'sequenceId'),
  createData('name3', 'id', 'status', 'updated', 'created', 'sequenceId'),
  createData('name4', 'id', 'status', 'updated', 'created', 'sequenceId'),
  createData('name5', 'id', 'status', 'updated', 'created', 'sequenceId'),
  createData('name6', 'id', 'status', 'updated', 'created', 'sequenceId'),
  createData('name7', 'id', 'status', 'updated', 'created', 'sequenceId'),
  createData('name8', 'id', 'status', 'updated', 'created', 'sequenceId'),
  createData('name9', 'id', 'status', 'updated', 'created', 'sequenceId'),
  createData('name10', 'id', 'status', 'updated', 'created', 'sequenceId')
];

class TableComponent extends React.Component<TableProps> {
  private renderCaseCaculator() {
    return !!(this.props as TableProps).records && Array.isArray((this.props as TableProps).records);
  }

  public render() {
    // 有记录时，才渲染
    return this.renderCaseCaculator ? (
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
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {' '}
                  {row.name}{' '}
                </TableCell>
                <TableCell align="inherit">{row.name}</TableCell>
                <TableCell align="inherit">{row.created}</TableCell>
                <TableCell align="inherit">{row.id}</TableCell>
                <TableCell align="inherit">{row.sequenceId}</TableCell>
                <TableCell align="inherit">{row.status}</TableCell>
                <TableCell align="inherit">{row.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    ) : (
      ''
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
