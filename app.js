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
    //conditional statements to access postition questions after general questions
    if (role === "Manager") {
        //office number question for manager
        const officeNbr = await inquirer.prompt(mgrQuestions);
        const officeNumber = officeNbr.office 
        const employee = new Manager(name, id, email, officeNumber);
        array.push(employee);
    
    } else if (role === "Engineer") {
       // github username question for engineer
        const git = await inquirer.prompt(egrQuestions);
        const github = git.gitHub
        const employee = new Engineer(name, id, email, github);
        array.push(employee);
    
    } else if (role === "Intern") {
       //school name question for intern
        const schoolName = await inquirer.prompt(itnQuestions);
        const school = schoolName.education
        const employee = new Intern(name, id, email, school);
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
        
        const renderInfo = render(array);
        fs.writeFile(outputPath, renderInfo, function(err){
            if(err) {
                throw err;
            }
        });
        
    }
}
// Calls the ask() function and initiates inquire.prompt 
ask();

; //Why does it create an error? 

//Do I need to create a new html or is the main.html the team.html they are asking for?

//Does the html.render.js dynamically add the info to the respective html pages or do I have to do it manually? 

// fs.readFile("./team.html", ...array, function(err) {
//     if (err){
//         throw err;
//     }else{ 
//         console.log("success!");
//     }
// })
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
