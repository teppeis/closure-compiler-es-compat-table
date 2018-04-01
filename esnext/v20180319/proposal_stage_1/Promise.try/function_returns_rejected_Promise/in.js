// proposal (stage 1) / Promise.try / function returns rejected Promise
module.exports = function() {
var score = 0;
        Promise.try(function() {
          score++;
          return Promise.reject('bar');
        }).catch(function(err) {
          score += (err === 'bar');
          if (score === 2) asyncTestPassed();
        });
      
};