// 2016 features / Array.prototype.includes / Array.prototype.includes
module.exports = () => {
  return [1, 2, 3].includes(1)
&& ![1, 2, 3].includes(4)
&& ![1, 2, 3].includes(1, 1)
&& [NaN].includes(NaN)
&& Array(1).includes();

};