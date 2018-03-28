// miscellaneous: accessors aren't constructors
module.exports = function() {
var f = (Object.getOwnPropertyDescriptor({get a(){}}, 'a')).get;
        try {
          new f;
        } catch(e) {
          return true;
        }
      
};