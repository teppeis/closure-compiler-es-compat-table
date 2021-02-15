module.exports = function() {
  var a = Object.getOwnPropertyDescriptor(function() {
  }, "name");
  return !1 === a.enumerable && !1 === a.writable && !0 === a.configurable;
};

