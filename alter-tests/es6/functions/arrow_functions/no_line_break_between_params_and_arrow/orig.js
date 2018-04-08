module.exports = function() {
return (() => {
try { Function("x\n => 2")(); } catch(e) { return true; }
})();

};