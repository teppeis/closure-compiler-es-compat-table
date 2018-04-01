// functions / arrow functions / no "prototype" property
module.exports = function() {
  var a = () => 5;
  return !a.hasOwnProperty("prototype");
};
