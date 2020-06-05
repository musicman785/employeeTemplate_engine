// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
//variable that allows acces to Employee constructor function
const Employee = require("./Employee");
//Class Manager subclass constructor
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    //method to acquire role of Manager from Employee class
    getRole() {
        return "Manager";
    }
    //method to acquire office number of manager from Employee class
    getOfficeNumber() {
        return this.officeNumber;
    }
};
//exports info from this sub class
module.exports = Manager;