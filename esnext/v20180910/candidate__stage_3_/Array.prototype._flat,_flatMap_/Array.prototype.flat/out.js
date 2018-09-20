module.exports = function() {
  return "12345,6" === [1, [2, 3], [4, [5, 6]]].flat().join("");
};

