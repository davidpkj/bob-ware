class Util {
  static objectOfArrayWithProperty(array, key, value) {
    for (let object of array) {
      if (object[key] == value) return object;
    }

    return null;
  }

  static allObjectsOfArrayWithProperty(array, key, value) {
    let result = [];

    for (let object of array) {
      if (object[key] == value) result.push(object);
    }

    return result;
  }

  static randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
  }
}

module.exports = Util;