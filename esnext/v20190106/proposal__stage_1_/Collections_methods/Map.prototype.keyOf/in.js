// proposal (stage 1) / Collections methods / Map.prototype.keyOf
module.exports = () => {
  return new Map([[1, 2], [2, NaN]]).keyOf(2) === 1
&& new Map([[1, 2], [2, NaN]]).keyOf(NaN) === undefined;

};