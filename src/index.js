console.log('hello index.js is loaded');

class Person {
  constructor(name) {
    this.name = name;
  }

  setName(name) {
    this.name = name;
  }
}

console.log(new Person('jack'));
