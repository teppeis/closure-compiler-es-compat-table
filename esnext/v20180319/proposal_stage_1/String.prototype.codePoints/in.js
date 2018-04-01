// proposal (stage 1) / String.prototype.codePoints
module.exports = function() {
var results = [];
    for (let code of 'a𠮷b'.codePoints()) results.push(code);
    return results.length === 3
      && results[0] === 97
      && results[1] === 134071
      && results[2] === 98;
  
};