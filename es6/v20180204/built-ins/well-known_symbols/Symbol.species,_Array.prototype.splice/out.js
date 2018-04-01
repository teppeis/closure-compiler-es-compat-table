module.exports = function() {
  var a = [];
  a.constructor = {};
  a.constructor[Symbol.species] = function() {
    return {foo:1};
  };
  return 1 === Array.prototype.splice.call(a, 0).foo;
};

