// 2017 features / async functions / async function prototype, Symbol.toStringTag
module.exports = () => {
  return Object.getPrototypeOf(async function (){})[Symbol.toStringTag] === "AsyncFunction";

};