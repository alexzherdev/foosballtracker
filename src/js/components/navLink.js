import React from 'react';
import { object, string, node } from 'prop-types';
import { Link } from 'react-router';


const NavLink = (props, context) => {
  let isActive = context.router.isActive(props.to),
    className = isActive ? 'active' : '';

  return (
    <li className={className}>
      <Link {...props}>
        {props.children}
      </Link>
    </li>
  );
};

NavLink.contextTypes = {
  router: object
};

NavLink.propTypes = {
  to: string.isRequired,
  children: node
};

export default NavLink;
