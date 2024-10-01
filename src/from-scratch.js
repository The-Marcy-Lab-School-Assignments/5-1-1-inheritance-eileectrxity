//Lesson 5.1.1 Assignment: Inheritance by Eileen

//QUESTION 1: create a Quadrilateral class, checking the tests for specs
class Quadrilateral {
  constructor(side1, side2, side3, side4) {
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
    this.side4 = side4;
 }

  getPerimeter() {
    return this.side1 + this.side2 + this.side3 + this.side4;
 }
};

class Rectangle {

}

class Square {

}

/* Be creative with this one! */
class Person {

}

module.exports = {
  Quadrilateral,
  Rectangle,
  Square,
  Person,
};
