module.exports = function() {
  return "-" === /[\w-_]/.exec("-")[0];
};

