module.exports = function() {
  var a = Symbol(), b = void 0 === a.foo;
  Symbol.prototype.foo = 2;
  b &= 2 === a.foo;
  delete Symbol.prototype.foo;
  return b;
};

