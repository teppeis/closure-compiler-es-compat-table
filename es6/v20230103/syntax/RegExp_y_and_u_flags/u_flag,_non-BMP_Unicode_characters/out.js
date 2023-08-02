module.exports = function() {
  return 3 === "\ud842\udfb7x".match(/^.x$/u)[0].length;
};

