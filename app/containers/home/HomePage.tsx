import React from 'react';
import { RouteComponentProps } from 'react-router';
import Entry from '../../components/entry/Entry';
import Record from '../../components/record/Record';
import Table from '../../components/table/table';
const styles = require('./HomePage.scss');

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <div>
            <Entry />
            <Table />
          </div>
          <Record />
        </div>
      </div>
    );
  }
}

export default (HomePage as any) as React.StatelessComponent<RouteComponentProps<any>>;
