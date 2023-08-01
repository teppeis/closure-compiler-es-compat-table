// misc / prototype of bound functions / classes
module.exports = () => {
  function correctProtoBound(proto) {
    class C {}
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(C, proto);
    } else {
      C.__proto__ = proto;
    }
    var boundF = Function.prototype.bind.call(C, null);
    return Object.getPrototypeOf(boundF) === proto;
  }
  return correctProtoBound(Function.prototype)
&& correctProtoBound({})
&& correctProtoBound(null);

};