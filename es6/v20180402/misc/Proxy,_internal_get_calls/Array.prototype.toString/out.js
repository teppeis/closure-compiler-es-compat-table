module.exports = function() {
  var b = [], a = new Proxy({join:Function()}, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  Array.prototype.toString.call(a);
  return "join" === b + "";
};

