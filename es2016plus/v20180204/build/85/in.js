// RegExp Lookbehind Assertions
module.exports = function() {
return /(?<=a)b/.test('ab') && /(?<!a)b/.test('cb') &&
           !/(?<=a)b/.test('b');
  
};