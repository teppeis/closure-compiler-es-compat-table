// proposal (stage 1) / Promise.try / function throws exception
module.exports = (asyncTestPassed) => {
  var score = 0;
  Promise.try(function() {
    score++;
    throw 'bar';
  }).catch(function(err) {
    score += (err === 'bar');
    if (score === 2) asyncTestPassed();
  });

};