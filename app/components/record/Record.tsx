import { Button, CircularProgress, Snackbar, Card, CardActions } from '@material-ui/core';
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
    const { classes } = this.props;
    return (
      <Card>

        <CardActions>
          <Button variant="contained" color="secondary" onClick={() => this.addRecords()} className={classes.button}>
            Add all to Record {this.state.isBtnClick ? <CircularProgress /> : ''}
          </Button>
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
    entries: state.entries
  }),
  mapDispatchToProps
)(withStyles(themes)(RecordComponent));
