module.exports = function() {
  return "a" === "abc".at(0) && "a" === "abc".at(-3) && "b" === "abc".at(1) && "b" === "abc".at(-2) && "c" === "abc".at(2) && "c" === "abc".at(-1) && void 0 === "abc".at(3) && void 0 === "abc".at(-4);
};

