// functions / arrow functions / lexical "arguments" binding
module.exports = function() {
  var f = (function() {
    return z => arguments[0];
  })(5);
  return f(6) === 5;
};
