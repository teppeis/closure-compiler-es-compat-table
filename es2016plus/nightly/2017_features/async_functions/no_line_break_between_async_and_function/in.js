// 2017 features / async functions / no line break between async and function
module.exports = () => {
  async function a() {}
  async
    function b() {}
  return false;
};

// EXPECT: 4: ERROR
