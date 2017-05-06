import React from 'react';
import * as Minesweeper from '../minesweeper';
import Board from './board';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      board: new Minesweeper.Board(10, 5)
    };

    this.updateGame = this.updateGame.bind(this);
  }

  updateGame(tile, reveal) {
    if (reveal) {
      tile.explore();
    } else {
      tile.toggleFlag();
    }
    this.setState({
      board: this.state.board
    });
  }

  render() {
    let gameStatus = '';
    if (this.state.board.lost()) {
      gameStatus = 'You lose!';
    } else if (this.state.board.won()) {
      gameStatus = 'You win!';
    }
    return (
      <div>
        <Board board={this.state.board} updateGame={this.updateGame} />
        <h1>{gameStatus}</h1>
      </div>
    );
  }
}

export default Game;
