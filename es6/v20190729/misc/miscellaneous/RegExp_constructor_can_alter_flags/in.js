// misc / miscellaneous / RegExp constructor can alter flags
module.exports = () => {
  return new RegExp(/./im, "g").global === true;

};