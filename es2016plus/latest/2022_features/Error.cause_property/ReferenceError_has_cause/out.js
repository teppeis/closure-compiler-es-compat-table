module.exports = function() {
  var a = new ReferenceError("error", {cause:"cause"});
  return a.hasOwnProperty("cause") && "cause" === a.cause;
};

