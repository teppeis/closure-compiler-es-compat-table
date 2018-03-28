module.exports = function() {
  return "bound foo" === function() {
  }.bind({}).name && "bound " === function() {
  }.bind({}).name;
};

