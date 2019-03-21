// proposal (stage 1) / String.prototype.codePoints
module.exports = () => {
  var results = [];
  for (let code of 'a𠮷b'.codePoints()) results.push(code);
  return results.length === 3
&& results[0].codePoint === 97 && results[0].position === 0
&& results[1].codePoint === 134071 && results[1].position === 1
&& results[2].codePoint === 98 && results[2].position === 4;

};