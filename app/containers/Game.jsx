import React from 'react';
import { connect } from 'react-redux';
import Game from '../components/game';

const GameContainer = () => {
  return (
    <Game />
  );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, null)(GameContainer);
