// built-in extensions / String static methods / String.raw
module.exports = function() {
  return String.raw({raw: ['a', 'b', 'c']}, 0, 1) === 'a0b1c';
};
