module.exports = function() {
  var b = [], a = new Proxy({length:2, 0:0, 1:0}, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  Function.prototype.apply({}, a);
  return "length,0,1" === b + "";
};

