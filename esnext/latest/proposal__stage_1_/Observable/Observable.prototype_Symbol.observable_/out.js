module.exports = function() {
  var a = new Observable(function() {
  });
  return Symbol.observable in Observable.prototype && a[Symbol.observable]() === a;
};

