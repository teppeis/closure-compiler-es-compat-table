// syntax / Unicode code point escapes / in identifiers
module.exports = function() {
  var 𐋀 = { 𐋀: 2 };
  return 𐋀["\ud800\udec0"] === 2;
};
