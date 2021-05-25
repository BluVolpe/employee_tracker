const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "FordFusion2011@!",
  database: "employee_trackerdb",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
});

const questions = [
  {
    type: "list",
    message: "Do you want to...",
    name: "choice",
    choices: ["Add", "View", "Update"],
  },
];

// TODO: Create a function to initialize app
inquirer.prompt(questions).then(function (data) {
  let choice = data.choice;
  if (choice == "Add") {
    let addQuestion = {
      type: "list",
      message: "Which do you want to add?",
      name: "add",
      choices: ["Department", "Role", "Employee"],
    };

    inquirer.prompt(addQuestion).then(function (data) {
      let choiceAdd = data.add;
      console.log(choiceAdd);
      if (choiceAdd == "Department") {
        let addQuestion2 = {
          type: "input",
          message: "What is the name of the department?",
          name: "addDepartment",
        };
        inquirer.prompt(addQuestion2).then(function (data) {
          let departmentName = data.addDepartment;
          console.log(departmentName);
        });
      }
    });
  } else if (choice == "View") {
    let addQuestion = {
      type: "list",
      message: "Which do you want to view?",
      name: "view",
      choices: ["Department", "Role", "Employee"],
    };
  } else {
    let addQuestion = {
      type: "list",
      message: "Which do you want to edit?",
      name: "edit",
      choices: ["Department", "Role", "Employee"],
    };
  }
});
