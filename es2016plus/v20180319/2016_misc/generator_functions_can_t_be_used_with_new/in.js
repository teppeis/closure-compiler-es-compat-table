// 2016 misc / generator functions can't be used with "new"
module.exports = function() {
function * generator() {
     yield 3;
     }
     try {
     new generator();
     } catch(e) {
     return true;
     }
     
};