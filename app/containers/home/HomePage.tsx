import React from 'react';
import { RouteComponentProps } from 'react-router';
import EntryComponent from '../../components/entry/Entry';
import RecordComponent from '../../components/record/Record';
import TableComponent from '../../components/record/record-list';
import ListComponent from '../../components/entry/entry-list';
import FormComponent from '../../components/form/form';

const styles = require('./HomePage.scss');

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.flexRow}>
          <EntryComponent />
          <FormComponent />
          <ListComponent />
        </div>

        <div className={styles.flexRow}>
          <RecordComponent />
          <TableComponent />
        </div>
      </div>
    );
  }
}

export default (HomePage as any) as React.StatelessComponent<RouteComponentProps<any>>;
