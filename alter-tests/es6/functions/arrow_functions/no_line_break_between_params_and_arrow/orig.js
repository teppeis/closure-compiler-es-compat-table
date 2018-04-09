// functions / arrow functions / no line break between params and <code>=></code>
module.exports = function() {
  return (() => {
    try { Function("x\n => 2")(); } catch(e) { return true; }
  })();

};