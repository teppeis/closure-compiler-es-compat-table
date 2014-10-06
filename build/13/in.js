// shorthand methods
module.exports = function() {

    return ({ y() { return 2; } }).y() === 2;
  
}