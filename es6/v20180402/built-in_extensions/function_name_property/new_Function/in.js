// built-in extensions / function "name" property / new Function
module.exports = function() {
  return (new Function).name === "anonymous";

};