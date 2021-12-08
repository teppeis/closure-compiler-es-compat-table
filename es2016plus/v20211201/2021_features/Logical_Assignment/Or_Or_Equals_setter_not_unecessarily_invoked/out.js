module.exports = function() {
  var a = 1, b;
  (b = {get x() {
    return 1;
  }, set x(c) {
    a++;
  }}).x || (b.x = 2);
  return 1 === a;
};

