// built-in extensions / function "name" property / new Function
module.exports = () => {
  return (new Function).name === "anonymous";

};