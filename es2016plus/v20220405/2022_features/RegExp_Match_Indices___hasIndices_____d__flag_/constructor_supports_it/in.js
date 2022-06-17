// 2022 features / RegExp Match Indices (`hasIndices` / `d` flag) / constructor supports it
module.exports = () => {
  return new RegExp('a', 'd') instanceof RegExp;

};