import React from 'react';
import classNames from 'classnames/bind';
import SudokuBoard from '../board';
import Board from './board';
import NavHeader from './navheader';
import Menu from './menu';
import Timer from './timer';
import styles from '../css/main.css';
import ExactCoverHelper from '../utils/sudoku/sudokuExactCoverHelper';

const cx = classNames.bind(styles);

class Game extends React.Component {
  constructor(props) {
    super(props);

    const newBoard = new SudokuBoard('normal', 'medium');

    this.state = {
      difficulty: 'medium',
      mode: 'normal',
      time: '',
      board: newBoard,
      solver: new ExactCoverHelper(newBoard),
      startTime: Date.now(),
      showMenu: false,
      fixedTiles: newBoard.grid.map(row => row.map(tile => tile.value))
    };

    this.updateGame = this.updateGame.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.newGame = this.newGame.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleZenMode = this.handleZenMode.bind(this);
    this.solveSudoku = this.solveSudoku.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  toggleMenu() {
    const currentState = this.state.showMenu;
    this.setState({ showMenu: !currentState });
  }

  newGame(difficulty = 'medium', mode = 'normal') {
    const newBoard = new SudokuBoard(mode, difficulty);
    this.setState({
      difficulty,
      board: newBoard,
      time: '',
      solver: new ExactCoverHelper(newBoard),
      mode,
      startTime: Date.now(),
      fixedTiles: newBoard.grid.map(row => row.map(tile => tile.value))
    });
  }

  solveSudoku(i = 0) {
    return () => {
      const solnArr = this.state.solver.solution;
      if (i < solnArr.length) {
        const pos = solnArr[i];
        const tile = this.state.board.grid[pos[1]][pos[2]];
        this.updateGame(tile, pos[0] + 1);
        setTimeout(this.solveSudoku(i + 1), 0);
      }
    };
  }

  updateGame(tile, value) {
    if (!tile.given) {
      let numVal = parseInt(value);
      if (numVal >= 0 && numVal <= 9) {
        tile.value = numVal;
      }
      this.setState({
        board: this.state.board
      });
    }
  }

  handleNewGame(e) {
    e.preventDefault();
    this.newGame(this.state.difficulty, 'normal');
  }

  handleZenMode(e) {
    e.preventDefault();
    this.newGame('medium', 'zen');
  }

  setTime(time) {
    this.setState({ time });
  }

  render() {
    let buttonText = '?';
    if (this.state.showMenu) {
      buttonText = 'X';
    }
    let wonBackdropClass = cx('victoryBackdrop');
    let wonBannerClass = cx('victoryBanner');
    if (this.state.board.boardSolved()) {
      wonBackdropClass = cx('victoryBackdrop', 'visible');
      wonBannerClass = cx('victoryBanner', 'visible');
    }
    return (
      <div>
        <NavHeader />
        <div className={wonBackdropClass}>
          <div className={wonBannerClass} >
            <p>Congratulations, you win!</p>
            <p className={cx('timeText')}>Time: { this.state.time }</p>
            <div className={cx('rowButtons')}>
              <button onClick={this.handleNewGame}>New Game</button>
              <button onClick={this.handleZenMode}>Zen Mode</button>
            </div>
          </div>
        </div>
        <Board
          board={this.state.board}
          fixedTiles={this.state.fixedTiles}
          updateGame={this.updateGame}
          mode={this.state.mode} />
        <div className={cx('infoFooter')}>
          <div className={cx('separator')}>
            <Timer
              start={this.state.startTime}
              board={this.state.board}
              setTime={this.setTime} />
            <div className={cx('button-holder')}>
              <div className={cx('nav-button-in')}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/cvetomir-chris-cankov/">
                  <i className={cx('fa', 'fa-linkedin')} aria-hidden="true" />
                </a>
              </div>
              <div className={cx('nav-button')}>
                <a target='_blank' href="https://github.com/ccankov">
                  <i className={cx("fa fa-github")} aria-hidden="true"></i>
                </a>
              </div>
              <div className={cx("help-button")}
                onClick={ this.toggleMenu }>
                { buttonText }
              </div>
            </div>
            <Menu show={ this.state.showMenu }
              changeDifficulty= { this.newGame }
              difficulty={ this.state.difficulty }
              solveSudoku={ this.solveSudoku } />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
