import React from 'react';
import { RouteHandler } from 'react-router';

import Nav from '../components/nav';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
