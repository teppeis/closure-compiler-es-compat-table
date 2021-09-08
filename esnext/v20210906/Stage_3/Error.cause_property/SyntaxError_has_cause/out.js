module.exports = function() {
  var a = new SyntaxError("error", {cause:"cause"});
  return a.hasOwnProperty("cause") && "cause" === a.cause;
};

