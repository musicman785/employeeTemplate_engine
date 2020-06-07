//All require variables for assignment
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Variable to access the render function
const render = require("./lib/htmlRenderer");

//General questions for recording new Employees
const questions = [
    {
        type: "input",
        message: "What is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "what is your id number?",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter email.",
        name: "email"
    },
    {
        type: "list",
        message: "What is your role?",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    }
];
//variable to hold Question asked if employee is a manager
const mgrQuestions = {
    type: "input",
    message: "What is your manager’s office number?",
    name: "office"
};
//variable to hold Question asked if employee is an engineer
const egrQuestions = {
    type: "input",
    message: "What is your engineer’s github user name?",
    name: "gitHub"
};
//variable to hold Question asked if employee is an intern
const itnQuestions = {
    type: "input",
    message: "What is your school name?",
    name: "education"
};
//variable that holds Question asked if more employees need to be added
const reStart = {
    type: "list",
    message: "Would you like to add another team member?",
    choices: ["yes", "no"],
    name: "restart"
};
//Variable with array that holds all user responses
let array = [];
//asynchronus function to initiate user question propmts
async function ask() {
    //variable that initiates general info questions
    const userResponse = await inquirer.prompt(questions);
    //Deconstructor variable to create variables for user response object
    const { name, id, email, role } = userResponse;
    //conditional statements to access Employee role questions after general questions
    if (role === "Manager") {
        //office number question for manager
        const officeNbr = await inquirer.prompt(mgrQuestions);
        //variable holds nested object input from the manager question object
        const officeNumber = officeNbr.office
        //variable holds new Manager contructor
        const employee = new Manager(name, id, email, officeNumber);
        //Pushes new Employee with Manager role to array
        array.push(employee);
    
    } else if (role === "Engineer") {
       // github username question for engineer
        const git = await inquirer.prompt(egrQuestions);
        //variable holds nested object input from the Engineer question object
        const github = git.gitHub
        //variable holds new Engineer contructor
        const employee = new Engineer(name, id, email, github);
        //Pushes new Employee with Engineer role to array
        array.push(employee);
    
    } else if (role === "Intern") {
       //school name question for intern
        const schoolName = await inquirer.prompt(itnQuestions);
        //variable holds nested object input from the Intern question object
        const school = schoolName.education
        //variable holds new Intern contructor
        const employee = new Intern(name, id, email, school);
        //Pushes new Employee with Intern role to array
        array.push(employee);
    };
    //variable restarts questions if user needs to input more employees
    const restartAns = await inquirer.prompt(reStart);
    //variable holds the answer for restart question
    const { restart } = restartAns;
    //conditional statement that executes restart of questions if yes
    if (restart === "yes") {
        ask();

    } else {
        //variable holds block of html generated 
        const renderInfo = render(array);
        //Writes team.html file to the outputPath directory using rendered info
        fs.writeFile(outputPath, renderInfo, function(err){
            if(err) {
                throw err;
            }
        });
        
    }
}
// Calls the ask() function and initiates inquire.prompt 
ask();

