module.exports = function() {
  return '"\\udf06\\ud834"' === JSON.stringify("\udf06\ud834") && '"\\udead"' === JSON.stringify("\udead");
};

