// built-ins / Reflect / Reflect.set
module.exports = () => {
  var obj = {};
  Reflect.set(obj, "quux", 654);
  return obj.quux === 654;

};