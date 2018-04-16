// syntax / destructuring, declarations / computed properties
module.exports = () => {
  var qux = "corge";
  var { [qux]: grault } = { corge: "garply" };
  return grault === "garply";

};