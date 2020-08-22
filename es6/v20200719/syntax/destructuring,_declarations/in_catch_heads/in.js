// syntax / destructuring, declarations / in catch heads
module.exports = () => {
  try {
    throw [1,2];
  } catch([i,j]) {
    try {
      throw { k: 3, l: 4 };
    } catch({k, l}) {
      return i === 1 && j === 2 && k === 3 && l === 4;
    }
  }

};