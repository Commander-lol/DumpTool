class IterableObject {
  constructor(src = {}) {
    this.set(src);
    this[Symbol.iterator] = function* () {
      for (let key of Object.keys(this)) {
        yield [key, this[key]];
      }
    }
  }

  set(obj) {
    for (let key of Object.keys(obj)) {
      this[key] = obj[key];
    }
  }
}

module.exports = IterableObject;
