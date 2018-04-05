module.exports = function() {
  return "Symbol(foo)" === String(Symbol("foo"));
};

