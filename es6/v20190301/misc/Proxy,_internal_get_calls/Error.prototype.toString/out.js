module.exports = function() {
  var b = [], a = new Proxy({}, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  Error.prototype.toString.call(a);
  return "name,message" === b + "";
};

