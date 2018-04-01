module.exports = function() {
  return "function" === typeof String.prototype.includes && "foobar".includes("oba");
};

