// shared memory and atomics: Atomics.compareExchange
module.exports = function() {
return typeof Atomics.compareExchange == 'function';
         
};