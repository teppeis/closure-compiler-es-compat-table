module.exports = function() {
  var a = {}, b = Symbol(), c = {};
  a[b] = c;
  return a[b] === c;
};

