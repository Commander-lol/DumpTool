module.exports = {
  getProperty: function(object, path) {
    let
      [first, ...parts] = path.split("."),
      _innerGet = (o, p, r) => {
        console.log("Inner", o, p, r);
        if (p in o) {
          if (typeof p[o] === "object") {
            let [first, ...parts] = r;
            return _innerGet(p[o], first, parts);
          } else {
            if (r.length > 0) {
              throw new TypeError("No such property " + path);
            } else {
              return p[o];
            }
          }
        } else {
          throw new TypeError("No such property " + path);
        }
      };

    return _innerGet(object, first, parts);
  },
  hasProperty: function(object, path) {
    try {
      this.getProperty(object, path);
    } catch (e) {
      if (e.message === "No such property " + path) {
        console.log("No Such prop");
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
