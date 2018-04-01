// bindings / let / for loop statement scope
module.exports = function() {
let baz = 1;
        for(let baz = 0; false;) {}
        return baz === 1;
      
};