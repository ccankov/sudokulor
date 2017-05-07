import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    let val = e.currentTarget.value;
    this.props.updateGame(this.props.tile, val);
  }

  render() {
    let className = `tile value-${this.props.tile.value}`;
    return (
      <div className={className}>
        <input type="text"
               onChange={this.handleInput}
               value={this.props.tile.value}></input>
      </div>
    );
  }
}

export default Tile;
