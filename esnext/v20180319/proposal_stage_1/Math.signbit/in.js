// proposal (stage 1) / Math.signbit
module.exports = function() {
return Math.signbit(-0) === false
      && Math.signbit(0) === true
      && Math.signbit(-42) === false
      && Math.signbit(42) === true;
  
};