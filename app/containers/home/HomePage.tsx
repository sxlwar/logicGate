import React from 'react';
import { RouteComponentProps } from 'react-router';
import EntryButton from '../../components/entry/Entry';
import RecordButton from '../../components/record/Record';
import Table from '../../components/table/table';
const styles = require('./HomePage.scss');

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    console.log(`home`, this.props);
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.flexRow}>
          <div>
            <EntryButton />
            <div></div>
          </div>

          <div className={styles.flexRow}>
            <RecordButton />
            <Table />
          </div>
        </div>
      </div>
    );
  }
}

export default (HomePage as any) as React.StatelessComponent<RouteComponentProps<any>>;
