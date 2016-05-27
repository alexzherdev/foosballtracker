import React from 'react';

import _ from 'lodash';


export default class Picker extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    onItemSelect: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { name: this.getDisplayName() };
    this.onItemSelect = this.onItemSelect.bind(this);
  }

  getDisplayName(id) {
    let item = _.find(this.props.items, { id });
    return item ? item.name : this.props.placeholder;
  }

  onItemSelect(event) {
    event.preventDefault();
    let id = +event.target.dataset.id;
    this.setState({ name: this.getDisplayName(id) });
    this.props.onItemSelect(id);
  }

  render() {
    let items = this.props.items.map((i) => {
      return (<li key={i.id}><a href="#" data-id={i.id} onClick={this.onItemSelect}>{i.name}</a></li>);
    });

    return (
      <div className={`dropdown ${this.props.className}`}>
        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
          {this.state.name} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {items}
        </ul>
      </div>
    );
  }
}
