// syntax / destructuring, declarations / throws on null and undefined
module.exports = () => {
  try {
    var {a} = null;
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  try {
    var {b} = void undefined;
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  return true;

};