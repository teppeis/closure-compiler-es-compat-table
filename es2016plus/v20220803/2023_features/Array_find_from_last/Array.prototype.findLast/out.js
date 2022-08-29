module.exports = function() {
  var a = [{x:1}, {x:2}, {x:1}, {x:2}];
  return a.findLast(function(b) {
    return 1 === b.x;
  }) === a[2];
};

