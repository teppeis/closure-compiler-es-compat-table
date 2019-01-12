// 2019 misc / JSON superset / LINE SEPARATOR can appear in string literals
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  return eval("'\u2028'") === "\u2028";

};