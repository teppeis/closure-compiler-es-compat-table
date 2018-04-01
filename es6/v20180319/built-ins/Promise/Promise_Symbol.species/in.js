// built-ins / Promise / Promise[Symbol.species]
module.exports = function() {
  var prop = Object.getOwnPropertyDescriptor(Promise, Symbol.species);
  return "get" in prop && Promise[Symbol.species] === Promise;
};
