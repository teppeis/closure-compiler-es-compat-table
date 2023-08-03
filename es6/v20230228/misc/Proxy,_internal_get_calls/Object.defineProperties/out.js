module.exports = function() {
  var a = [], d = new Proxy({foo:{}, bar:{}}, {get:function(c, b) {
    a.push(b);
    return c[b];
  }});
  Object.defineProperties({}, d);
  return "foo,bar" === a + "";
};

