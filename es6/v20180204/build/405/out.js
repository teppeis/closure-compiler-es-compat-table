module.exports = function() {
  var a = {}, b = Symbol(), c = {};
  return Object.defineProperty ? (Object.defineProperty(a, b, {value:c}), a[b] === c) : passed;
};

