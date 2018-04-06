// built-in extensions / function "name" property / class prototype methods
module.exports = function() {
  class C { foo(){} };
  return (new C).foo.name === "foo";

};