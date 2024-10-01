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

//QUESTION 2: create a Rectangle class that inherits from the Quadrilateral class- check how its args differ and how the child class should deal with the parent class
class Rectangle extends Quadrilateral { //when the `extends` keyword is used, JS begins the process a child subclass inherits all properties and methods from the parent class
  constructor(side1, side2) {
    super(side1, side2, side1, side2); //notice how we can override the constructor params 
 }

  // getPerimeter() { //not necessary to redefine method as getPerimeter() is already inherited in the prototype chain
  //   return super.getPerimeter(); //reason it's not necessary is that it's best practice to only define an inherited method in a child class if we intend to override it to add addt'l behavior
  // }

  getArea() {
    return this.side1 * this.side2;
 }
};



//QUESTION 3: create a Square class that inherits from...someone- check tests to see who the direct parent is, and what args Square takes on each instance
class Square extends Rectangle {
  constructor(side1) {
    super(side1, side1, side1, side1);
 }

  getDiagonal() {
    return Math.sqrt(this.getArea() * 2); //more correct to invoke getArea through this.getArea() rather than super.getArea() as it makes it more clear that an instance of child class Square is invoking the inherited method
 }
};

/* Be creative with this one! */
class Person {

}

module.exports = {
  Quadrilateral,
  Rectangle,
  Square,
  Person,
};
