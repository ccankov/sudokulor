import React from 'react';
import Tile from './tile';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rows = this.props.board.grid.map((row, i) => {
      let tiles = row.map((tile, j) => {
        return (
          <Tile tile={tile} updateGame={this.props.updateGame} key={j} />
        );
      });
      return (
        <div className="row" key={i}>
          {tiles}
        </div>
      );
    });
    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default Board;
