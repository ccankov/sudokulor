# Sudokulor
[Live](https://ccankov.github.io/sudokulor/)

Sudokulor is a unique take on the classic game Sudoku. While still following the traditional Sudoku rules, Sudokulor boards replace numbers with unique colored tiles that provide a refreshing and visually stunning take on this classic game. It was built using object-oriented JavaScript for the game logic, ReactJS visual components, and CSS for animations and layout.

The entire project was conceived, designed, and completed in a strict 5-day timeframe, with the potential for future enhancement.

## Technologies
The base Sudoku game logic was built using JavaScript ES6 syntax and is done using an object-oriented approach. The game logic includes checking for the possible values of each tile, and includes additional logic to check whether rows, columns, and squares are solvable.

The UI is implemented using ReactJS, with highly reusable components for the tiles and the mini-tiles. Automatically solving the Sudoku puzzle is implemented using a backtracking algorithm in the ReactJS UI layer to allow for smooth and responsive rendering of the algorithm logic.

## Features & Technical Details
### Responsive UI and CSS Animations

![UI Elements](docs/screenshots/sudokulor_ui.png)

Sudokulor adds a visually stunning element to the classic Sudoku game by replacing numbers with colored tiles. Additionally, empty tiles have been populated with a 3 x 3 grid of mini-tiles which indicate the current possible colors for that grid position.

Clicking on a mini-tile will select that color in the Sudoku grid, and the grid will automatically update the possible values of other grid positions based on the player's choice. This provides a more intuitive and user-friendly interaction with the game board. Clicking a selected tile will deselect it and update the game board as well.

### Solution Algorithm

Sudokulor gives users the options to automatically solve the current puzzle using a backtracking algorithm. The algorithm is implemented in the UI layer in order to visualize the solution logic.

While the backtracking algorithm typically constitutes a brute-force approach to solving Sudoku puzzles, Sudokulor uses a custom implementation of the algorithm to give it more foresight and reduce solution time. Instead of trying every possible value for each tile, the algorithm checks whether selecting a particular tile color will render that tile's row, column, and square unsolvable. If so, it chooses a different color instead. This makes the algorithm more efficient than a purely brute-force approach.

The following code sample provides insight into the backtracking optimizations that allow each iteration to check whether a 9-tile set is solvable:

````````javascript
isSetSolvable(set) {
  let missingVals = this.getMissingVals(set);
  let variableTiles = set.filter(tile => tile.value === 0);
  let tileOptions = variableTiles.map(tile => tile.possibleVals());
  if (!tileOptions.every(options => options.length > 0)) {
    return false;
  }
  for (let i = 0; i < missingVals.length; i++) {
    let val = missingVals[i];
    if (!tileOptions.some(options => options.includes(val))) {
      return false;
    }
  }
  return true;
}
````````

### Zen Mode
The game includes a "Zen Mode" which is available after completing a Sudoku puzzle. This mode starts with no fixed tiles and allows the user full customization of the game board. While still adhering to the Sudoku rules, this mode allows users to let their creativity flow and create unique art creations from Sudoku's 6.67 x 10^21 possible solution grids.

### Object-Oriented Game Logic

The core Sudoku game logic is implemented using an object-oriented approach in JavaScript. The overall game board is contained in a `board.js` script. That script implements a class which tracks the state of the board and handles accessing individual tile sets (rows, columns, squares). It also includes a method to check whether the game board is solved.

Managing the values of each tile is done in a separate `tile.js` script. Each tile is aware of its value and has a reference to the overall board. This reference allows tiles to access the other tiles in their row, column, and square in order to return all the possible valid values for that tile.

## Future Improvements
### Race against the algorithm
While the backtracking algorithm generally produces solution times that are unbeatable by humans, it is possible to manually slow down the algorithms to give humans a fighting chance. This would allow for a fun mode where the user races to beat the algorithm to finding a solution. Additionally, the algorithm's best-case time complexity is O(n) while its worst-case time complexity is O(n^9) which makes for a wide range of possible solution times.
### Migration to a ReactNative app
The Sudokulor UI is implemented to be responsive and mobile-friendly. Additionally, since the UI layer is implented using `ReactJS`, the application can be converted to a mobile application using `ReactNative`.
