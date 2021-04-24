export class Util {
  static objectOfArrayWithProperty(array: Array<any>, key: any, value: any): any {
    for (let object of array) {
      if (object[key] == value) return object;
    }

    return null;
  }

  static allObjectsOfArrayWithProperty(array: Array<any>, key: any, value: any): Array<any> {
    let result: Array<any> = [];

    for (let object of array) {
      if (object[key] == value) result.push(object);
    }

    return result;
  }

  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) ) + min
  }
}