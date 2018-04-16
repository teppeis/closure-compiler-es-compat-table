// proposal (stage 1) / `.of` and `.from` on collection constructors / Set.from
module.exports = () => {
  var C = Set.from([1, 2], function (it) {
    return it + 2;
  });
  return C.has(3) + C.has(4);

};