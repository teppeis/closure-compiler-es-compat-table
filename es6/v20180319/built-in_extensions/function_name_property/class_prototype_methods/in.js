// built-in extensions / function "name" property / class prototype methods
module.exports = () => {
  class C { foo(){} };
  return (new C).foo.name === "foo";

};