module.exports = function() {
  return "Invalid Date" === new Date(NaN) + "";
};

