import game from './game.js';

const UI = (() => {
  const generateBoard = (boardData, board) => {
    let rowNum = -1;
    boardData.forEach((row) => {
      rowNum += 1;
      row.forEach((cell) => {
        const inputCell = document
          .createElement('div');
        inputCell.classList.add('cell');
        inputCell.id = (
          `${cell},${rowNum}`);
        board.appendChild(inputCell);
      });
    });
  };

  const getCellListeners = (board) => {
    const cells = board
      .getElementsByClassName('cell');
    const cellArray = Array.from(cells);

    cellArray.forEach((cell) => {
      cell.addEventListener('click', () => {
        console.log(`x = ${cell.id[0]}, y = ${cell.id[2]}`);
      });
    });
  };

  const generateBoards = (player1, player2) => {
    const board1 = document
      .getElementById('gb1');
    const board2 = document
      .getElementById('gb2');
    const boardData1 = player1
      .playerBoard
      .boardArray;
    const boardData2 = player2
      .playerBoard
      .boardArray;

    generateBoard(boardData1, board1);
    generateBoard(boardData2, board2);

    getCellListeners(board2);

    const playerOneName = document
      .getElementById('p1name');
    const playerTwoName = document
      .getElementById('p2name');

    function capitalizeName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }

    playerOneName.textContent = capitalizeName(player1.getName());
    playerTwoName.textContent = capitalizeName(player2.getName());
  };

  const launchGame = (playerName) => {
    const start = document
      .querySelector('.start');
    const boards = document
      .querySelector('.gameboards');

    const player1 = game
      .createPlayer(playerName);
    game.createBoards();

    generateBoards(player1, game.player2);
    start.classList.add('notvisible');
    boards.classList.remove('notvisible');
  };

  const loadEventListeners = () => {
    const launchBtn = document
      .querySelector('.launch-game');
    const playerName = document
      .getElementById('player1');

    launchBtn.addEventListener('click', () => {
      launchGame(playerName.value);
    });
  };

  const loadHomePage = () => {
    loadEventListeners();
  };

  return { loadHomePage };
})();

export default UI;
