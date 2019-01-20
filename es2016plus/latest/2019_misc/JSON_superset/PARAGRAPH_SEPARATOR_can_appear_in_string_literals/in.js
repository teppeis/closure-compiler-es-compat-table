// 2019 misc / JSON superset / PARAGRAPH SEPARATOR can appear in string literals
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  return eval("'\u2029'") === "\u2029";

};