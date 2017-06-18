import React from 'react';
import classNames from 'classnames/bind';
import Tile from './tile';
import styles from '../css/main.css';

const cx = classNames.bind(styles);

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rows = this.props.board.grid.map((row, i) => {
      let tiles = row.map((tile, j) => {
        let fixed = false;
        let tilePos = tile.pos;
        let originalGrid = this.props.fixedTiles;
        if (tile.value === originalGrid[tilePos[0]][tilePos[1]] &&
            tile.value !== 0) {
          fixed = true;
        }
        return (
          <Tile tile={tile}
                mode={this.props.mode}
                fixed={fixed}
                updateGame={this.props.updateGame} key={j} />
        );
      });
      tiles.splice(6, 0, <div key={10} className={cx("vertical-line")}></div>);
      tiles.splice(3, 0, <div key={11} className={cx("vertical-line")}></div>);
      return (
        <div className={cx("row")} key={i}>
          {tiles}
        </div>
      );
    });
    return (
      <div className={cx("board")}>
        {rows}
      </div>
    );
  }
}

export default Board;
