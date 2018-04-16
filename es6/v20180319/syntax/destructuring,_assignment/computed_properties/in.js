// syntax / destructuring, assignment / computed properties
module.exports = () => {
  var grault, qux = "corge";
  ({ [qux]: grault } = { corge: "garply" });
  return grault === "garply";

};