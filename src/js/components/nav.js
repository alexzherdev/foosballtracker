import React from 'react';
import { Link } from 'react-router';

import NavLink from './navLink';


const Nav = () =>
  <nav className="navbar navbar-default">
    <div className="navbar-header">
      <Link to="/" className="navbar-brand">Foosball Tracker</Link>
    </div>
    <ul className="nav navbar-nav">
      <NavLink to="/scores">Scores</NavLink>
      <NavLink to="/stats">Stats</NavLink>
      <NavLink to="/players">Players</NavLink>
    </ul>
  </nav>;

export default Nav;
