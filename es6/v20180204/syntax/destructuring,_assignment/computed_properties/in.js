// syntax / destructuring, assignment / computed properties
module.exports = function() {
var grault, qux = "corge";
        ({ [qux]: grault } = { corge: "garply" });
        return grault === "garply";
      
};