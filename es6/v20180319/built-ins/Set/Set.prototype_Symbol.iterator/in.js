// built-ins / Set / Set.prototype[Symbol.iterator]
module.exports = function() {
return typeof Set.prototype[Symbol.iterator] === "function";
      
};