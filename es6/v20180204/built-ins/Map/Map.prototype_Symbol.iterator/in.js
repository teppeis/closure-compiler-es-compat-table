// built-ins / Map / Map.prototype[Symbol.iterator]
module.exports = function() {
return typeof Map.prototype[Symbol.iterator] === "function";
      
};