// built-in extensions / function "name" property / class static methods
module.exports = () => {
  class C { static foo(){} };
  return C.foo.name === "foo";

};