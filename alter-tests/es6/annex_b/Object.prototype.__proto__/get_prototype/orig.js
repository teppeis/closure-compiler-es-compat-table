// annex b / Object.prototype.__proto__ / get prototype
module.exports = () => {
  var A = function(){};
  return (new A()).__proto__ === A.prototype;

};