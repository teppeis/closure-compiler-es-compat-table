module.exports = function() {
  var b = [], a = {};
  a[Symbol.toPrimitive] = Function();
  a = new Proxy(a, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  "".search(a);
  return b[0] === Symbol.search && b[1] === Symbol.toPrimitive && 2 === b.length;
};

