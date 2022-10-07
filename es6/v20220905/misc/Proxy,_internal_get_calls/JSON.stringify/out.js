module.exports = function() {
  var a = [], d = new Proxy({}, {get:function(c, b) {
    a.push(b);
    return c[b];
  }});
  JSON.stringify(d);
  return "toJSON" === a + "";
};

