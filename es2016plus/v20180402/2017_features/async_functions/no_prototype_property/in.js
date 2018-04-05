// 2017 features / async functions / no "prototype" property
module.exports = function() {
  async function a() {}
  return !a.hasOwnProperty("prototype");
};
