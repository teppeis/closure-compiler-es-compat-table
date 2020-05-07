// built-in extensions / function "name" property / class statements
module.exports = () => {
  class foo {};
  class bar { static name() {} };
  return foo.name === "foo" &&
typeof bar.name === "function";

};