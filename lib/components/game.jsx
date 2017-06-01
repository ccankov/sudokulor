import React from 'react';
import SudokuBoard from '../board';
import Board from './board';
import NavHeader from './navheader';
import Menu from './menu';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      difficulty: 'medium',
      board: new SudokuBoard('normal', 'medium'),
      showMenu: false
    };

    this.updateGame = this.updateGame.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
  }

  toggleMenu() {
    let currentState = this.state.showMenu;
    this.setState({ showMenu: !currentState });
  }

  changeDifficulty(difficulty) {
    this.setState({ difficulty, board: new SudokuBoard('normal', difficulty) });
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
        <div className="help-button"
             onClick={ this.toggleMenu }>
             ?
          <Menu show={ this.state.showMenu }
                changeDifficulty= { this.changeDifficulty }
                difficulty={ this.state.difficulty }/>
        </div>
      </div>
    );
  }
}

export default Game;
