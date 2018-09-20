module.exports = function() {
  var a = function() {
  };
  a.method = function() {
    return void 0 === this;
  };
  return (0, a.method)();
};

