// bindings / let / cannot be in statements (strict mode)
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  'use strict';
  let bar = 1;
  try {
    Function("'use strict'; if(true) let baz = 1;")();
  } catch(e) {
    return true;
  }

};