import React from 'react';
import { Link } from "react-router";


const NavLink = (props, context) => {
  let isActive = context.router.isActive(props.to),
    className = isActive ? "active" : "";

  return (
    <li className={className}>
      <Link {...props}>
        {props.children}
      </Link>
    </li>
  );
};

NavLink.contextTypes = {
  router: React.PropTypes.object
};

NavLink.propTypes = {
  to: React.PropTypes.string.isRequired,
  children: React.PropTypes.node
};

export default NavLink;
