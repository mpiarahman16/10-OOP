const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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

// ask for the manager first
var teamMembers = [];
function createManager() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'managerName',
      message: 'Enter your manager\'s name: ',
      validate: function (answer) {
        if (answer.trim() === '') {
          return 'Please enter at least one character.';
        }
        return true;
      }

    },
    {
      type: 'input',
      name: 'managerEmail',
      message: 'Please enter your manager\'s email address: ',
      validate: function (answer) {
        if (answer.trim() === '') {
          return 'Please enter at least one character.';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Please enter your manager\'s id: ',
      validate: function (answer) {
        if (answer.trim() === '') {
          return 'Please enter at least one character.';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'managerOfficeNumber',
      message: 'Please enter your manager\'s office number: ',
      validate: function (answer) {
        if (answer.trim() === '') {
          return 'Please enter at least one character.';
        }
        return true;
      },
    }
  ])
    .then(function (answers) {
      var manager = new Manager(answers.managerName, answers.managerEmail, answers.managerId, answers.managerOfficeNumber);
      teamMembers.push(manager);
      createTeam();
    })
    .catch(function (error) {
      console.error(error);
    });
}
function createTeam() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'memberChoice',
      message: 'What type team member do you want to add?',
      choices: [
        'Engineer',
        'Intern',
        'Done',
      ],
    }
  ]).then(function (answers) {
    if (answers.memberChoice == 'Engineer') {
      createEngineer();
    }
    if (answers.memberChoice === 'Intern') {
      createIntern();
    }
    if (answers.memberChoice === 'Done') {
      ///write html
      buildTeam();
    }
  })
}
function createEngineer() {
  //ask for name, email, id, github
  inquirer.prompt([
    {
      type: 'input',
      name: 'engineerName',
      message: 'Please eneter the name of the engineer:',
    },
    {
      type: 'input',
      name: 'engineerEmail',
      message: 'Please enter the email of the engineer',
    },
    {
      type: 'input',
      name: 'engineerId',
      message: 'Please enter the id of the engineer: ',
    },
  ]).then(function (answers) {
    var engineer = new Engineer(answers.engineerName, answers.engineerEmail, answers.engineerId, answers.engineerGithub);
    teamMembers.push(engineer);
    createTeam()
  })
}
// ask name, email, id, school
function createIntern() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'internName',
      message: 'Please enter the name of the intern',
    },
    {
      type: 'input',
      name: 'internEmail',
      message: 'Please enter the name of the intern',
    },
    {
      type: 'input',
      name: 'internId',
      message: 'Please eneter the id of the intern',
    },
    {
      type: 'input',
      name: 'internSchool',
      message: 'Please enter the school name of the intern',
    },
  ]).then(function (answers) {
    var intern = new Intern(answers.internName, answers.internEmail, answers.internId, answers.internSchool);
    teamMembers.push(intern);
    createTeam()
  })
}
function buildTeam() {
  if (!fs.existsSync('./team.html')) {
    fs.writeFileSync('./team.html', render(teamMembers), 'utf-8');
  } else {
    console.log('Team.html already exisits!');
  }
}


createManager();
