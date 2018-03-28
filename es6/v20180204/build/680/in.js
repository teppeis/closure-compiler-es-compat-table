// RegExp syntax extensions: invalid backreferences become octal escapes
module.exports = function() {
return /\41/.exec("!")[0] === "!"
          && /[\41]/.exec("!")[0] === "!";
      
};