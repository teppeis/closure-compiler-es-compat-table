// syntax / Unicode code point escapes / in identifiers
module.exports = () => {
  var \u{102C0} = 2;
  return \u{102C0} === 2;

};