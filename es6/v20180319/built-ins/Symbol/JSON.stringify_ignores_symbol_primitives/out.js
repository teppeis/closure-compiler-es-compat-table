module.exports = function() {
  var a = {foo:Symbol()};
  a[Symbol()] = 1;
  var b = [Symbol()];
  return "{}" === JSON.stringify(a) && "[null]" === JSON.stringify(b) && void 0 === JSON.stringify(Symbol());
};

