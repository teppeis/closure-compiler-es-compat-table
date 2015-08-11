// destructuring: throws on null and undefined
module.exports = function() {

        try {
          var {a} = null;
          return false;
        } catch(e) {}
        try {
          var {b} = undefined;
          return false;
        } catch(e) {}
        return true;
      
};