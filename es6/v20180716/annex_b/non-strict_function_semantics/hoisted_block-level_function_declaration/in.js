// annex b / non-strict function semantics / hoisted block-level function declaration
module.exports = () => {
// Note: only available outside of strict mode.
  if (!this) return false;
  var passed = f() === 1;
  function f() { return 1; }
  passed &= typeof g === 'undefined';
  { function g() { return 1; } }
  passed &= g() === 1;
  passed &= h() === 2;
  { function h() { return 1; } }
  function h() { return 2; }
  passed &= h() === 1;
  return passed;

};