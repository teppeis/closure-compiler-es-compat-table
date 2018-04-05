// built-ins / Reflect / Reflect.construct, RegExp subclassing
module.exports = function() {
  function F() {}
  var obj = Reflect.construct(RegExp, ["baz", "g"], F);
  return (
    RegExp.prototype.exec.call(obj, "foobarbaz")[0] === "baz" &&
    obj.lastIndex === 9 &&
    obj instanceof F
  );
};
