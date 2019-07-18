// built-in extensions / Number properties / Number.isNaN
module.exports = () => {
  return Number.isNaN(NaN) === true
    &&  Number.isNaN(0) === false
    &&  Number.isNaN(null) === false
    &&  Number.isNaN(undefined) === false
    &&  Number.isNaN('') === false;
};
