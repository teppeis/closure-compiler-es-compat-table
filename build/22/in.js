// RegExp "u" flag
module.exports = function() {

    return "𠮷".match(/./u)[0].length === 2;
  
};