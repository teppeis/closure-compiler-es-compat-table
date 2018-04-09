// functions / arrow functions / correct precedence
module.exports = function() {
  return (() => {
    try { Function("0 || () => 2")(); } catch(e) { return true; }
  })();

};