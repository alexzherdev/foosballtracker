import React from 'react';
import { connect } from 'react-redux';
import { func, array } from 'prop-types';

import AddPlayerForm from '../components/addPlayerForm';
import PlayerList from '../components/playerList';
import { loadPlayersStats } from '../actions/statsActions';
import { createPlayer } from '../actions/playerActions';


class PlayersContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadPlayersStats();
  }

  render() {
    if (this.props.playersStats) {
      return (
        <div className="players">
          <div className="container-fluid">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Players</h4>
              </div>
              <PlayerList players={this.props.playersStats} />
              <div className="panel-footer">
                <AddPlayerForm onPlayerCreate={this.props.createPlayer} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

PlayersContainer.propTypes = {
  playersStats: array,
  loadPlayersStats: func.isRequired,
  createPlayer: func.isRequired
};

function mapStateToProps(state) {
  return {
    playersStats: state.playersStats
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPlayersStats: () => {
      dispatch(loadPlayersStats());
    },
    createPlayer: (name) => {
      dispatch(createPlayer(name));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersContainer);
