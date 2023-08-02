module.exports = function() {
  return 2 === [{x:1}, {x:2}, {x:1}, {x:2}].findLastIndex(function(a) {
    return 1 === a.x;
  });
};

