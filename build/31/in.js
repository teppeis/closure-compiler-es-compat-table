// Reflect.Loader
module.exports = function () {
    var i, names =
      ["define", "delete", "entries", "get", "global", "has", "import",
      "keys", "load", "module", "newModule", "realm", "set", "values",
      "normalize", "locate", "fetch", "translate", "instantiate"];

    if (typeof Reflect !== "object" || typeof Reflect.Loader !== "function"
        || typeof Reflect.Loader.prototype !== "object") {
      return false;
    }
    for (i = 0; i < names.length; i++) {
      if (!(names[i] in Reflect.Loader.prototype)) {
        return false;
      }
    }
    return true;
  }