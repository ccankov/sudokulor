import Board from './board';

class Tile {
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

  validPossibleVals() {
    let valArr = this.possibleVals();
    let validVals = [];
    let originalVal = this.value;
    let tileSets = [this.myRow(), this.myCol(), this.mySqr()];
    valArr.forEach(val => {
      this.value = val;
      if (this.board.areSetsSolvable(tileSets)) {
        validVals.push(val);
      }
    });
    this.value = originalVal;
    return validVals;
  }

  isGiven() {
    return this.given;
  }

  toString() {
    return this.value.toString();
  }
}

export default Tile;
