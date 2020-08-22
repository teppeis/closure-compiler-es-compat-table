// proposal (stage 1) / Observable / Observable.from
module.exports = () => {
  return (Observable.from([1,2,3,4]) instanceof Observable) && (Observable.from(new Set([1, 2, 3])) instanceof Observable);

};