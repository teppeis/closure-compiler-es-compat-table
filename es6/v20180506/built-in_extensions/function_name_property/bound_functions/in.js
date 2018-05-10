// built-in extensions / function "name" property / bound functions
module.exports = () => {
  function foo() {};
  return foo.bind({}).name === "bound foo" &&
(function(){}).bind({}).name === "bound ";

};