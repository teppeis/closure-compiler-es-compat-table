// functions / generators / %GeneratorPrototype%
module.exports = () => {
  function * generatorFn(){}
  var ownProto = Object.getPrototypeOf(generatorFn());
  var passed = ownProto === generatorFn.prototype;
  var sharedProto = Object.getPrototypeOf(ownProto);
  passed &= sharedProto !== Object.prototype &&
sharedProto === Object.getPrototypeOf(function*(){}.prototype) &&
sharedProto.hasOwnProperty('next');
  return passed;

};