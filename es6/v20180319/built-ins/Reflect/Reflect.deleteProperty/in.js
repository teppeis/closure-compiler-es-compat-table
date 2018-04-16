// built-ins / Reflect / Reflect.deleteProperty
module.exports = () => {
  var obj = { bar: 456 };
  Reflect.deleteProperty(obj, "bar");
  return !("bar" in obj);

};