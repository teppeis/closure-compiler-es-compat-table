// misc / prototype of bound functions / subclasses
module.exports = function() {
  function correctProtoBound(superclass) {
    class C extends superclass {
      constructor() {
        return Object.create(null);
      }
    }
    var boundF = Function.prototype.bind.call(C, null);
    return Object.getPrototypeOf(boundF) === Object.getPrototypeOf(C);
  }
  return correctProtoBound(function(){})
&& correctProtoBound(Array)
&& correctProtoBound(null);

};