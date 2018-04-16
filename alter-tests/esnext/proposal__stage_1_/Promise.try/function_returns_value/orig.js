// proposal (stage 1) / Promise.try / function returns value
module.exports = (asyncTestPassed) => {
  var score = 0;
  Promise.try(function() {
    score++;
    return 'foo';
  }).then(function(val) {
    score += (val === 'foo');
    if (score === 2) asyncTestPassed();
  });

};