/* eslint-disable no-undef */
import gameBoard from '../src/modules/gameboard';
import Ship from '../src/modules/ship';

describe('Test gameboard creation', () => {
  const testBoard = gameBoard();
  testBoard.createBoard();
  test('Create board should produce a 10x10 2D array', () => {
    expect(testBoard.boardArray[3][9]).toBe(9);
    expect(testBoard.boardArray[7][7]).toBe(7);
    expect(testBoard.boardArray[9][0]).toBe(0);
  });
});

describe('Test ship placement on board', () => {
  const testBoard = gameBoard();
  testBoard.createBoard();
  const cruiser = Ship(3, 'cruiser');
  const submarine = Ship(4, 'submarine');
  const destroyer = Ship(5, 'destroyer');

  test('Ship should take the space of its length within boardArray (horizontal)', () => {
    testBoard.placeShip(7, 5, 'horizontal', cruiser);

    expect(testBoard.boardArray[5][7]).toBe('cruiser');
    expect(testBoard.boardArray[5][8]).toBe('cruiser');
    expect(testBoard.boardArray[5][9]).toBe('cruiser');

    testBoard.createBoard();
  });

  test('Ship should take the space of its length within boardArray (vertical)', () => {
    testBoard.placeShip(7, 5, 'vertical', cruiser);

    expect(testBoard.boardArray[5][7]).toBe('cruiser');
    expect(testBoard.boardArray[6][7]).toBe('cruiser');
    expect(testBoard.boardArray[7][7]).toBe('cruiser');

    testBoard.createBoard();
  });

  test('Ships should not be placed if they are outside of boardArray', () => {
    testBoard.placeShip(8, 5, 'horizontal', cruiser);
    testBoard.placeShip(8, 8, 'vertical', submarine);
    testBoard.placeShip(8, 10, 'vertical', destroyer);

    expect(testBoard.boardArray[5][8]).toBe(8);
    expect(testBoard.boardArray[8][8]).toBe(8);
    expect(testBoard.boardArray[9][8]).toBe(8);

    testBoard.createBoard();
  });

  test('Ships should not overlap inside boardArray', () => {
    testBoard.placeShip(3, 4, 'horizontal', cruiser);
    testBoard.placeShip(3, 4, 'vertical', submarine);
    testBoard.placeShip(4, 4, 'horizontal', destroyer);

    expect(testBoard.boardArray[4][3]).toBe('cruiser');
    expect(testBoard.boardArray[4][5]).toBe('cruiser');
    expect(testBoard.boardArray[5][3]).toBe(3);
    expect(testBoard.boardArray[4][7]).toBe(7);
  });
});

describe('Test ships receiving attacks and missed attacks', () => {
  const testBoard = gameBoard();
  testBoard.createBoard();
  const cruiser = Ship(3, 'cruiser');
  const carrier = Ship(1, 'carrier');

  test('If a ship receives attacks equal to its length it should sink', () => {
    testBoard.placeShip(6, 5, 'horizontal', cruiser);
    testBoard.receiveAttack(6, 5);
    testBoard.receiveAttack(7, 5);
    expect(cruiser.isSunk()).toBe(false);
    testBoard.receiveAttack(8, 5);
    expect(cruiser.isSunk()).toBe(true);
  });

  test('Add attack to missed attacks', () => {
    testBoard.receiveAttack(6, 6);
    expect(testBoard.missedAttacks[0]).toStrictEqual([6, 6]);
    testBoard.receiveAttack(8, 3);
    expect(testBoard.missedAttacks[1]).toStrictEqual([8, 3]);
    expect(testBoard.missedAttacks.length).toBe(2);
  });

  test('Dont execute if attack is out of gameboard', () => {
    testBoard.receiveAttack(10, 8);
    testBoard.receiveAttack(8, 10);
    testBoard.receiveAttack(10, 10);
    expect(testBoard.missedAttacks.length).toBe(2);
  });

  test('Return true if all ships have sunk', () => {
    expect(testBoard.didShipsSink()).toBe(true);
    testBoard.placeShip(3, 1, 'horizontal', carrier);
    expect(testBoard.didShipsSink()).toBe(false);
    testBoard.receiveAttack(3, 1);
    expect(testBoard.didShipsSink()).toBe(true);
  });
});
