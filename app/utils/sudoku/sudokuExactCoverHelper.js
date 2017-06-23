import * as DancingLinks from './dancingLinks';

const SQ_OFFSET = 0;
const RW_OFFSET = 81;
const CL_OFFSET = 162;
const BX_OFFSET = 243;

// Gets the row index in exact cover matrix given the sudoku val, row, col
function getIndex(val, row, col) {
  return (val * 81) + (row * 9) + col;
}

// Returns the sudoku value given a row index in the exact cover matrix
function getVal(n) {
  return Math.floor(n / 81);
}

// Returns the sudoku row number given a row index in the exact cover matrix
function getRow(n) {
  return Math.floor(n / 9) % 9;
}

// Returns the sudoku col number given a row index in the exact cover matrix
function getCol(n) {
  return n % 9;
}

// Returns the sudoku box number given a row index in the exact cover matrix
function getBox(n) {
  return (Math.floor(getRow(n) / 3) * 3) + Math.floor(getCol(n) / 3);
}

// Returns the sudoku square number given a row index in the exact cover matrix
function getSquare(n) {
  return (getRow(n) * 9) + (getCol(n));
}

function getRowNum(n) {
  return (getVal(n) * 9) + (getRow(n));
}

function getColNum(n) {
  return (getVal(n) * 9) + (getCol(n));
}

function getBoxNum(n) {
  return (getVal(n) * 9) + (getBox(n));
}

// Transforms a sudoku board into an exact cover matrix and parses solution
class sudokuExactCoverHelper {
  constructor(sudokuBoard) {
    this.sudoku = sudokuBoard.valGrid();
    this.sudokuBoard = sudokuBoard;
    this.buildExactCoverMatrix();
    this.coverGivenVals();
    this.dancingLinks = new DancingLinks.ToroidalLinkedList(
      this.exactCoverMatrix
    );
    this.dancingLinks.dancingLinks();
    this.buildSolution();
  }

  addNumber(val, row, col) {
    const index = getIndex(val, row, col);
  }

  buildExactCoverMatrix() {
    this.exactCoverMatrix = [];
    let index;
    for (let a = 0; a < 9; a += 1) {
      for (let b = 0; b < 9; b += 1) {
        for (let c = 0; c < 9; c += 1) {
          index = getIndex(c, a, b);
          this.exactCoverMatrix[index] = (new Array(324)).fill(0);
          this.exactCoverMatrix[index][SQ_OFFSET + getSquare(index)] = 1;
          this.exactCoverMatrix[index][RW_OFFSET + getRowNum(index)] = 1;
          this.exactCoverMatrix[index][CL_OFFSET + getColNum(index)] = 1;
          this.exactCoverMatrix[index][BX_OFFSET + getBoxNum(index)] = 1;
        }
      }
    }
  }

  buildSolution() {
    this.solution = [];
    const dancingSolution = this.dancingLinks.solution;
    Object.keys(dancingSolution).forEach((key) => {
      const thisNode = dancingSolution[key];
      const n = thisNode.pos[0];
      this.solution.push([getVal(n), getRow(n), getCol(n)]);
    });
  }

  coverGivenVals() {
    this.sudoku.forEach((row, rowIdx) => (
      row.forEach((val, colIdx) => {
        this.addNumber(val - 1, rowIdx, colIdx);
      })
    ));
  }
}

export default sudokuExactCoverHelper;
