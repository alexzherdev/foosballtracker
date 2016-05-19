import React from 'react';

import _ from 'lodash';

import Picker from './picker';


export default class PlayerPicker extends React.Component {
  render() {
    return (
      <Picker className="player-picker"
        items={this.props.players}
        onItemSelect={this.props.onPlayerSelect}
        placeholder="Select" />
    );
  }
}
