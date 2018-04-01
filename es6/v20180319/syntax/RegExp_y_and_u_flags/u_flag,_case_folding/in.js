// syntax / RegExp "y" and "u" flags / "u" flag, case folding
module.exports = function() {
return "ſ".match(/S/iu) && "S".match(/ſ/iu);
      
};