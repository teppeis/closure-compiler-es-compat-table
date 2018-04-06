// misc / prototype of bound functions / generator functions
module.exports = function() {
  function correctProtoBound(proto) {
    var f = function*(){};
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(f, proto);
    }
    else {
      f.__proto__ = proto;
    }
    var boundF = Function.prototype.bind.call(f, null);
    return Object.getPrototypeOf(boundF) === proto;
  }
  return correctProtoBound(Function.prototype)
&& correctProtoBound({})
&& correctProtoBound(null);

};