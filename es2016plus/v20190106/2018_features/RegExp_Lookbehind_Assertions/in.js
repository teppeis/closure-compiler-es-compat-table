// 2018 features / RegExp Lookbehind Assertions
module.exports = () => {
  return /(?<=a)b/.test('ab') && /(?<!a)b/.test('cb') &&
!/(?<=a)b/.test('b');

};