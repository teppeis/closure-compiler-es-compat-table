// 2019 features / Symbol.prototype.description / undefined description
module.exports = () => {
  return Symbol.prototype.hasOwnProperty('description')
&& Symbol().description === void undefined;

};