// 2017 features / async functions / no "prototype" property
module.exports = () => {
  async function a(){};
  return !a.hasOwnProperty("prototype");

};