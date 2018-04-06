// misc / miscellaneous / built-in prototypes are not instances
module.exports = function() {
  try {
    RegExp.prototype.exec(); return false;
  } catch(e) {}
  try {
    Date.prototype.valueOf(); return false;
  } catch(e) {}

  if (![Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError].every(function (E) {
    return Object.prototype.toString.call(E.prototype) === '[object Object]';
  })) {
    return false;
  }

  return true;

};