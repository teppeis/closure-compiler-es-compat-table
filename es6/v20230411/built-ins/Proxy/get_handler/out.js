module.exports = function() {
  var a = {}, b = new Proxy(a, {get:function(c, d, e) {
    return c === a && "foo" === d && e === b && 5;
  }});
  return 5 === b.foo;
};

