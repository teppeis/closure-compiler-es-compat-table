// syntax / destructuring, declarations / throws on null and undefined
module.exports = () => {
  var a = 'pass a', b = 'pass b';
  try {
    var {c} = null;
    a = c;
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  try {
    var {d} = undefined;
    b = d;
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  return a === 'pass a' && b === 'pass b';
};
