module.exports = {
  getProperty: function(object, path) {
    let
      [first, ...parts] = path.split("."),
      _innerGet = (o, p, r) => {
        if (o[p] != null) {
          if (typeof o[p] === "object") {
            if(r.length > 0) {
              let [first, ...parts] = r;
              return _innerGet(o[p], first, parts);
            } else {
              return o[p];
            }
          } else {
            if (r.length > 0) {
              throw new TypeError("No such property " + path);
            } else {

              return o[p];
            }
          }
        } else {
          throw new TypeError("Nein such property " + path);
        }
      };

    return _innerGet(object, first, parts);
  },
  hasProperty: function(object, path) {
    try {
      this.getProperty(object, path);
    } catch (e) {
      if (e.message === "No such property " + path) {
        return false
      } else {
        throw e;
      }
    }
    return true;
  },
  createPath: function(...parts) {

  }
};
