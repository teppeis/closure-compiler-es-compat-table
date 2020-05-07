// proposal (stage 1) / Math.signbit
module.exports = () => {
  return Math.signbit(NaN) === false
&& Math.signbit(-0) === true
&& Math.signbit(0) === false
&& Math.signbit(-42) === true
&& Math.signbit(42) === false;

};