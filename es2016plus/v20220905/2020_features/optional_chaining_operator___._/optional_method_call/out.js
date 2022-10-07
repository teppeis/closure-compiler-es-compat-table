module.exports = function() {
  var a;
  return 42 === (null == (a = {baz:function() {
    return this.value;
  }, value:42}) ? void 0 : a.baz()) && !0;
};

