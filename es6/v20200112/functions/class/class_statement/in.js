// functions / class / class statement
module.exports = () => {
  class C {}
  return typeof C === "function";

};