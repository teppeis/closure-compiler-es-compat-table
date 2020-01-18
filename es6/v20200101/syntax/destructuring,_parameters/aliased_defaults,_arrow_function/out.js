module.exports = function() {
  var a = {b:2}, b = void 0 === a.c ? 3 : a.c;
  return 2 === (void 0 === a.b ? 0 : a.b) && 3 === b;
};

