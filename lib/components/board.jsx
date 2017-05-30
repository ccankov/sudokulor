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
      tiles.splice(6, 0, <div key={10} className="vertical-line"></div>);
      tiles.splice(3, 0, <div key={11} className="vertical-line"></div>);
      return (
        <div className="row" key={i}>
          {tiles}
        </div>
      );
    });
    return (
      <div className="board">
        {rows}
      </div>
    );
  }
}

export default Board;
