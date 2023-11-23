// 2024 features / RegExp `v` flag / constructor supports it
module.exports = () => {
  return new RegExp('a', 'v') instanceof RegExp;

};