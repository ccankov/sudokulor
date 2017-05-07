import React from 'react';
import * as Sudoku from '../sudoku';
import Board from './board';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      board: new Sudoku.Board()
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
        <Board board={this.state.board} updateGame={this.updateGame} />
      </div>
    );
  }
}

export default Game;
