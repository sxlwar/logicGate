import React from 'react';
import { RouteComponentProps } from 'react-router';
import EntryComponent from '../../components/entry/entry';
import RecordComponent from '../../components/record/Record';
import RecordListComponent from '../../components/record/record-list';
import EntryListComponent from '../../components/entry/entry-list';
import { Divider } from '@material-ui/core';

const styles = require('./HomePage.scss');

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.flexColumn}>
          <EntryComponent />
          <div className={styles.flexRowInner}>
            <EntryListComponent />
          </div>
        </div>

        <Divider />

        <div className={styles.flexColumn}>
          <RecordComponent />
          <div className={styles.flexRowInner}>
            <RecordListComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default (HomePage as any) as React.StatelessComponent<RouteComponentProps<any>>;
