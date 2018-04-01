// proposal (stage 1) / Observable / Symbol.observable well known symbol
module.exports = function() {
return typeof Symbol.observable === 'symbol';
      
};