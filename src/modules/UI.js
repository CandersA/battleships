import game from './game.js';

const UI = (() => {
  const generateBoards = (player1, player2) => {
    const board1 = document.getElementById('gb1');
    const board2 = document.getElementById('gb2');
    const boardData1 = player1.playerBoard.boardArray;
    const boardData2 = player2.playerBoard.boardArray;

    function generateBoard(boardData, board) {
      boardData.forEach((row) => {
        row.forEach(() => {
          const inputCell = document.createElement('div');
          inputCell.classList.add('cell');
          board.appendChild(inputCell);
        });
      });
    }

    generateBoard(boardData1, board1);
    generateBoard(boardData2, board2);
  };

  const launchGame = (playerName) => {
    const start = document.querySelector('.start');
    const boards = document.querySelector('.gameboards');
    const player1 = game.createPlayer(playerName);
    game.createBoards();
    generateBoards(player1, game.player2);
    start.classList.add('notvisible');
    boards.classList.remove('notvisible');
  };

  const loadEventListeners = () => {
    const launchBtn = document.querySelector('.launch-game');
    const playerName = document.getElementById('player1');

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
