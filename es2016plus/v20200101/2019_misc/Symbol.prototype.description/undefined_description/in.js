// 2019 misc / Symbol.prototype.description / undefined description
module.exports = () => {
  return Symbol.prototype.hasOwnProperty('description')
&& Symbol().description === undefined;

};