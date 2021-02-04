/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i++){
    board.push(Array(WIDTH).fill(null))
     }
     return board
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  const top = document.createElement("tr"); //top row that allows you to hover & see where your piece will fall
  top.setAttribute("id", "column-top"); //sets ID to top row to apply css styling
  top.addEventListener("click", handleClick); //adding click event listener that runs handleClick function

  for (let x = 0; x < WIDTH; x++) { //loops over the width and creates a td with it's own id number and appends them to the top row 
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top); //appends the top row to the htmlBoard container

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { //loops over the height and creates a row 
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) { //for each loop of the height loop, loops over the width and creates a td with the id of the height index-width index then appends it to the row
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row); //appends each row to the board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT -1; y >=0; y--){ 
    if(!board[y][x]){ //if value is null then it is a filled index and will return the y value in which the token will be placed
      return y
    }
  }
  return null; //if the index is filled already it won't return a value
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const td = document.getElementById(`${y}-${x}`) //retrieves the cell at the corresponding y,x value from click event
  let div = document.createElement('div');
  div.classList.add('piece');
  if (currPlayer === 1){
    div.classList.add('p1')
  } else {
    div.classList.add('p2')
  }
  td.appendChild(div); //append the created token div to the corresponding td
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(row => row.every(cell => cell))){
    return endGame(`It's a tie!`)
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every( //checks the idx value to see if x&y are 1/2 and also the same value as the current player
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { //loops over the height axis
    for (let x = 0; x < WIDTH; x++) { //while looping over height, loops over the width 
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //check for horizontal match by checking the indexes in a row, increments the x index value to check the one next to it untl there are 4 in a row
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //does same thing but vertically
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //checks by incrementing both y and x value index to see if they align diagnally 
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //check downwards diaganol by decreasing y and x index value 

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true; //return true if the _win function comes back true on any of the 4 directions possible to win
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
