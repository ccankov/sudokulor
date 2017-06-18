import React from 'react';
import classNames from 'classnames/bind';
import SudokuBoard from '../board';
import Board from './board';
import NavHeader from './navheader';
import Menu from './menu';
import Timer from './timer';
import styles from '../css/main.css';

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
    let currentState = this.state.showMenu;
    this.setState({ showMenu: !currentState });
  }

  newGame(difficulty = 'medium', mode = 'normal') {
    let newBoard = new SudokuBoard(mode, difficulty);
    this.setState({
      difficulty,
      board: newBoard,
      time: '',
      mode,
      startTime: Date.now(),
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

  solveSudoku(tileIdx = 0, tilePossibilities = []) {
    return () => {
      let board = this.state.board;
      let varTiles = this.state.board.variableTiles;
      let curIdx = varTiles[tileIdx];
      let curTile = board.grid[curIdx[0]][curIdx[1]];
      if (curTile.value === 0) {
        tilePossibilities[tileIdx] = curTile.validPossibleVals();
      } else if (!tilePossibilities[tileIdx]) {
        this.updateGame(curTile, 0);
        tilePossibilities[tileIdx] = curTile.validPossibleVals();
      }
      else {
        let valIdx = tilePossibilities[tileIdx].indexOf(curTile.value);
        tilePossibilities[tileIdx].splice(valIdx, 1);
        this.updateGame(curTile, 0);
      }
      let vals = tilePossibilities[tileIdx];
      if (vals.length > 0) {
        let val = vals[Math.floor(Math.random() * vals.length)];
        tileIdx += 1;
        this.updateGame(curTile, val);
      } else {
        tileIdx -= 1;
      }
      if (!board.boardSolved()) {
        setTimeout(this.solveSudoku(tileIdx, tilePossibilities), 0);
      }
    };
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
