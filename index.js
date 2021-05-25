const inquirer = require("inquirer");
const mysql = require("mysql");

function query(string) {
    const connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "employee_trackerdb",
      });
      
      connection.connect((err) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);
        connection.query(string, (err, res) =>{
            if (err) throw err;
            console.log(res);
        })
      });
}

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
          query("INSERT INTO department (`name`) VALUES (\""+departmentName+"\")");
        });
      }
      else if (choiceAdd == "Role") {
          let addRoleArray = [
              {
                  type: "input",
                  message: "What is the title of this role?",
                  name: "roleTitle"
              },
              {
                  type: "number",
                  message: "What is the salary for this role?",
                  name: "roleSalary"
              },
              {
                  type: "number",
                  message: "What is the department ID for this role?",
                  name: "roleID"
              }
          ]

          inquirer.prompt(addRoleArray).then(function (data) {
              let roleTitle = data.roleTitle;
              let roleSalary = data.roleSalary;
              let roleID = data.roleID;

              query("INSERT INTO role (`title`, `salary`, `department_id`) VALUES (\""+roleTitle+"\", \""+roleSalary+"\", \""+roleID+"\")");
          })
      }
      else if (choiceAdd == "Employee") {
          let addEmpArray = [
              {
                  type: "input",
                  message: "What is the employees first name?",
                  name: "empFirstName"
              },
              {
                  type: "input",
                  message: "What is the employees last name?",
                  name: "empLastName"
              },
              {
                  type: "number",
                  message: "What is the employees role ID?",
                  name: "empRoleID"
              },
              {
                  type: "number",
                  message: "What is the employees managers ID?",
                  name: "empManagerID"
              }
          ]

          inquirer.prompt(addEmpArray).then(function (data) {
              let empFirstName = data.empFirstName;
              let empLastName = data.empLastName;
              let empRoleID = data.empRoleID;
              let empManagerID = data.empManagerID;

              query("INSERT INTO employee (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES (\""+empFirstName+"\", \""+empLastName+"\", \""+empRoleID+"\", \""+empManagerID+"\")");
          })
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
