// built-in extensions / function "name" property / shorthand methods
module.exports = () => {
  var o = { foo(){} };
  return o.foo.name === "foo";

};