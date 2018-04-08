module.exports = function() {
  async function a() {}
  async
    function b() {}
  return false;
};

// EXPECT: 4: Error
