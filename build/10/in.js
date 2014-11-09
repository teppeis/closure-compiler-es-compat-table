// const: is block-scoped
module.exports = function() {

        { const bar = 456; }
        return (function(){ try { bar; } catch(e) { return true; }}());
      
};