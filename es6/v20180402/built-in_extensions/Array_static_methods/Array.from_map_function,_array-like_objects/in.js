// built-in extensions / Array static methods / Array.from map function, array-like objects
module.exports = function() {
  return (
    Array.from(
      { 0: "foo", 1: "bar", length: 2 },
      function(e, i) {
        return e + this.baz + i;
      },
      { baz: "d" }
    ) +
      "" ===
    "food0,bard1"
  );
};
