// built-in extensions / Object static methods / Object.assign
module.exports = () => {
  var o = Object.assign({a:true}, {b:true}, {c:true});
  return "a" in o && "b" in o && "c" in o;

};