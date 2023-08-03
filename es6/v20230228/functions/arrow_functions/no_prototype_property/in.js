// functions / arrow functions / no "prototype" property
module.exports = () => {
  var a = () => 5;
  return !a.hasOwnProperty("prototype");

};