// syntax / destructuring, parameters / throws on null and undefined
module.exports = function() {
  var a = 'pass a', b = 'pass b';
  try {
    (function({c}){
      a = c;
    }(null));
    return false;
  } catch(e) {}
  try {
    (function({d}){
      b = d;
    }(undefined));
    return false;
  } catch(e) {}
  return a === 'pass a' && b === 'pass b';
};
