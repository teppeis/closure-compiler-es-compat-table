// 2019 misc / JSON superset / LINE SEPARATOR can appear in string literals
module.exports = () => {
  return 'a b' === 'a\u2028b';
};
