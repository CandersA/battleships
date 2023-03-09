import gameBoard from './gameboard';

const player = (name, computer = false) => {
  const isComputer = computer;
  const playerBoard = gameBoard();

  const createBoard = () => {
    playerBoard.createBoard();
  };

  const getName = () => name;

  const attack = (opponent, x, y) => {
    opponent.playerBoard.receiveAttack(x, y);
  };

  const attacksByAI = [];

  const getRandomMove = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    /* Check for duplicates by checking if both x and y are the same
    as any of the previous attacks */
    const checkDuplicates = attacksByAI.some(
      (move) => move[0] === x && move[1] === y,
    );

    // Add attack to attack archive if there aren't any duplicates
    if (checkDuplicates === false
        || attacksByAI.length === 0) {
      attacksByAI.push([x, y]);
    }

    /* If there is another attack with the same values,
    run the function recursively to find a new value */
    if (checkDuplicates === true) {
      getRandomMove();
    }

    return { x, y };
  };

  const attackAI = (opponent) => {
    const { x } = getRandomMove();
    const { y } = getRandomMove();

    attack(opponent, x, y);
  };

  const gameLost = () => playerBoard.didShipsSink();

  return {
    playerBoard,
    createBoard,
    isComputer,
    getName,
    attack,
    attackAI,
    gameLost,
  };
};

export default player;
