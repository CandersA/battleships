/* eslint-disable no-undef */
import Ship from '../src/modules/ship';

describe('Test ship module', () => {
  test('Ship hits get incremented by one when hit is called', () => {
    const testShip = Ship();
    testShip.hit();
    testShip.hit();
    expect(testShip.hit()).toBe(3);
  });

  test('Ship is sunk if ship length equals hits', () => {
    const testShip = Ship(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });

  test('Ship is not sunk if hits are not equal to ship length', () => {
    const testShip = Ship(4);
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
  });
});
