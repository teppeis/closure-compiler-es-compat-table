// misc / Object static methods accept primitives / Object.keys
module.exports = function() {
  var s = Object.keys('a');
  return s.length === 1 && s[0] === '0';

};