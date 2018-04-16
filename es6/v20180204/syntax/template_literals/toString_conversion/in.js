// syntax / template literals / toString conversion
module.exports = () => {
  var a = {
    toString: function() { return "foo"; },
    valueOf: function() { return "bar"; },
  };
  return `${a}` === "foo";

};