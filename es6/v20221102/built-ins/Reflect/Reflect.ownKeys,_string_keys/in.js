// built-ins / Reflect / Reflect.ownKeys, string keys
module.exports = () => {
  var obj = Object.create({ C: true });
  obj.A = true;
  Object.defineProperty(obj, 'B', { value: true, enumerable: false });
  return Reflect.ownKeys(obj).sort() + '' === "A,B";

};