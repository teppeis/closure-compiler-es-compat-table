// 2018 features / RegExp Unicode Property Escapes
module.exports = function() {
  const regexGreekSymbol = /\p{Script=Greek}/u;
  return regexGreekSymbol.test('π');

};