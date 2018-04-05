// proposal (stage 1) / the pipeline operator
module.exports = function() {
  function doubleSay(str) {
    return str + ", " + str;
  }
  function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  var result = "hello" |> doubleSay |> capitalize |> (_ => _ + "!");

  return result === "Hello, hello!";
};
