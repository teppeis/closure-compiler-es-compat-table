// built-ins / Reflect / Reflect.defineProperty
module.exports = () => {
  var obj = {};
  Reflect.defineProperty(obj, "foo", { value: 123 });
  return obj.foo === 123 &&
Reflect.defineProperty(Object.freeze({}), "foo", { value: 123 }) === false;

};