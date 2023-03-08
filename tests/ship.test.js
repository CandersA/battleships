/* eslint-disable no-undef */
import Ship from '../src/modules/ship';

describe('Test ship module', () => {
  test('Ship hits get incremented by one when hit is called', () => {
    const testShip = Ship();
    testShip.hit();
    testShip.hit();
    expect(testShip.hit()).toBe(3);
  });
});
