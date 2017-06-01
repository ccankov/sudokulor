import React from 'react';
import SudokuBoard from '../board';
import Board from './board';
import NavHeader from './navheader';
import Menu from './menu';

class Game extends React.Component {
  constructor(props) {
    super(props);

    let newBoard = new SudokuBoard('normal', 'medium');

    this.state = {
      difficulty: 'medium',
      mode: 'normal',
      board: newBoard,
      showMenu: false,
      fixedTiles: newBoard.grid.map(row => row.map(tile => tile.value))
    };

    this.updateGame = this.updateGame.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.newGame = this.newGame.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleZenMode = this.handleZenMode.bind(this);
  }

  toggleMenu() {
    let currentState = this.state.showMenu;
    this.setState({ showMenu: !currentState });
  }

  newGame(difficulty = 'medium', mode = 'normal') {
    let newBoard = new SudokuBoard(mode, difficulty);
    this.setState({
      difficulty,
      board: newBoard,
      mode,
      fixedTiles: newBoard.grid.map(row => row.map(tile => tile.value))
    });
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

  handleNewGame(e) {
    e.preventDefault();
    this.newGame(this.state.difficulty, 'normal');
  }

  handleZenMode(e) {
    e.preventDefault();
    this.newGame('medium', 'zen');
  }

  render() {
    let buttonText = '?';
    if (this.state.showMenu) {
      buttonText = 'X';
    }
    let wonBackdropClass = 'victoryBackdrop';
    let wonBannerClass = 'victoryBanner';
    if (this.state.board.boardSolved()) {
      wonBackdropClass += ' visible';
      wonBannerClass += ' visible';
    }
    return (
      <div>
        <NavHeader />
        <div className={wonBackdropClass}>
          <div className={wonBannerClass} >
            <p>Congratulations, you win!</p>
            <div className="rowButtons">
              <button onClick={ this.handleNewGame }>New Game</button>
              <button onClick={ this.handleZenMode }>Zen Mode</button>
            </div>
          </div>
        </div>
        <Board
          board={this.state.board}
          fixedTiles={this.state.fixedTiles}
          updateGame={this.updateGame}
          mode={this.state.mode} />
        <div className="help-button"
             onClick={ this.toggleMenu }>
             { buttonText }
        </div>
        <Menu show={ this.state.showMenu }
              changeDifficulty= { this.newGame }
              difficulty={ this.state.difficulty }/>
      </div>
    );
  }
}

export default Game;
