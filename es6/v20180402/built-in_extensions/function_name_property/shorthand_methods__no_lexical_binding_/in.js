// built-in extensions / function "name" property / shorthand methods (no lexical binding)
module.exports = () => {
  var f = "foo";
  return ({f() { return f; }}).f() === "foo";

};