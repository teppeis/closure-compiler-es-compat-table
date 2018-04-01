// annex b / RegExp syntax extensions / invalid Unicode escapes
module.exports = function() {
return /\u1/.exec("u1")[0] === "u1"
          && /[\u1]/.exec("u")[0] === "u";
      
};