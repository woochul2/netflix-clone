import addComma from '../addComma';

describe('addComma', () => {
  it('returns it with a comma and a space if condition is true', () => {
    expect(addComma('a', true)).toBe('a, ');
  });

  it('returns original if condition is false', () => {
    expect(addComma('a', false)).toBe('a');
  });
});
