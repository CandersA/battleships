/* eslint-disable no-undef */
import gameBoard from '../src/modules/gameboard';
import Ship from '../src/modules/ship';

describe('Test gameboard creation', () => {
  test('Create board should produce a 10x10 2D array', () => {
    const testBoard = gameBoard();
    testBoard.createBoard();
    expect(testBoard.boardArray[3][9]).toBe(9);
    expect(testBoard.boardArray[7][7]).toBe(7);
    expect(testBoard.boardArray[9][0]).toBe(0);
  });
});

describe('Test ship placement on board', () => {
  const testBoard = gameBoard();
  testBoard.createBoard();

  test('Ship should take the space of its length within boardArray (horizontal)', () => {
    const testShip = Ship(3, 'tanker');
    testBoard.placeShip(7, 5, 'horizontal', testShip);

    expect(testBoard.boardArray[5][7]).toBe('tanker');
    expect(testBoard.boardArray[5][8]).toBe('tanker');
    expect(testBoard.boardArray[5][9]).toBe('tanker');

    testBoard.createBoard();
  });

  test('Ship should take the space of its length within boardArray (vertical)', () => {
    const testShip = Ship(3, 'tanker');
    testBoard.placeShip(7, 5, 'vertical', testShip);

    expect(testBoard.boardArray[5][7]).toBe('tanker');
    expect(testBoard.boardArray[6][7]).toBe('tanker');
    expect(testBoard.boardArray[7][7]).toBe('tanker');

    testBoard.createBoard();
  });

  test('Ships should not be placed if they are outside of boardArray', () => {
    const testShip = Ship(3, 'tanker');
    const testShip2 = Ship(3, 'cruiser');
    const testShip3 = Ship(3, 'destroyer');
    testBoard.placeShip(8, 5, 'horizontal', testShip);
    testBoard.placeShip(8, 8, 'vertical', testShip2);
    testBoard.placeShip(8, 10, 'vertical', testShip3);

    expect(testBoard.boardArray[5][8]).toBe(8);
    expect(testBoard.boardArray[8][8]).toBe(8);
    expect(testBoard.boardArray[9][8]).toBe(8);

    testBoard.createBoard();
  });
});
