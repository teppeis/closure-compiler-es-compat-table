// built-ins / Reflect / Reflect.construct, Array subclassing
module.exports = function() {
  function F() {}
  var obj = Reflect.construct(Array, [], F);
  obj[2] = "foo";
  return obj.length === 3 && obj instanceof F;
};
