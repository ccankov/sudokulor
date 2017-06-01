import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.changeDifficulty = this.changeDifficulty.bind(this);
  }

  changeDifficulty(e) {
    this.props.changeDifficulty(e.target.value);
  }

  render() {
    let className = 'optionsMenu';
    if (this.props.show) {
      className += ' shown';
    }
    return (
      <menu className={ className }>
        <ul className="menuList">
          <li>
            Complete the grid by ensuring there are no duplicate colors in each
            row, column, and 3 x 3 square.
          </li>
          <li>
            <label>Difficulty</label>
            <select onChange={ this.changeDifficulty }
                    value={ this.props.difficulty } >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </li>
        </ul>
      </menu>
    );
  }
}

export default Menu;
