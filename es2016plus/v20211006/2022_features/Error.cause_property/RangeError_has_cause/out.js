module.exports = function() {
  var a = new RangeError("error", {cause:"cause"});
  return a.hasOwnProperty("cause") && "cause" === a.cause;
};

