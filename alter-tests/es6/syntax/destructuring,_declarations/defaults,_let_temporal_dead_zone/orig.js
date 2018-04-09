// syntax / destructuring, declarations / defaults, let temporal dead zone
module.exports = function() {
  var {a, b = 2} = {a:1};
  try {
    eval("let {c = c} = {};");
    return false;
  } catch(e){}
  try {
    eval("let {c = d, d} = {d:1};");
    return false;
  } catch(e){}
  return a === 1 && b === 2;

};