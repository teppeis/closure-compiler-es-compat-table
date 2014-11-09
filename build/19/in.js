// let: for-loop statement scope
module.exports = function() {

        for(let baz = 0; false;) {}
        return (function(){ try { baz; } catch(e) { return true; }}());
      
};