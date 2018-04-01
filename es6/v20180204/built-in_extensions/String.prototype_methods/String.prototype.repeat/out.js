module.exports = function() {
  return "function" === typeof String.prototype.repeat && "foofoofoo" === "foo".repeat(3);
};

