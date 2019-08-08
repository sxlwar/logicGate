import { Table } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { SearchEntry } from 'ldapjs';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import React from 'react';
import { Field } from '../../api/logicgate-api/Field';

interface TableProps {
  classes: any;
  token: string;
  entries: SearchEntry[];
  records: Field[];
}

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Data A', 159, 6.0, 24, 4.0),
  createData('Data B', 237, 9.0, 37, 4.3),
  createData('Data C', 262, 16.0, 24, 6.0),
  createData('Data D', 305, 3.7, 67, 4.3),
  createData('Data E', 356, 16.0, 49, 3.9)
];

class TableComponent extends React.Component {
  public render() {
    // 有条目时，才渲染
    console.log(`>`, this.props);
    return (this.props as TableProps).entries.length > 0 ? (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {['HELLO', 'WORLD', 'IS', 'DOG', 'SHIT'].map((s, i) => (
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
                <TableCell align="inherit">{row.calories}</TableCell>
                <TableCell align="inherit">{row.fat}</TableCell>
                <TableCell align="inherit">{row.carbs}</TableCell>
                <TableCell align="inherit">{row.protein}</TableCell>
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
