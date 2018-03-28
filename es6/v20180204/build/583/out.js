module.exports = function() {
  var b = [], a = Function();
  a[Symbol.species] = Object;
  a = new Proxy({constructor:a, flags:"", exec:function() {
    return null;
  }}, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  RegExp.prototype[Symbol.split].call(a, "");
  return "constructor,flags,exec" === b + "";
};

