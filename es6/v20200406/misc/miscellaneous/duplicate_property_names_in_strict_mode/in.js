// misc / miscellaneous / duplicate property names in strict mode
module.exports = () => {
  'use strict';
  return this === void undefined && ({ a:1, a:1 }).a === 1;

};