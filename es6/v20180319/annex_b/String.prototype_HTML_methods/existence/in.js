// annex b / String.prototype HTML methods / existence
module.exports = function() {
  var i, names = ["anchor", "big", "bold", "fixed", "fontcolor", "fontsize",
    "italics", "link", "small", "strike", "sub", "sup"];
  for (i = 0; i < names.length; i++) {
    if (typeof String.prototype[names[i]] !== 'function') {
      return false;
    }
  }
  return true;

};