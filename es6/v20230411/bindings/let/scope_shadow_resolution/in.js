// bindings / let / scope shadow resolution
module.exports = () => {
  try {
    { let bar = 456; }
    let bar = 123;
    return bar === 123;
  } catch(e) {
    return false;
  }

};