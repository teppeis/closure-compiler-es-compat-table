module.exports = function() {
  return "\u017f".match(/\w/iu) && !"\u017f".match(/\W/iu) && "\u212a".match(/\w/iu) && !"\u212a".match(/\W/iu) && "\u212a".match(/.\b/iu) && "\u017f".match(/.\b/iu) && !"\u212a".match(/.\B/iu) && !"\u017f".match(/.\B/iu);
};

