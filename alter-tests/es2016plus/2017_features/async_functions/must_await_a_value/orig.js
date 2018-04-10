// 2017 features / async functions / must await a value
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  async function a(){ await Promise.resolve(); }
  try { Function("(async function a(){ await; }())")(); } catch(e) { return true; }

};