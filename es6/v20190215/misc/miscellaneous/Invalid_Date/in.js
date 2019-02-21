// misc / miscellaneous / Invalid Date
module.exports = () => {
  return new Date(NaN) + "" === "Invalid Date";

};