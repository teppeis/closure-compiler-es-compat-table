// 2017 features / async functions / no line break between async and function
module.exports = () => {
  async function a() {}
  async
    function b() {await 0}
  return false;
};

// EXPECT: 5: ERROR
