// misc / own property order / JSON.parse
module.exports = () => {
  var result = '';
  JSON.parse(
    '{"0":true,"1":true,"2":true,"3":true,"4":true,"9":true," ":true,"D":true,"B":true,"-1":true,"E":true,"F":true,"G":true,"H":true,"I":true,"J":true,"K":true,"L":true,"A":true,"C":true}',
    function reviver(k,v) {
      result += k;
      return v;
    }
  );
  return result === "012349 DB-1EFGHIJKLAC";

};