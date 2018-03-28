// String.prototype methods: String.prototype.repeat
module.exports = function() {
return typeof String.prototype.repeat === 'function'
          && "foo".repeat(3) === "foofoofoo";
      
};