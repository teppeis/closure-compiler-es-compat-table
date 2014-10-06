// string spreading
module.exports = function() {

    return ["a", ..."bcd", "e"][3] === "d" && Math.max(..."1234") === 4;
  
};