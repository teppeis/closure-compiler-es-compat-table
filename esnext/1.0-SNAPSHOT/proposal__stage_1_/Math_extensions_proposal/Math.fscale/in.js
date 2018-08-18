// proposal (stage 1) / Math extensions proposal / Math.fscale
module.exports = () => {
  return Math.fscale(3, 1, 2, 1, Math.PI) === Math.fround((3 - 1) * (Math.PI - 1) / (2 - 1) + 1);

};