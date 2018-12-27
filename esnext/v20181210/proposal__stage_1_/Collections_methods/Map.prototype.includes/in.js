// proposal (stage 1) / Collections methods / Map.prototype.includes
module.exports = () => {
  return new Map([[1, 2], [2, NaN]]).includes(2)
&& new Map([[1, 2], [2, NaN]]).includes(NaN);

};