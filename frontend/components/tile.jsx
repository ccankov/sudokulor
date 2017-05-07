import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.clearTile = this.clearTile.bind(this);
    this.setTile = this.setTile.bind(this);
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

  generateMiniTiles() {
    let tile = this.props.tile;
    let vals = tile.possibleVals();
    let miniTiles = [];
    vals.forEach((val, idx) => {
      let className = `mini value-${val}`;
      miniTiles.push(
        <div className={className} key={idx} onClick={this.setTile(val)}></div>
      );
    });
    while (miniTiles.length < 9) {
      miniTiles.push(
        <div className='mini value-0' key={miniTiles.length}></div>
      );
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
    } else {
      return (
        <div className={className} onClick={this.clearTile}></div>
      );
    }
  }
}

export default Tile;
