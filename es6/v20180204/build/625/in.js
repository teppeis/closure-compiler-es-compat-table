// Object static methods accept primitives: Object.getPrototypeOf
module.exports = function() {
return Object.getPrototypeOf('a').constructor === String;
      
};