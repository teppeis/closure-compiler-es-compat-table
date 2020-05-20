// 2017 features / async functions / must await a value
module.exports = () => {
  async function a() {
    await Promise.resolve();
  }
  (async function a() {
    await;
  }());
  return false;
};

// EXPECT: 7: ERROR - [JSC_PARSE_ERROR] Parse error. primary expression expected
