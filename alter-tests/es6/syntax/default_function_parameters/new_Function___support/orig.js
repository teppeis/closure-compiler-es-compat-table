// syntax / default function parameters / new Function() support
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  return new Function("a = 1", "b = 2",
    "return a === 3 && b === 2;"
  )(3);

};