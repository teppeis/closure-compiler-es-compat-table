module.exports = function() {
  var b = [], a = new Proxy({foo:{}, bar:{}}, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  Object.defineProperties({}, a);
  return "foo,bar" === b + "";
};

