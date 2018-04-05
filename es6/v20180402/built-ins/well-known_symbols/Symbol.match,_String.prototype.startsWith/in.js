// built-ins / well-known symbols / Symbol.match, String.prototype.startsWith
module.exports = function() {
  var re = /./;
  try {
    "/./".startsWith(re);
  } catch (e) {
    re[Symbol.match] = false;
    return "/./".startsWith(re);
  }
};
