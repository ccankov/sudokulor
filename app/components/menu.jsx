import React from 'react';
import classNames from 'classnames/bind';
import styles from '../css/main.css';

const cx = classNames.bind(styles);


class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.changeDifficulty = this.changeDifficulty.bind(this);
    this.handleSolve = this.handleSolve.bind(this);
  }

  changeDifficulty(e) {
    this.props.changeDifficulty(e.target.value);
  }

  handleSolve(e) {
    e.preventDefault();
    this.props.solveSudoku()();
  }

  render() {
    let className = cx('optionsMenu');
    if (this.props.show) {
      className = cx('optionsMenu', 'shown');
    }
    return (
      <menu className={className}>
        <ul className={cx('menuList')}>
          <li>
            Complete the grid by ensuring there are no duplicate colors in each
            row, column, and 3 x 3 square.
          </li>
          <li>
            <label>Difficulty</label>
            <select
              onChange={this.changeDifficulty}
              value={this.props.difficulty} >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </li>
          <li>
            <button onClick={this.handleSolve}>Solve Sudoku!</button>
          </li>
        </ul>
      </menu>
    );
  }
}

export default Menu;
