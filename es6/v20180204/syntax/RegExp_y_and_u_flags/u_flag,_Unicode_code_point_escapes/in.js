// syntax / RegExp "y" and "u" flags / "u" flag, Unicode code point escapes
module.exports = function() {
return "𝌆".match(/\u{1d306}/u)[0].length === 2;
      
};