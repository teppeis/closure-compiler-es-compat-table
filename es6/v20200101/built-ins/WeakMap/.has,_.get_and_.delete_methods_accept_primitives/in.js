// built-ins / WeakMap / .has, .get and .delete methods accept primitives
module.exports = () => {
  var m = new WeakMap;
  return m.has(1) === false
&& m.get(1) === undefined
&& m.delete(1) === false;

};