const gameBoard = () => {
  const boardArray = [];
  const ships = [];

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

      // If there's nothing wrong add the ship to the ships array
      ships.push(ship);
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

      // If there's nothing wrong add the ship to the ships array
      ships.push(ship);
    }
    return ships;
  };

  const missedAttacks = [];

  const receiveAttack = (x, y) => {
    if (x > 9 || y > 9) {
      return 'Attack is out of game board';
    }
    const coordinates = boardArray[y][x];
    // If coordinates are a string there is a ship there
    if (typeof coordinates === 'string') {
      /* Go through the ship array and check which marker of a ship
      is equal to the coordinates. Hit that ship */
      ships.forEach((ship) => {
        if (ship.shipMarker === coordinates) {
          ship.hit();
        }
      });
    // If there wasn't a hit, add the attack to missed attacks
    } else {
      missedAttacks.push([x, y]);
      return missedAttacks;
    }
    return coordinates;
  };

  // If any of the ships return false to isSunk() .every returns false
  const didShipsSink = () => ships.every((ship) => ship.isSunk() === true);

  return {
    createBoard,
    placeShip,
    receiveAttack,
    boardArray,
    missedAttacks,
    didShipsSink,
  };
};

export default gameBoard;
