import Player from './player.js';

const game = (() => {
  let player1 = '';
  const player2 = Player('computer', true);

  const createPlayer = (name) => {
    player1 = Player(name);
    return player1;
  };

  const attack = (attacker, victim, x, y) => {
    attacker.attack(victim, x, y);
  };

  const checkLoser = () => {
    if (player1.gameLoser() === false
    && player2.gameLoser() === false) {
      return false;
    }

    return true;
  };

  const createBoards = () => {
    player1.createBoard();
    player2.createBoard();
  };

  return {
    createBoards,
    attack,
    checkLoser,
    createPlayer,
    player1,
    player2,
  };
})();

export default game;
