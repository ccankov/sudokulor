## Sudokulor

### Background

Sudokulor is a unique take on the classic game Sudoku. While still following the traditional Sudoku rules, Sudokulor boards replace numbers with unique colored tiles that provide a refreshing and visually stunning take on this classic game.

The objective of Sudokulor is to complete a valid Sudoku by ensuring that each row, column, and 3 x 3 square has a complete set of the 9 unique colors. The game also includes a "Zen Mode" which starts with a completely blank board and allows players to create beautiful abstract art creations.

### Functionality & MVP  

Sudokulor will provide the following functionality to users:

- [X] Fully functional Sudoku game logic
- [X] Multiple difficulty levels with a large number of preset puzzles
- [X] Displaying the possible colors for unmarked tiles
- [X] A highly visual solution algorithm which can solve any Sudoku puzzle

In addition, this project will include:

- [X] An About menu describing the background and rules of the game
- [X] A production Readme

### Wireframes

This app will consist of a single screen with the interactive game board, timer, options and nav links to my Github and LinkedIn profiles, and the About menu which allows the user to control difficulty and auto-solve the puzzle.  The game board itself will have colored tiles with some space between them. There will be visual indicators of the 3x3 squares that are required by the Sudoku rules. Tiles that have not been assigned a color will instead be a 3x3 grid of "mini-tiles" which the user can click to assign a color to the larger tile that is part of the Sudoku grid.

The score will be shown above or below the game board. I also want to show a count of how many times each color pairing occurs. A pairing is defined as two colors being adjacent, meaning each tile can contribute to 4 different pairings.

The settings and instructions will be in a modal that is only visible when the user clicks on the settings button.

![wireframes](docs/wireframes)

### Architecture and Technologies

The underlying game logic will be implemented using vanilla JavaScript by following an object-oriented design pattern. The board elements and user interaction with leverage `ReactJS` to provide a simple and highly performant UI implementation.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for keeping track of the entire Sudoku grid including the score and the state of the game (won, incomplete, no valid Sudoku left).

`tile.js`: this script will handle the logic for each tile. It will track whether its value has been specified, what that value is, and have methods to calculate its possible values when given the entire board.

`puzzle_seeds`: seed puzzles which are transformed to create nearly endless puzzles that are indistinguishable from one another.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and either `React.js` or `jQuery`, depending on the technology choice.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Begin coding the basic Sudoku game logic.  Goals for the day:

- Get a green bundle with `webpack`
- Good progress through the Sudoku base logic (aim for 50%)

**Day 2**: Finish the basic Sudoku game logic. Then, include logic for calculating what are current valid numbers for each tile that the user has not yet fixed. If there is still time, start to hook up the game logic to the HTML game board.  Goals for the day:

- Have functioning Sudoku logic that checks for game over
- Implement additional logic to indicate the possible values for each time given the current state of the board
- Implement the basic visual pieces of the game: tiles and mini-tiles

**Day 3**: Complete the visual layout of the game. This should include both interactive tiles, mini tiles to show the possible values for each unchosen tile and the overall grid layout. Implement the logic of the scoring system, without any visual elements to indicate score.  Goals for the day:

- Have a functional Sudoku board that the user can interact with and modify tiles
- Have a start on the scoring logic. Be able to calculate a score after every move


**Day 4**: Finish the logic and visual elements for the scoring system. Create game start/end logic, and a model menu with instructions and color palette options.  Goals for the day:

- Indicate the current score to the user, and make it intuitive how the score is calculated
- Have game instructions and a menu. Be able to handle notifying the user when a valid Sudoku is completed, or they are out of possible moves
- Give options to the user to change colors
- If time permits: have some sort of visual indicator of which tiles are worth more points


### Bonus features

There are other potential ideas for enhancement. Some ideas:

- [X] Fancy CSS animations
- [ ] Allow users to "reserve" their favorite color combination. This would require a backend
