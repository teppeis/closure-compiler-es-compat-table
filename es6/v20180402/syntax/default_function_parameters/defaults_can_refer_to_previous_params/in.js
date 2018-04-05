// syntax / default function parameters / defaults can refer to previous params
module.exports = function() {
  return (function(a, b = a) {
    return b === 5;
  })(5);
};
