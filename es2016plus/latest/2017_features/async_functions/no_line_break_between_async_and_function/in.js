// 2017 features / async functions / no line break between async and function
module.exports = function() {
  async function a() {}
  async
    function b() {}
  return false;
};

// EXPECT: 4: Error
