module.exports = function() {
  var a = {a:1}, b = a.a;
  a = void 0 === a.b ? 2 : a.b;
  try {
    return eval("let {c = c} = {};"), !1;
  } catch (c) {
  }
  try {
    return eval("let {c = d, d} = {d:1};"), !1;
  } catch (c) {
  }
  return 1 === b && 2 === a;
};

