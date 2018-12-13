// proposal (stage 1) / Promise.try / call function synchronously
module.exports = () => {
  var score = 0;
  Promise.try(function () { score++ });
  return score === 1;

};