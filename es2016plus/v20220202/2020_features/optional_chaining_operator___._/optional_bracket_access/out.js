module.exports = function() {
  var a;
  return 42 === (null == (a = {baz:42}) ? void 0 : a.baz) && !0;
};

