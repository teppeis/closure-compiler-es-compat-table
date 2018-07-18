// syntax / destructuring, assignment / throws on null and undefined
module.exports = () => {
  var a = 'pass a', b = 'pass b';
  try {
    ({a} = null);
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  try {
    ({b} = undefined);
    return false;
  } catch(e) {
    if (!(e instanceof TypeError))
      return false;
  }
  return a === 'pass a' && b === 'pass b';
};
