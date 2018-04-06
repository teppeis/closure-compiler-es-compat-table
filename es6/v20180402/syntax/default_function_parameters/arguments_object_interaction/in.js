// syntax / default function parameters / arguments object interaction
module.exports = function() {
  return (function (a = "baz", b = "qux", c = "quux") {
    a = "corge";
    // The arguments object is not mapped to the
    // parameters, even outside of strict mode.
    return arguments.length === 2
&& arguments[0] === "foo"
&& arguments[1] === "bar";
  }("foo", "bar"));

};