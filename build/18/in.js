// let: is block-scoped
module.exports = function() {

        { let bar = 456; }
        return (function(){ try { bar; } catch(e) { return true; }}());
      
};