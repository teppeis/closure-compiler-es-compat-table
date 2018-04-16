// built-ins / well-known symbols / Symbol.iterator, arguments object
module.exports = () => {
  return (function() {
    return typeof arguments[Symbol.iterator] === 'function'
&& Object.hasOwnProperty.call(arguments, Symbol.iterator);
  }());

};