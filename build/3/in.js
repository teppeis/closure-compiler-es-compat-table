// let
module.exports = function() {

            try {
              return (function () { "use strict"; __let_script_executed = true; let foobarbaz2 = 123; return foobarbaz2 == 123; }());
            } catch (e) {
              return false;
            }
          
};