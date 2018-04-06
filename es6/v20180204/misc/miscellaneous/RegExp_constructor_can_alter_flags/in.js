// misc / miscellaneous / RegExp constructor can alter flags
module.exports = function() {
  return new RegExp(/./im, "g").global === true;

};