// class: is block-scoped
module.exports = function() {
class C {}
        var c1 = C;
        {
          class C {}
          var c2 = C;
        }
        return C === c1;
      
};