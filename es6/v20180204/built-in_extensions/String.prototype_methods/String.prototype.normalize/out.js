module.exports = function() {
  return "function" === typeof String.prototype.normalize && "\u1e09" === "c\u0327\u0301".normalize("NFC") && "c\u0327\u0301" === "\u1e09".normalize("NFD");
};

