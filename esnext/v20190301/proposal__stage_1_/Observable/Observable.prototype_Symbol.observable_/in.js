// proposal (stage 1) / Observable / Observable.prototype[Symbol.observable]
module.exports = () => {
  var o = new Observable(function() { });
  return Symbol.observable in Observable.prototype && o[Symbol.observable]() === o;

};