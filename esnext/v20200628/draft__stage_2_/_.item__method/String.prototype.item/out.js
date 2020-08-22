module.exports = function() {
  return "a" === "abc".item(0) && "a" === "abc".item(-3) && "b" === "abc".item(1) && "b" === "abc".item(-2) && "c" === "abc".item(2) && "c" === "abc".item(-1) && void 0 === "abc".item(3) && void 0 === "abc".item(-4);
};

