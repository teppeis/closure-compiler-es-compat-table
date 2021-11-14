module.exports = function() {
  var a = new EvalError("error", {cause:"cause"});
  return a.hasOwnProperty("cause") && "cause" === a.cause;
};

