export class Tile {
  constructor(value) {
    this.value = value;
    this.given = value === 0 ? false : true;
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
    this.perfection405();
  }

  perfection405() {
    this.grid = [
      [new Tile(1), new Tile(2), new Tile(3), new Tile(4), new Tile(5), new Tile(6), new Tile(7), new Tile(8), new Tile(9)],
      [new Tile(4), new Tile(5), new Tile(6), new Tile(7), new Tile(8), new Tile(9), new Tile(1), new Tile(2), new Tile(3)],
      [new Tile(7), new Tile(8), new Tile(9), new Tile(1), new Tile(2), new Tile(3), new Tile(4), new Tile(5), new Tile(6)],
      [new Tile(3), new Tile(1), new Tile(2), new Tile(6), new Tile(4), new Tile(5), new Tile(9), new Tile(7), new Tile(8)],
      [new Tile(6), new Tile(4), new Tile(5), new Tile(9), new Tile(7), new Tile(8), new Tile(3), new Tile(1), new Tile(2)],
      [new Tile(9), new Tile(7), new Tile(8), new Tile(3), new Tile(1), new Tile(2), new Tile(6), new Tile(4), new Tile(5)],
      [new Tile(2), new Tile(3), new Tile(1), new Tile(5), new Tile(6), new Tile(4), new Tile(8), new Tile(9), new Tile(7)],
      [new Tile(5), new Tile(6), new Tile(4), new Tile(8), new Tile(9), new Tile(7), new Tile(2), new Tile(3), new Tile(1)],
      [new Tile(8), new Tile(9), new Tile(7), new Tile(2), new Tile(3), new Tile(1), new Tile(5), new Tile(6), new Tile(4)]
    ];
  }

  generateBoard() {
    for (let i = 0; i < 9; i++) {
      this.grid.push([]);
      for (let j = 0; j < 9; j++) {
        const tile = new Tile(0);
        this.grid[i].push(tile);
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
