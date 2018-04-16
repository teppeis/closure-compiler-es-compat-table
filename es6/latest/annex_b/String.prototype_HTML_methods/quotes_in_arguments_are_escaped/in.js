// annex b / String.prototype HTML methods / quotes in arguments are escaped
module.exports = () => {
  var i, names = ["anchor", "fontcolor", "fontsize", "link"];
  for (i = 0; i < names.length; i++) {
    if (""[names[i]]('"') !== ""[names[i]]('&' + 'quot;')) {
      return false;
    }
  }
  return true;

};