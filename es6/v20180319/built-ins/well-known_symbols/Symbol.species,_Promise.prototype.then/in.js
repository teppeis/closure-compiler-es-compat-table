// built-ins / well-known symbols / Symbol.species, Promise.prototype.then
module.exports = function() {
  var promise      = new Promise(function(resolve){ resolve(42); });
  var FakePromise1 = promise.constructor = function(exec){ exec(function(){}, function(){}); };
  var FakePromise2 = function(exec){ exec(function(){}, function(){}); };
  Object.defineProperty(FakePromise1, Symbol.species, {value: FakePromise2});
  return promise.then(function(){}) instanceof FakePromise2;

};