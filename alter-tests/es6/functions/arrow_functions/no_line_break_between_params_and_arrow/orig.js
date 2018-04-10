// functions / arrow functions / no line break between params and <code>=></code>
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  return (() => {
    try { Function("x\n => 2")(); } catch(e) { return true; }
  })();

};