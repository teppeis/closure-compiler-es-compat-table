// 2017 features / String padding / String.prototype.padStart
module.exports = function() {
  return (
    "hello".padStart(10) === "     hello" &&
    "hello".padStart(10, "1234") === "12341hello" &&
    "hello".padStart() === "hello" &&
    "hello".padStart(6, "123") === "1hello" &&
    "hello".padStart(3) === "hello" &&
    "hello".padStart(3, "123") === "hello"
  );
};
