const nullConnections = {
  upNode: null,
  rightNode: null,
  downNode: null,
  leftNode: null
};

export class Node {
  constructor({ upNode, rightNode, downNode, leftNode, columnNode }) {
    this.up = upNode;
    this.right = rightNode;
    this.down = downNode;
    this.left = leftNode;
    this.column = columnNode;
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
    this.matrix = matrix.map(row => (
      row.map((val, colIdx) => (
        this.valToNode(val, colIdx)
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
    for (let i = 1; i < rowArray.length; i++) {
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
    for (let i = 1; i < colArray.length; i++) {
      const thisNode = colArray[i];
      const prevNode = colArray[i - 1];
      prevNode.down = thisNode;
      thisNode.up = prevNode;
    }
  }

  valToNode(val, colIdx) {
    if (val === 1) {
      const columnNode = this.columnNodes[colIdx];
      return new Node({ columnNode });
    }
    return null;
  }
}
