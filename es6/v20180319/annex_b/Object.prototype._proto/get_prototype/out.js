module.exports = function() {
  var a = function() {
  };
  return (new a).__proto__ === a.prototype;
};

