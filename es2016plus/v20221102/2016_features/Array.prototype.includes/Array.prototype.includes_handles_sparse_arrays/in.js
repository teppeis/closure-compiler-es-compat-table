// 2016 features / Array.prototype.includes / Array.prototype.includes handles sparse arrays
module.exports = () => {
  return [,].includes()
&& Array(1).includes();

};