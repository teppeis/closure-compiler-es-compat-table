// 2017 features / async functions / cannot await in parameters
module.exports = function() {
  async function a() {
    await Promise.resolve();
  }
  (async function a(b = await Promise.resolve()) {
  }());
  return false;
};

// EXPECT: 6: Error
