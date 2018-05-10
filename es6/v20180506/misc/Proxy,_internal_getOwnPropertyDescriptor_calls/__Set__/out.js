module.exports = function() {
  var b = [], a = new Proxy({}, {getOwnPropertyDescriptor:function(a, c) {
    b.push(c);
    return Object.getOwnPropertyDescriptor(a, c);
  }});
  a.foo = 1;
  a.bar = 1;
  return "foo,bar" === b + "";
};

