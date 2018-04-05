// syntax / destructuring, declarations / computed properties
module.exports = function() {
  var qux = "corge";
  var { [qux]: grault } = { corge: "garply" };
  return grault === "garply";
};
