module.exports = function() {
  return !("cause" in URIError.prototype);
};

