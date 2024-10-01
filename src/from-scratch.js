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

//QUESTION 4: design challenge; be creative with this one! --> a model that handles a community of people where each instance is a person/community member
class Person {
  static community = []; //class arr
  #conditions = []; //private, instance arr

  constructor(name, age, hobbies = [], conditions) {
    this.name = Person.trimAndCapitalize(name);
    this.age = age;
    this.hobbies = Person.prepareArr(hobbies);
    this.conditions = Person.prepareArr(conditions);
    this.#conditions.push(...this.conditions);
    Person.community.push(this);
 }

  getDemographic() { //READ
    const ageRanges = [
 { group: 'Infant and Toddler', range: [0, 4] },
 { group: 'Early Childhood', range: [5, 9] },
 { group: 'Middle Childhood', range: [10, 14] },
 { group: 'Adolescence', range: [15, 19] },
 { group: 'Young Adult', range: [20, 24] },
 { group: 'Adult', range: [25, 34] },
 { group: 'Middle-aged Adult', range: [35, 44] },
 { group: 'Older Adult', range: [45, 64] },
 { group: 'Senior', range: [65, 99] },
 { group: 'Centenarian', range: [100, Infinity] }
 ];

    const ageGroup = ageRanges.find(({ range }) => this.age >= range[0] && this.age <= range[1]);
    return ageGroup ? ageGroup.group : 'Age group not found';
 }

  celebrateBirthday() { //UPDATE
    this.age++;
    return `Happy birthday, ${this.name}! You're ${this.age} now!`;
 }

  addHobby(hobbyStr) { //CREATE
    const hobby = Person.trimAndCapitalize(hobbyStr);
    if (!this.hobbies.includes(hobby)) this.hobbies.push(hobby);
    return `${hobby} has been added as a hobby.`;
 }

  listHobbies() {
    return this.hobbies.length === 0 ? 'No hobbies listed' : this.hobbies.join(', ');
 }

  listConditions() {
    return this.#conditions.length === 0 ? 'N/A' : this.#conditions.join(', ');
 }

  findHobbiesGroup() {
    return Person.getCommunity().filter((person) => person !== this && person.hobbies.some((hobby) => this.hobbies.includes(hobby))); //finding community members with similar hobbies
 }

  findSupportGroup() {
    return Person.getCommunity().filter((person) => person !== this && person.conditions.some((cond) => this.conditions.includes(cond))); //finding community members with similar conditions
 }

  getDetails() {
    return `Community member ${this.name} is ${this.age} years old, a ${this.getDemographic()}. Their hobbies include ${this.listHobbies()}. They may have the following medical conditions: ${this.listConditions()}.`;
 }

  static deleteMember(nameStr) { //DELETE
    const name = Person.trimAndCapitalize(nameStr);
    const member = Person.getCommunity().find((person) => person.name === name);
    Person.community = Person.getCommunity().filter((person) => person.name !== name); //updating community arr, filtering out named person
    return member ? `Community member ${name} has moved. They will be missed!` : `${name} has not been found as a member of this community.`;
 }

  static getCommunity() {
    return [...Person.community]; //spreading arr to avoid any chance of mutating orig arr, keeping it pure with no side effects
 }

  static trimAndCapitalize(str) { //class method helper func for cleaning input strs
    return str.trim().slice(0, 1).toUpperCase() + str.trim().slice(1); //getting rid of any whitespace surrounding str and capitalizing first letter
 }

  static prepareArr(input) { //class method helper func for cleaning input arrs
    return Array.isArray(input) ? input.map(el => Person.trimAndCapitalize(el)) : input.split(',').map(Person.trimAndCapitalize); //an alt way to map implicitly
 }
};

//testing design challenge implementation
const mary = new Person('mary', 27, 'soccer, weightlifting, yoga', 'near-sightedness');
const john = new Person('john', 34, 'running, yoga, boxing', 'asthma');
const annie = new Person('annie', 20, 'running, boxing, swimming', 'asthma, anemia');
const sam = new Person('sam', 24, 'soccer, yoga, weightlifting', 'hearing loss, near-sightedness');

console.log('sam:', sam);
console.log('demographics:', sam.getDemographic()); //Young Adult
console.log('get details:', sam.getDetails()); //Community member Sam is 24 years old, a Young Adult. Their hobbies include Soccer, Yoga, Weightlifting. They may have the following medical conditions: Hearing loss, Near-sightedness.
console.log('celebrate birthday:', sam.celebrateBirthday()); //Happy birthday Sam! You're 25 now!
console.log('add hobby:', sam.addHobby('swimming')); //Swimming has been added as a hobby.
console.log('list hobbies:', sam.listHobbies()); //Soccer, Yoga, Weightlifting
console.log('list conditions:', sam.listConditions()); //Hearing loss, Near-sightedness
console.log('find hobbies group:', sam.findHobbiesGroup()); //Mary, John, Annie
console.log('find support group:', sam.findSupportGroup()); //Mary
console.log('list community members:', Person.getCommunity()); //Mary, John, Annie, Sam
console.log('delete community members:', Person.deleteMember('mary')); //Mary, John, Annie, Sam
console.log('list community members:', Person.getCommunity()); //John, Annie, Sam

module.exports = {
  Quadrilateral,
  Rectangle,
  Square,
  Person,
};
