// built-in extensions / Number properties / Number.parseInt
module.exports = () => {
  return Number.parseInt('015', 10) === 15
    && Number.parseInt('015') === 15
    && Number.parseInt('015', 8) === 13
    && Number.parseInt('015', 16) === 21
    && Number.parseInt('0x15') === 21;
};
