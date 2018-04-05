// misc / miscellaneous / Invalid Date
module.exports = function() {
  return new Date(NaN) + "" === "Invalid Date";
};
