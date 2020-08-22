module.exports = function() {
  var c = {}, b = {value:"foo", configurable:!0}, a = Object.getOwnPropertyDescriptor(new Proxy(c, {getOwnPropertyDescriptor:function(d, e) {
    return d === c && "foo" === e && b;
  }}), "foo");
  return a.value === b.value && a.configurable === b.configurable && !1 === a.writable && !1 === a.enumerable;
};

