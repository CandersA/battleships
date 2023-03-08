const gameBoard = () => {
  const boardArray = [];

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
      for (let i = 0; i < ship.shipLength; i += 1) {
        boardArray[y][x + i] = ship.shipMarker;
      }
    } else if (rotation === 'vertical') {
      if (y + ship.shipLength > 10) {
        return 'Ship is too far down, ship not placed';
      }
      for (let i = 0; i < ship.shipLength; i += 1) {
        boardArray[y + i][x] = ship.shipMarker;
      }
    }
    return boardArray;
  };

  return {
    createBoard,
    placeShip,
    boardArray,
  };
};

export default gameBoard;
