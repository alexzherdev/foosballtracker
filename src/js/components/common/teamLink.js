import React from 'react';
import { Link } from 'react-router';
import { number, node } from 'prop-types';

const TeamLink = ({id, children}) =>
  <Link to={`/stats/${id}`}>
    {children}
  </Link>;

TeamLink.propTypes = {
  id: number.isRequired,
  children: node
};

export default TeamLink;
