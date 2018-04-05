// misc / Object static methods accept primitives / Object.getOwnPropertyNames
module.exports = function() {
  var s = Object.getOwnPropertyNames("a");
  return (
    s.length === 2 &&
    ((s[0] === "length" && s[1] === "0") || (s[0] === "0" && s[1] === "length"))
  );
};
