import Ship from './ship';

const gameBoard = () => {
  const boardArray = [];

  const carrier = Ship(1, 'carrier');
  const battleship = Ship(2, 'battleship');
  const cruiser = Ship(3, 'cruiser');
  const submarine = Ship(4, 'submarine');
  const destroyer = Ship(5, 'destoryer');

  const createBoard = () => {
    for (let i = 0; i < 10; i += 1) {
      boardArray[i] = [];
      for (let j = 0; j < 10; j += 1) {
        boardArray[i][j] = j;
      }
    }
    return boardArray;
  };

  const placeShip = (x, y, rotation, ship) => {
    if (x > 9 || y > 9 || x < 0 || y < 0) {
      return 'Coordinates are not appropriate, ship not placed';
    }
    if (rotation === 'horizontal') {
      if (x + ship.shipLength > 10) {
        return 'Ship is too far to the right, ship not placed';
      }
      // This loop makes sure the ship doesn't overlap with another ship
      for (let j = 0; j < ship.shipLength; j += 1) {
        if (typeof boardArray[y][x + j] === 'string') {
          return 'Ship overlaps another ship';
        }
      }
      // If the ship doesn't overlap place the ship in it's position
      for (let i = 0; i < ship.shipLength; i += 1) {
        boardArray[y][x + i] = ship.shipMarker;
      }
    } else if (rotation === 'vertical') {
      if (y + ship.shipLength > 10) {
        return 'Ship is too far down, ship not placed';
      }
      // Here is another instance of similar code as above, but for vertical position
      for (let j = 0; j < ship.shipLength; j += 1) {
        if (typeof boardArray[y + j][x] === 'string') {
          return 'Ship overlaps another ship';
        }
      }
      for (let i = 0; i < ship.shipLength; i += 1) {
        boardArray[y + i][x] = ship.shipMarker;
      }
    }
    return boardArray;
  };

  const missedAttacks = [];

  const receiveAttack = (x, y) => {
    const coordinates = boardArray[y][x];
    if (typeof coordinates === 'string') {
      if (coordinates === 'carrier') {
        carrier.hit();
      } else if (coordinates === 'battleship') {
        battleship.hit();
      } else if (coordinates === 'cruiser') {
        cruiser.hit();
      } else if (coordinates === 'submarine') {
        submarine.hit();
      } else if (coordinates === 'destroyer') {
        destroyer.hit();
      }
    } else {
      missedAttacks.push(coordinates);
      return missedAttacks;
    }
    return coordinates;
  };

  return {
    createBoard,
    placeShip,
    receiveAttack,
    boardArray,
  };
};

export default gameBoard;
