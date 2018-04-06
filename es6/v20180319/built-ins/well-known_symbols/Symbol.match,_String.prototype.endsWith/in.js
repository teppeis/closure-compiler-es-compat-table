// built-ins / well-known symbols / Symbol.match, String.prototype.endsWith
module.exports = function() {
  var re = /./;
  try {
    '/./'.endsWith(re);
  } catch(e){
    re[Symbol.match] = false;
    return '/./'.endsWith(re);
  }

};