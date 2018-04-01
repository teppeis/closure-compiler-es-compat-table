module.exports = function() {
  var a = function() {
    this.x = 1;
  };
  return a.prototype.constructor === a && 1 === (new a).x;
};

