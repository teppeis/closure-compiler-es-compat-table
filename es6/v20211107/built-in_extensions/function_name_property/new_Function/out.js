module.exports = function() {
  return "anonymous" === (new Function()).name;
};

