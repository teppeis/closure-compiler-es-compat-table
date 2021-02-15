module.exports = function() {
  function e() {
    return 42;
  }
  var a = {}, b, c, d;
  return 42 === (null == (c = (b = {baz:function() {
    return 42;
  }}).baz) ? void 0 : c.call(b)) && void 0 === (null == (d = a.baz) ? void 0 : d.call(a)) && 42 === (null == e ? void 0 : 42) && !0;
};

