import * as React from 'react';
// import { Link } from 'react-router-dom';

let styles = require('./Home.scss');

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>LDAP Connection Demo</h2>
        </div>
      </div>
    );
  }
}
