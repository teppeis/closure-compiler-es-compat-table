module.exports = function() {
  var a = [], c = new Proxy({}, {getOwnPropertyDescriptor:function(d, b) {
    a.push(b);
    return Object.getOwnPropertyDescriptor(d, b);
  }});
  c.foo = 1;
  c.bar = 1;
  return "foo,bar" === a + "";
};

