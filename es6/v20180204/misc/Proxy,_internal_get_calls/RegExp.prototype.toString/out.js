module.exports = function() {
  var b = [], a = new Proxy({}, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  RegExp.prototype.toString.call(a);
  return "source,flags" === b + "";
};

