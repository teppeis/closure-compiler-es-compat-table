module.exports = function() {
  var a = !1;
  global.__createIterableObject([1, 2, 3], {"return":function() {
    a = !0;
    return {};
  }});
  return a;
};

