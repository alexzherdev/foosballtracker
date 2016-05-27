import React from 'react';


export default class AddPlayerForm extends React.Component {
  static propTypes = {
    onPlayerCreate: React.PropTypes.func.isRequired
  };

  state = {
    name: ''
  };

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onSubmit() {
    this.props.onPlayerCreate(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          <input
            type="text"
            placeholder="New Player"
            value={this.state.name}
            onChange={this.onNameChange.bind(this)}
            className="form-control" />
        </div>&nbsp;
        <button onClick={this.onSubmit.bind(this)} className="btn btn-default">Add</button>
      </div>
    );
  }
}
