// annex b / non-strict function semantics / labeled function statements
module.exports = function() {
// Note: only available outside of strict mode.
  if (!this) return false;

  label: function foo() { return 2; }
  return foo() === 2;

};