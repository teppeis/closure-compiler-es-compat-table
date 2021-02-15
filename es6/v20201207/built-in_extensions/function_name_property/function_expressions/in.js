// built-in extensions / function "name" property / function expressions
module.exports = () => {
  return (function foo(){}).name === 'foo' &&
(function(){}).name === '';

};