// 2016 features / exponentiation (**) operator / early syntax error for unary negation without parens
module.exports = function() {
if (2 ** 3 !== 8) { return false; }
         try {
         Function("-5 ** 2")();
         } catch(e) {
         return true;
         }
         
};