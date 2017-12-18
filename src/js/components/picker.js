import React from 'react';
import { array, func, string, bool } from 'prop-types';
import _ from 'lodash';


export default class Picker extends React.Component {
  static propTypes = {
    items: array.isRequired,
    onItemSelect: func.isRequired,
    placeholder: string,
    className: string,
    getItemLabel: func,
    usePlaceholderItem: bool
  };

  constructor(props) {
    super(props);
    this.state = { name: this.getDisplayName() };
    this.onItemSelect = this.onItemSelect.bind(this);
  }

  getLabel(item) {
    if (this.props.getItemLabel) {
      return this.props.getItemLabel(item);
    } else {
      return item.name;
    }
  }

  getDisplayName(id) {
    let item = _.find(this.props.items, { id });
    return item ? this.getLabel(item) : this.props.placeholder;
  }

  onItemSelect(event) {
    event.preventDefault();
    let id = +event.target.dataset.id;
    this.setState({ name: this.getDisplayName(id) });
    this.props.onItemSelect(id);
  }

  render() {
    const renderItem = (item, index) => {
      if (item.isHeader) {
        return <li className="dropdown-header" key={`header-${index}`}>{item.name}</li>
      } else {
        return <li key={item.id}><a href="#" data-id={item.id} onClick={this.onItemSelect}>{this.getLabel(item)}</a></li>;
      }
    };

    const items = [...this.props.items];
    if (this.props.usePlaceholderItem) {
      items.splice(0, 0, { id: null, name: this.props.placeholder });
    }
    const pickerItems = items.map(renderItem);

    return (
      <div className={`dropdown ${this.props.className}`}>
        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
          {this.state.name} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {pickerItems}
        </ul>
      </div>
    );
  }
}
