import React from 'react';
import { Link } from 'react-router';

import NavLink from './navLink';


export default class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">Kicker Scores</Link>
        </div>
        <ul className="nav navbar-nav">
          <NavLink to="/new">New Score</NavLink>
          <li><a href="#">Stats</a></li>
        </ul>
      </nav>
    );
  }
}