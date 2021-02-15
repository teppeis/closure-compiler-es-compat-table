module.exports = function() {
  var a = {}, b = {}, d = new Proxy(a, {getPrototypeOf:function(c) {
    return c === a && b;
  }});
  return Object.getPrototypeOf(d) === b;
};

