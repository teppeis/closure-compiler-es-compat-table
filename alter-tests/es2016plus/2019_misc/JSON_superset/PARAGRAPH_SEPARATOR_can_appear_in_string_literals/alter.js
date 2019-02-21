// 2019 misc / JSON superset / PARAGRAPH SEPARATOR can appear in string literals
module.exports = () => {
  return 'a b' === 'a\u2029b';
};
