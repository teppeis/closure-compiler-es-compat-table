// 2019 misc / Function.prototype.toString revision / [native code]
module.exports = () => {
  const NATIVE_EVAL_RE = /\bfunction\b[\s\S]*\beval\b[\s\S]*\([\s\S]*\)[\s\S]*\{[\s\S]*\[[\s\S]*\bnative\b[\s\S]+\bcode\b[\s\S]*\][\s\S]*\}/;
  return NATIVE_EVAL_RE.test(eval + '');

};