// 2017 features / async functions / no line break between async and function
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  async function a(){}
  try { Function("async\n function a(){await 0}")(); } catch(e) { return true; }

};