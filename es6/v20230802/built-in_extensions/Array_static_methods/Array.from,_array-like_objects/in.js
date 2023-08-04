// built-in extensions / Array static methods / Array.from, array-like objects
module.exports = () => {
  return Array.from({ 0: "foo", 1: "bar", length: 2 }) + '' === "foo,bar";

};