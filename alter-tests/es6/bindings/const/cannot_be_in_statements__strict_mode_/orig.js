// bindings / const / cannot be in statements (strict mode)
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  'use strict';
  const bar = 1;
  try {
    Function("'use strict'; if(true) const baz = 1;")();
  } catch(e) {
    return true;
  }

};