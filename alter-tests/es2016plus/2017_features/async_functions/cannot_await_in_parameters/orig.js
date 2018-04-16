// 2017 features / async functions / cannot await in parameters
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  async function a(){ await Promise.resolve(); }
  try { Function("(async function a(b = await Promise.resolve()){}())")(); } catch(e) { return true; }

};