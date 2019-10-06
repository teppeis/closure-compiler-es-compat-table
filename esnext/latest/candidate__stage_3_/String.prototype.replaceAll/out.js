module.exports = function() {
  return "q=query string parameters" === "q=query+string+parameters".replaceAll("+", " ");
};

