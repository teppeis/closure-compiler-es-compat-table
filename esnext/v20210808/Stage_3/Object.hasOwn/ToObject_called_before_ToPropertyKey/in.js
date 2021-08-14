// Stage 3 / Object.hasOwn / ToObject called before ToPropertyKey
module.exports = () => {
  var ok = !!Object.hasOwn;
  try {
    Object.hasOwn(null, { toString: function () { ok = false } });
    return false;
  } catch (e) {
    return ok;
  }

};