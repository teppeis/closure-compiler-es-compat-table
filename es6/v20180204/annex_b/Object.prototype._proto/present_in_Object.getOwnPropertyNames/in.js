// annex b / Object.prototype.__proto__ / present in Object.getOwnPropertyNames()
module.exports = function() {
return Object.getOwnPropertyNames(Object.prototype).indexOf('__proto__') > -1;
      
};