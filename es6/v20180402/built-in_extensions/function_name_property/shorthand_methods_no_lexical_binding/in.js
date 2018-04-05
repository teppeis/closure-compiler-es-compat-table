// built-in extensions / function "name" property / shorthand methods (no lexical binding)
module.exports = function() {
  var f = "foo";
  return (
    {
      f() {
        return f;
      }
    }.f() === "foo"
  );
};
