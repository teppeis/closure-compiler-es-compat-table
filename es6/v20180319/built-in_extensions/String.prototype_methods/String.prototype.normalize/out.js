module.exports = function() {
  return "\u1e09" === "c\u0327\u0301".normalize("NFC") && "c\u0327\u0301" === "\u1e09".normalize("NFD");
};

