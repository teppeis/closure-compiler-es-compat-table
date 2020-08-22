module.exports = function() {
  var a = {};
  return (new WeakRef(a)).deref() === a;
};

