// syntax / Unicode code point escapes / in property key definitions
module.exports = () => {
  var o = { \u{102C0} : 2 };
  return o['\ud800\udec0'] === 2;

};