import * as Seeds from './puzzle_seeds';
import Tile from './tile';

class Board {
  constructor(mode = 'zen', difficulty = 'medium') {
    this.grid = [];
    if (mode === 'zen') {
      this.generateBoard();
    } else {
      let randomBoard = this.getRandomBoard(difficulty);
      this.generateBoard(randomBoard);
    }
  }

  perfectionSquare(idx) {
    let perfection = this.perfection405();
    let square = [];
    let x = Math.floor(idx / 3) * 3;
    let y = (idx % 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        square.push(perfection[x + i][y + j]);
      }
    }
    return square;
  }

  perfection405() {
    return [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [3, 1, 2, 6, 4, 5, 9, 7, 8],
      [6, 4, 5, 9, 7, 8, 3, 1, 2],
      [9, 7, 8, 3, 1, 2, 6, 4, 5],
      [2, 3, 1, 5, 6, 4, 8, 9, 7],
      [5, 6, 4, 8, 9, 7, 2, 3, 1],
      [8, 9, 7, 2, 3, 1, 5, 6, 4]
    ];
  }

  getRandomBoard(difficulty) {
    let randomBoard = [];
    let seedIdx = Math.floor((Math.random() * 5));
    switch (difficulty) {
      case 'easy':
        randomBoard = Seeds.easy[seedIdx];
        break;
      case 'medium':
        randomBoard = Seeds.medium[seedIdx];
        break;
      case 'hard':
        randomBoard = Seeds.hard[seedIdx];
        break;
    }
    randomBoard = this.randomTransform(randomBoard);
    return randomBoard;
  }

  randomTransform(board) {
    board = this.randomOffset(board);
    board = this.randomRotate(board);
    return board;
  }

  randomOffset(board) {
    let randomOffset = Math.floor((Math.random() * 9));
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] > 0) {
          board[i][j] = (board[i][j] + randomOffset) % 9;
        }
      }
    }
    return board;
  }

  randomRotate(board) {
    let randomRotate = Math.floor((Math.random() * 4));
    for (let j = 0; j < randomRotate; j++) {
      board = board[0].map((col, i) => (
        board.map((row) => (
          row[i]
        ))
      ));
    }
    return board;
  }

  generateBoard(valGrid = []) {
    if (valGrid.length !== 0) {
      for (let i = 0; i < valGrid.length; i++) {
        this.grid.push([]);
        for (let j = 0; j < valGrid[i].length; j++) {
          const tile = new Tile(valGrid[i][j], this, [i, j]);
          this.grid[i].push(tile);
        }
      }
    } else {
      for (let i = 0; i < 9; i++) {
        this.grid.push([]);
        for (let j = 0; j < 9; j++) {
          const tile = new Tile(0, this, [i, j]);
          this.grid[i].push(tile);
        }
      }
    }
  }

  tile(pos) {
    return this.grid[pos[0]][pos[1]];
  }

  columns() {
    let array = this.grid;
    return array[0].map(function(col, i) {
      return array.map(function(row) {
        return row[i];
      });
    });
  }

  rows() {
    return this.grid;
  }

  square(idx) {
    let tiles = [];
    let x = Math.floor(idx / 3) * 3;
    let y = (idx % 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        tiles.push(this.tile([x + i, y + j]));
      }
    }
    return tiles;
  }

  squares() {
    let squaresArr = [];
    for (let i = 0; i < 9; i++) {
      squaresArr.push(this.square(i));
    }
    return squaresArr;
  }

  setSolved(tiles) {
    let values = tiles.map((tile) => tile.value).sort();
    if ((new Set(values)).size === 9 &&
        values[0] === 1 &&
        values[8] === 9) {
          return true;
    } else {
      return false;
    }
  }

  boardSolved() {
    let rows = this.rows();
    let cols = this.columns();
    let sqrs = this.squares();

    for (let i = 0; i < 9; i++) {
      if (!this.setSolved(rows[i]) ||
          !this.setSolved(cols[i]) ||
          !this.setSolved(sqrs[i])) {
        return false;
      }
    }

    return true;
  }
}

export default Board;
