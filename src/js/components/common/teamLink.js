import React from 'react';
import { Link } from 'react-router';


const TeamLink = ({id, children}) =>
  <Link to={`/stats/${id}`}>
    {children}
  </Link>;

TeamLink.propTypes = {
  id: React.PropTypes.number.isRequired,
  children: React.PropTypes.node
};

export default TeamLink;
