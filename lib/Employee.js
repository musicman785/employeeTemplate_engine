// TODO: Write code to define and export the Employee class
//Emplooyee class constructor from user response info
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    };
    //method acquires the name from user responses
    getName() {
        return this.name;
    }
     //method acquires the id from user responses
    getId() {
        return this.id;
    }
     //method acquires the email from user responses
    getEmail() {
        return this.email;
    }
     //method acquires the role from user responses
    getRole() {
        return "Employee";
    }
};

module.exports = Employee;