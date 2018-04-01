module.exports = function() {
  var a = {2:!0, 0:!0, 1:!0, " ":!0, 9:!0, D:!0, B:!0, "-1":!0, A:!0, 3:!0};
  "EFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function(b) {
    a[b] = !0;
  });
  Object.defineProperty(a, "C", {value:!0, enumerable:!0});
  Object.defineProperty(a, "4", {value:!0, enumerable:!0});
  delete a[2];
  a[2] = !0;
  return '{"0":true,"1":true,"2":true,"3":true,"4":true,"9":true," ":true,"D":true,"B":true,"-1":true,"A":true,"E":true,"F":true,"G":true,"H":true,"I":true,"J":true,"K":true,"L":true,"M":true,"N":true,"O":true,"P":true,"Q":true,"R":true,"S":true,"T":true,"U":true,"V":true,"W":true,"X":true,"Y":true,"Z":true,"C":true}' === JSON.stringify(a);
};

