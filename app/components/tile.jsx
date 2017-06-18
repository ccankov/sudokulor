import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.clearTile = this.clearTile.bind(this);
    this.setTile = this.setTile.bind(this);
    this.determineMiniOrder = this.determineMiniOrder.bind(this);
    this.generateMiniTiles = this.generateMiniTiles.bind(this);
  }

  clearTile(e) {
    this.props.updateGame(this.props.tile, 0);
  }

  setTile(val) {
    let tile = this.props.tile;
    return (() => {
      this.props.updateGame(tile, val);
    });
  }

  // componentDidUpdate() {
  //   let possibleVals = this.props.tile.possibleVals();
  //   if (!this.props.tile.given && possibleVals.length === 1) {
  //     this.setTile(possibleVals[0])();
  //   }
  // }

  determineMiniOrder(mode) {
    let tile = this.props.tile;
    if (mode === 'zen') {
      let colOffset = tile.pos[1] % 3;
      switch (tile.pos[0] % 3) {
        case 0:
          return tile.board.perfectionSquare(colOffset);
        case 1:
          return tile.board.perfectionSquare(3 + colOffset);
        case 2:
          return tile.board.perfectionSquare(6 + colOffset);
      }
    } else {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
  }

  generateMiniTiles() {
    let tile = this.props.tile;
    let vals = tile.possibleVals();
    let perfectionOrder = this.determineMiniOrder(this.props.mode);
    let miniTiles = [];
    for (let i = 0; i < perfectionOrder.length; i++) {
      let className = `mini value-${perfectionOrder[i]}`;
      if (vals.includes(perfectionOrder[i])) {
        miniTiles.push(
          <div className={className}
               key={perfectionOrder[i]}
               onClick={this.setTile(perfectionOrder[i])}></div>
        );
      } else {
        className += ' invalid';
        miniTiles.push(
          <div className={className}
               key={perfectionOrder[i]}></div>
        );
      }
    }
    return miniTiles;
  }

  render() {
    let tile = this.props.tile;
    let className = `tile value-${tile.value}`;
    if (tile.value === 0) {
      return (
        <div className={className}>
          <div className="absolute_container">
            {this.generateMiniTiles()}
          </div>
        </div>
      );
    } else if (this.props.fixed) {
      className += ' fixed';
      return (
        <div className={className} ></div>
      );
    }
    else {
      return (
        <div className={className} onClick={this.clearTile}></div>
      );
    }
  }
}

export default Tile;
