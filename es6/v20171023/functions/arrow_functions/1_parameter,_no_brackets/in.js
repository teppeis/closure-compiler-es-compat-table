// functions / arrow functions / 1 parameter, no brackets
module.exports = () => {
  var b = x => x + "foo";
  return (b("fee fie foe ") === "fee fie foe foo");

};