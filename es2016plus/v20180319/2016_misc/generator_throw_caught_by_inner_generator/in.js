// 2016 misc / generator throw() caught by inner generator
module.exports = function() {
function * generator() {
     yield * (function * () {
     try {
     yield 'foo';
     }
     catch(e) {
     return;
     }
     }());
     yield 'bar';
     }
     var iter = generator();
     iter.next();
     return iter['throw']().value === 'bar';
     
};