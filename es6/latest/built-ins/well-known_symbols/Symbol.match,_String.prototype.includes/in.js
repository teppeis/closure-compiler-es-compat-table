// built-ins / well-known symbols / Symbol.match, String.prototype.includes
module.exports = () => {
  var re = /./;
  try {
    '/./'.includes(re);
  } catch(e){
    re[Symbol.match] = false;
    return '/./'.includes(re);
  }

};