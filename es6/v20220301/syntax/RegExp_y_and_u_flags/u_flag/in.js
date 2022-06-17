// syntax / RegExp "y" and "u" flags / "u" flag
module.exports = () => {
  return "𠮷".match(/^.$/u)[0].length === 2;

};