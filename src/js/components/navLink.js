import React from 'react';
import { Link } from "react-router";

export default class NavLink extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    to: React.PropTypes.string.isRequired,
    children: React.PropTypes.node
  }

  render() {
    let isActive = this.context.router.isActive(this.props.to),
      className = isActive ? "active" : "";

    return (
      <li className={className}>
        <Link {...this.props}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}
