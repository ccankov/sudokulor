## Sudokulor

### Background

Sudokulor is a unique take on the classic game Sudoku. While still following the traditional Sudoku rules, Sudokulor boards begin completely empty and the tiles use 9 different colors instead of using numbers.

The objective of Sudokulor is to complete a valid Sudoku by populating all tiles, but the player is given a higher score based on the number of adjacent color pairs. The end result is a highly artistic game that incentivizes creating unique and beautiful patterns of colored tiles.

### Functionality & MVP  

Sudokulor will provide the following functionality to users:

- [ ] Fully functional Sudoku game logic
- [ ] Scoring system which incentivizes creating patterns
- [ ] Displaying the possible colors for unmarked tiles
- [ ] Customizable color palettes to allow users to personalize their art creations

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with the interactive game board, score display, options and nav links to the Github, my LinkedIn,
and the About modal.  The game board itself will have colored tiles with some space between them. There will be visual indicators of the 3x3 squares that are required by the Sudoku rules. Tiles that have not been assigned a color will instead be a 3x3 grid of "mini-tiles" which the user can click to assign a color to the larger tile that is part of the Sudoku grid.

The score will be shown above or below the game board. I also want to show a count of how many times each color pairing occurs. A pairing is defined as two colors being adjacent, meaning each tile can contribute to 4 different pairings.

The settings and instructions will be in a modal that is only visible when the user clicks on the settings button.

![wireframes](docs/wireframes)

### Architecture and Technologies

The underlying game logic will be implemented using vanilla JavaScript by following an object-oriented design pattern. For the board elements and user interaction, there is a wide range of technologies I could use:

- `React.js` would give a very simple and highly performant implementation of the UI
- The UI could also easily be implemented with `jQuery` or even just vanilla DOM manipulations
- Since the UI is relatively simple, I also have the unique opportunity to explore a new frontend framework like AngularJS or Vue.js

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for keeping track of the entire Sudoku grid including the score and the state of the game (won, incomplete, no valid Sudoku left).

`tile.js`: this script will handle the logic for each tile. It will track whether its value has been specified, what that value is, and have methods to calculate its possible values when given the entire board.

`palette.js`: this script will be used to dynamically update styles with user-defined color palettes.

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

- [ ] Extra game mode to solve normal Sudoku puzzles with seed values
- [ ] Fancy CSS animations
- [ ] Allow users to "reserve" their favorite color combination. This would require a backend
