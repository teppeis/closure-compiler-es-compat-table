// 2017 misc / RegExp "u" flag, case folding
module.exports = function() {
  return (
    "ſ".match(/\w/iu) &&
    !"ſ".match(/\W/iu) &&
    "\u212a".match(/\w/iu) &&
    !"\u212a".match(/\W/iu) &&
    "\u212a".match(/.\b/iu) &&
    "ſ".match(/.\b/iu) &&
    !"\u212a".match(/.\B/iu) &&
    !"ſ".match(/.\B/iu)
  );
};
