## Sudokulor

### Background

Sudokulor is a unique take on the classic game Sudoku. While still following the traditional Sudoku rules, Sudokulor boards begin completely empty and the tiles use 9 different colors instead of using numbers.

The objective of Sudokulor is to complete a valid Sudoku by populating all tiles, but the player is given a higher score for consistently placing blocks of identical colors next to each other. The end result is a highly artisic game that incentivizes creating unique and beautiful patterns of colored tiles.

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

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include Start, Stop, and Reset buttons as well as a slider to control the speed.  On the left, three clickable shapes will be used to toggle between the types of grids available.  On the right, there will be three (or more) clickable gradient-filled rectangles used to toggle between color schemes (see Bonus Features).  Additionally, a drop-down will be added to the Controls to toggle between different rule sets (again, see Bonus Features).

![wireframes](images/js_wireframe.jpeg)

### Architecture and Technologies

**NB**: one of the main things you should be researching and deciding upon while you write this proposal is what technologies you plan to use.  Identify and create a plan of attack for the major technical challenges in your project.  It's okay if you don't have all the details of implementation fleshed out, but you should have a solid roadmap by Monday morning.

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`automata.js`: this script will handle the logic behind the scenes.  An Automata object will hold a `type` (hexagon, triangle, or square) and a 2D array of `Cell`s.  It will be responsible for doing neighbor checks for each `Cell` upon iteration and updating the `Cell` array appropriately.

`cell.js`: this lightweight script will house the constructor and update functions for the `Cell` objects.  Each `Cell` will contain a `type` (hexagon, triangle, or square) and an `aliveState` (`true` or `false`).

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
