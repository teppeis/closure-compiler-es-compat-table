// syntax / template literals / basic functionality
module.exports = function() {
  var a = "ba",
    b = "QUX";
  return (
    `foo bar
        ${a + "z"} ${b.toLowerCase()}` === "foo bar\nbaz qux"
  );
};
