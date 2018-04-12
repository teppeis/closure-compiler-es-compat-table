module.exports = function() {
  var b = [], a = new Proxy({exec:function() {
    return null;
  }}, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  RegExp.prototype[Symbol.match].call(a);
  a.global = !0;
  RegExp.prototype[Symbol.match].call(a);
  return "global,exec,global,unicode,exec" === b + "";
};

