// syntax / Unicode code point escapes / in property key accesses
module.exports = () => {
  var o = { '\ud800\udec0' : 2 };
  return o.\u{102C0} === 2;

};