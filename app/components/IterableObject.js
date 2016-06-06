class IterableObject {
  constructor(src = {}) {
    this.set(src);
    this[Symbol.iterator] = function* () {
      for (let key of Object.keys(this)) {
        yield [this[key], key];
      }
    }
  }

  set(obj) {
    for (let key of Object.keys(obj)) {
      this[key] = obj[key];
    }
  }

  empty() {
    return Object.keys(this).length === 0;
  }
}

module.exports = IterableObject;
