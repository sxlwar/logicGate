import { Table, Card, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { connect } from 'react-redux';
import { Record } from '../../api/logicgate-api/Record';
import { IState } from '../../reducers';
import { LdapUser } from '../../services/convertToLdapUser';
const styles = require('./entry-list.scss');
interface ListProps {
  classes: any;
  records: Record[];
  entries: LdapUser[];
}

class ListComponent extends React.Component<ListProps> {
  private fields = ['dn', 'cn', 'givenName', 'telephoneNumber', 'mail', 'manager', 'objectClass'];

  public render() {
    return (
      <Card className={styles.containerCard}>
        {this.props.entries.length > 0 ? (
          <Table size="small" className={styles.table}>
            <TableHead>
              <TableRow>
                {this.fields.map((field, i) => (
                  <TableCell align="left" key={i}>
                    {field}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {this.props.entries.map((user: LdapUser, index) => (
                <TableRow key={index}>
                  <TableCell align="left" component="th" scope="row">
                    {user.cn}
                  </TableCell>
                  <TableCell align="left">{user.dn}</TableCell>
                  <TableCell align="left">{user.givenName}</TableCell>
                  <TableCell align="left">{user.mail}</TableCell>
                  <TableCell align="left">{user.manager}</TableCell>
                  <TableCell align="left">{user.objectClass}</TableCell>
                  <TableCell align="left">{user.telephoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <h5 style={{ width: '900px', textAlign: 'center', textIndent: '10px' }}>
            No entries data here, try to click
            <Button variant="contained" color="primary" size="small" style={{ margin: 'auto 5px' }} disabled>
              {' '}
              Fetch User{' '}
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
}))(ListComponent);
