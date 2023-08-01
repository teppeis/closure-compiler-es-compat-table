// finished (stage 4) / RegExp `v` flag / constructor supports it
module.exports = () => {
  return new RegExp('a', 'v') instanceof RegExp;

};