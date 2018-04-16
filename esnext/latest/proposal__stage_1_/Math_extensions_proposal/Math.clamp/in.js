// proposal (stage 1) / Math extensions proposal / Math.clamp
module.exports = () => {
  return Math.clamp(2, 4, 6) === 4
&& Math.clamp(4, 2, 6) === 4
&& Math.clamp(6, 2, 4) === 4;

};