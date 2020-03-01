// proposal (stage 1) / Math.seededPRNG
module.exports = () => {
  var gen1 = Math.seededPRNG({ seed: 42 });
  var gen2 = Math.seededPRNG({ seed: 42 });
  if (!gen1.next || !gen1[Symbol.iterator]) return false;
  var first = gen1.next().value;
  if (first < 0 || first > 1) return false;
  if (first !== gen2.next().value) return false;
  var second = gen1.next().value;
  if (first === second) return false;
  return second === gen2.next().value;

};