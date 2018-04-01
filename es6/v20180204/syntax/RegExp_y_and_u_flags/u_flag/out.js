module.exports = function() {
  return 2 === "\ud842\udfb7".match(/^.$/u)[0].length;
};

