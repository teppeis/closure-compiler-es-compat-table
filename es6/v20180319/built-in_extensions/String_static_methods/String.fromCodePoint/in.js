// built-in extensions / String static methods / String.fromCodePoint
module.exports = function() {
  return String.fromCodePoint() === ''
    && String.fromCodePoint(42) === '*'
    && String.fromCodePoint(65, 90) === 'AZ'
    && String.fromCodePoint(0x2F804) === '\uD87E\uDC04';
};
