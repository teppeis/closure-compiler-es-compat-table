// bindings / const / scope shadow resolution
module.exports = () => {
  try {
    { const bar = 456; }
    const bar = 123;
    return bar === 123;
  } catch(e) {
    return false;
  }

};