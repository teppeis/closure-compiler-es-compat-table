// syntax / destructuring, parameters / computed properties
module.exports = () => {
  var qux = "corge";
  return function({ [qux]: grault }) {
    return grault === "garply";
  }({ corge: "garply" });

};