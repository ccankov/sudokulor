import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (!this.props.tile.explored) {
      if (e.altKey) {
        this.props.updateGame(this.props.tile, false);
      } else {
        this.props.updateGame(this.props.tile, true);
      }
    }
  }

  render() {
    let symbol;
    if (this.props.tile.explored) {
      symbol = this.props.tile.bombed ? "X" : this.props.tile.adjacentBombCount() ;
    } else if (this.props.tile.flagged) {
      symbol = "*";
    } else {
      symbol = " ";
    }
    return (
      <button className="tile" onClick={this.handleClick}>{symbol}</button>
    );
  }
}

export default Tile;
