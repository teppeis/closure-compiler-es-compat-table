module.exports = function() {
  return 2 === "\ud834\udf06".match(/\u{1d306}/u)[0].length;
};

