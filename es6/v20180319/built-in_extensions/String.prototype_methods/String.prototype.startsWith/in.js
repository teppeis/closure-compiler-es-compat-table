// built-in extensions / String.prototype methods / String.prototype.startsWith
module.exports = function() {
  return (
    typeof String.prototype.startsWith === "function" &&
    "foobar".startsWith("foo")
  );
};
