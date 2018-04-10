// functions / arrow functions / correct precedence
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  return (() => {
    try { Function("0 || () => 2")(); } catch(e) { return true; }
  })();

};