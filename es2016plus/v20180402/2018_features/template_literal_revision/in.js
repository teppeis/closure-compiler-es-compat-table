// 2018 features / template literal revision
module.exports = function() {
  function tag(strings, a) {
    return (
      strings[0] === void 0 &&
      strings.raw[0] ===
        "\\01\\1\\xg\\xAg\\u0\\u0g\\u00g\\u000g\\u{g\\u{0\\u{110000}" &&
      strings[1] === "\0" &&
      strings.raw[1] === "\\0" &&
      a === 0
    );
  }
  return tag`\01\1\xg\xAg\u0\u0g\u00g\u000g\u{g\u{0\u{110000}${0}\0`;
};
