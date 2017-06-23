const nullConnections = {
  upNode: null,
  rightNode: null,
  downNode: null,
  leftNode: null
};

export class Node {
  constructor({ upNode, rightNode, downNode, leftNode, columnNode, pos }) {
    this.up = upNode;
    this.right = rightNode;
    this.down = downNode;
    this.left = leftNode;
    this.column = columnNode;
    this.pos = pos;
  }

  removeFromList() {
    this.right.left = this.left;
    this.left.right = this.right;
  }

  addToList() {
    this.right.left = this;
    this.left.right = this;
  }
}

export class ColumnNode extends Node {
  constructor({ name, size, upNode, rightNode, downNode, leftNode }) {
    super({ upNode, rightNode, downNode, leftNode });
    this.columnName = name;
    this.columnSize = size;
  }
}

export class ToroidalLinkedList {
  constructor(matrix) {
    this.initializeList(matrix);
  }

  initializeList(matrix) {
    this.initializeColumnNodes(matrix);
    this.initializeMatrixNodes(matrix);
    this.initializeMatrixLinks();
  }

  initializeColumnNodes(matrix) {
    this.h = new ColumnNode(
      Object.assign({ name: 'h', size: 0 }, nullConnections)
    );
    if (matrix.length === 0) return;
    let prevNode = this.h;
    this.columnNodes = [];
    matrix[0].forEach((_, idx) => {
      const newNode = new ColumnNode(
        { name: `${idx}`, size: 0, rightNode: this.h, leftNode: prevNode }
      );
      prevNode.right = newNode;
      this.h.left = newNode;
      newNode.up = newNode;
      newNode.down = newNode;
      this.columnNodes.push(newNode);

      prevNode = newNode;
    });
  }

  initializeMatrixNodes(matrix) {
    this.matrix = matrix.map((row, rowIdx) => (
      row.map((val, colIdx) => (
        this.valToNode(val, [rowIdx, colIdx])
      ))
    ));
    this.solution = matrix.map(row => (
      row.map(() => (
        false
      ))
    ));
  }

  initializeMatrixLinks() {
    const matrixNodes = this.matrix;
    matrixNodes.forEach(row => this.linkRow(row));
    matrixNodes[0].forEach((_, idx) => {
      const colArray = matrixNodes.map(row => row[idx]);
      const columnNode = this.columnNodes[idx];
      columnNode.colArray = colArray;
      this.linkCol(colArray, columnNode);
    });
  }

  linkRow(sparseRowArray) {
    const rowArray = sparseRowArray.filter(node => node !== null);
    const first = rowArray[0];
    const last = rowArray[rowArray.length - 1];
    first.left = last;
    last.right = first;
    for (let i = 1; i < rowArray.length; i += 1) {
      const thisNode = rowArray[i];
      const prevNode = rowArray[i - 1];
      prevNode.right = thisNode;
      thisNode.left = prevNode;
    }
  }

  linkCol(sparseColArray, columnNode) {
    const colArray = sparseColArray.filter(node => node !== null);
    const first = colArray[0];
    const last = colArray[colArray.length - 1];
    first.up = columnNode;
    last.down = columnNode;
    columnNode.up = last;
    columnNode.down = first;
    for (let i = 1; i < colArray.length; i += 1) {
      const thisNode = colArray[i];
      const prevNode = colArray[i - 1];
      prevNode.down = thisNode;
      thisNode.up = prevNode;
    }
  }

  valToNode(val, pos) {
    if (val === 1) {
      const columnNode = this.columnNodes[pos[1]];
      columnNode.columnSize += 1;
      return new Node({ columnNode, pos });
    }
    return null;
  }

  cover(columnNode) {
    columnNode.right.left = columnNode.left;
    columnNode.left.right = columnNode.right;

    for (let row = columnNode.down; row !== columnNode; row = row.down) {
      for (let right = row.right; right !== row; right = right.right) {
        debugger;
        right.up.down = right.down;
        right.down.up = right.up;
        if (right.column) {
          right.column.columnSize -= 1;
        }
      }
    }
  }

  uncover(columnNode) {
    for (let row = columnNode.up; row !== columnNode; row = row.up) {
      for (let left = row.left; left !== row; left = left.left) {
        debugger;
        left.up.down = left;
        left.down.up = left;
        if (left.column) {
          left.column.columnSize += 1;
        }
      }
    }

    columnNode.right.left = columnNode;
    columnNode.left.right = columnNode;
  }

  dancingLinks() {
    if (this.h.right === this.h) {
      return true;
    }
    let curColumn = this.h.right;
    this.cover(curColumn);

    for (let row = curColumn.down; row !== curColumn; row = row.down) {
      this.solution[row.pos[0]][row.pos[1]] = true;

      for (let right = row.right; right !== row; right = right.right) {
        this.cover(right.column);
      }

      const done = this.dancingLinks();
      if (done) {
        return true;
      }

      this.solution[row.pos[0]][row.pos[1]] = false;
      curColumn = row.column;

      for (let left = row.left; left !== row; left = left.left) {
        this.uncover(left.column);
      }
    }

    this.uncover(curColumn);
    return false;
  }
}
