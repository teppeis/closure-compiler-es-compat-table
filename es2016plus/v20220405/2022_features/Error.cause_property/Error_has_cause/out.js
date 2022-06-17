module.exports = function() {
  var a = Error("error", {cause:"cause"});
  return a.hasOwnProperty("cause") && "cause" === a.cause;
};

