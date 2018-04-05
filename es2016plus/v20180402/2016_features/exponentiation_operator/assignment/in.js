// 2016 features / exponentiation (**) operator / assignment
module.exports = function() {
  var a = 2;
  a **= 3;
  return a === 8;
};
