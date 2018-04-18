// built-ins / Proxy / "ownKeys" handler invariant
module.exports = () => {
  var passed = false;
  new Proxy({},{});
  // The Type of each result List element is either String or Symbol.
  try {
    Object.keys(new Proxy({}, {
      ownKeys: function () {
        passed = true;
        return [2];
      }}));
    return false;
  } catch(e) {}
  // The result List must contain the keys of all non-configurable own properties of the target object.
  var proxied = {};
  Object.defineProperty(proxied, "foo", { value: 2, writable: true, enumerable: true });
  try {
    Object.keys(new Proxy(proxied, {
      ownKeys: function () {
        return [];
      }}));
    return false;
  } catch(e) {}
  // If the target object is not extensible, then the result List must contain all the keys
  // of the own properties of the target object and no other values.
  try {
    Object.keys(new Proxy(Object.preventExtensions({b:1}), {
      ownKeys: function () {
        return ['a'];
      }}));
    return false;
  } catch(e) {}
  return passed;

};