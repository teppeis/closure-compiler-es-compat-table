// syntax / destructuring, declarations / throws on null and undefined
module.exports = function() {
  try {
    var { a } = null;
    return false;
  } catch (e) {
    if (!(e instanceof TypeError)) return false;
  }
  try {
    var { b } = undefined;
    return false;
  } catch (e) {
    if (!(e instanceof TypeError)) return false;
  }
  return true;
};
