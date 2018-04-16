// misc / miscellaneous / accessors aren't constructors
module.exports = () => {
  var f = (Object.getOwnPropertyDescriptor({get a(){}}, 'a')).get;
  try {
    new f;
  } catch(e) {
    return true;
  }

};