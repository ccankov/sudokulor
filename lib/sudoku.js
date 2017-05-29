export class Tile {
  constructor(value, board, pos) {
    this.value = value;
    this.board = board;
    this.pos = pos;
    this.given = value === 0 ? false : true;
  }

  myRow() {
    return this.board.rows()[this.pos[0]];
  }

  myCol() {
    return this.board.columns()[this.pos[1]];
  }

  mySqr() {
    let colOffset = Math.floor(this.pos[1] / 3);
    switch (Math.floor(this.pos[0] / 3)) {
      case 0:
        return this.board.square(colOffset);
      case 1:
        return this.board.square(3 + colOffset);
      case 2:
        return this.board.square(6 + colOffset);
    }
  }

  possibleVals() {
    let valArr = [];

    for (let i = 1; i <= 9; i++) {
      let inRow = this.myRow().map((tile) => tile.value).includes(i);
      let inCol = this.myCol().map((tile) => tile.value).includes(i);
      let inSqr = this.mySqr().map((tile) => tile.value).includes(i);
      if (!inRow && !inCol && !inSqr) {
        valArr.push(i);
      }
    }

    return valArr;
  }

  isGiven() {
    return this.given;
  }

  toString() {
    return this.value.toString();
  }
}

export class Board {
  constructor() {
    this.grid = [];
    this.generateBoard();
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
