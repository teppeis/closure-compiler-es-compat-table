module.exports = function() {
  var a = [];
  new new Proxy(Function, {get:function(c, b) {
    a.push(b);
    return c[b];
  }});
  return "prototype" === a + "";
};

