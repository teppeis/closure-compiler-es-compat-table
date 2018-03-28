// spread (...) operator: with astral plane strings, in function calls
module.exports = function() {
return Array(..."𠮷𠮶")[0] === "𠮷";
      
};