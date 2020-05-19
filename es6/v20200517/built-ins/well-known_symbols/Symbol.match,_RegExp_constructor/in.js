// built-ins / well-known symbols / Symbol.match, RegExp constructor
module.exports = () => {
  var re = /./;
  re[Symbol.match] = false;
  var foo = {constructor: RegExp};
  foo[Symbol.match] = true;
  return RegExp(re) !== re && RegExp(foo) === foo;

};