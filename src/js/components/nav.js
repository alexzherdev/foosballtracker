import React from 'react';
import { Link } from 'react-router';

import NavLink from './navLink';


export default class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">Foosball Tracker</Link>
        </div>
        <ul className="nav navbar-nav">
          <NavLink to="/scores">Scores</NavLink>
          <li><a href="#">Stats</a></li>
          <NavLink to="/players">Players</NavLink>
        </ul>
      </nav>
    );
  }
}
