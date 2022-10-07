// syntax / RegExp "y" and "u" flags / "u" flag, non-BMP Unicode characters
module.exports = () => {
  return "𠮷x".match(/^.x$/u)[0].length === 3;

};