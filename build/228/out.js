module.exports = function() {
  var a = !1, b = global.__createIterableObject([1, 2, 3], {"return":function() {
    a = !0;
    return {};
  }});
  try {
    new Map(b);
  } catch (c) {
  }
  return a;
};

