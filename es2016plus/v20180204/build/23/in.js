// async functions: no line break between async and function
module.exports = function() {
async function a(){}
          try { Function("async\n function a(){}")(); } catch(e) { return true; }
        
};