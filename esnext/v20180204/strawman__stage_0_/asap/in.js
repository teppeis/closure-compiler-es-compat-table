// strawman (stage 0) / asap
module.exports = (asyncTestPassed) => {
  var passed = false;
  setTimeout(function(){ passed = false; }, 1);
  asap(function(){ if(passed)asyncTestPassed(); });
  passed = true;

};