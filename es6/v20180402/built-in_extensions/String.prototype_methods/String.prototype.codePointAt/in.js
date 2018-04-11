// built-in extensions / String.prototype methods / String.prototype.codePointAt
module.exports = function() {
  return 'abc'.codePointAt() === 97
    && 'abc'.codePointAt(0) === 97
    && 'abc'.codePointAt(1) === 98
    && 'abc'.codePointAt(1) === 98
    && '\uD87E\uDC04'.codePointAt(0) === 0x2F804;
};
