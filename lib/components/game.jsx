import React from 'react';
import SudokuBoard from '../board';
import Board from './board';
import NavHeader from './navheader';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      board: new SudokuBoard()
    };

    this.updateGame = this.updateGame.bind(this);
  }

  updateGame(tile, value) {
    let numVal = parseInt(value);
    if (numVal >= 0 && numVal <= 9) {
      tile.value = numVal;
      tile.given = true;
    }
    this.setState({
      board: this.state.board
    });
  }

  render() {
    return (
      <div>
        <NavHeader />
        <Board board={this.state.board} updateGame={this.updateGame} />
        <div className="help-button">
          ?
        </div>
      </div>
    );
  }
}

export default Game;
