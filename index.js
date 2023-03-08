const fs = require('fs')
const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generatehtml = require('./src/generateHTML');
const Manager = require('./lib/Manager');


const team = [];


function writeToFile(fileContent) {

    fs.writeFile('./dist/index.html', fileContent, err => {
        if (err) {
            throw (err);
            return;
        }
        else {
            console.log("index.html Created Successfully!");
        }
    })
}


const promptEngineer = () => {
    return inquirer
        .prompt([
            {
                type: 'text',
                name: 'engName',
                message: "Enter The Engineer's Name :",
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log("Please Enter The Engineer's Name :");
                        return false;
                    }
                }
            },
            {
                type: 'text',
                name: 'engId',
                message: "Enter the Engineer's Employee-ID :",
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log("Please Enter the $engineer's Employee-ID:");
                        return false;
                    }
                }

            },
            {
                type: 'text',
                name: 'engEmail',
                message: "Enter The Engineer's Email Address :",
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log('Please Enter Your E-mail Address!');
                        return false;
                    }
                },
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return "Please Enter A Valid Email Address.";
                }
            },
            {
                type: 'input',
                name: 'engGithub',
                message: "Enter The Github Name",
                validate: githubname => {
                    if (githubname) {
                        return true;
                    } else {
                        console.log('Please Enter A Github Name!');
                        return false;
                    }
                }
            }
        ])
        .then(response => {
            return response;
        });

};


const promptIntern = () => {
    return inquirer
        .prompt([
            {
                type: 'text',
                name: 'intName',
                message: "Enter The Intern's Name :",
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log("Please Enter The Intern's Name :");
                        return false;
                    }
                }
            },
            {
                type: 'text',
                name: 'intId',
                message: "Enter The Intern's Employee-ID :",
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log("Please Enter The Intern's Employee-ID:");
                        return false;
                    }
                }

            },
            {
                type: 'text',
                name: 'intEmail',
                message: "Enter The Intern's Email Address :",
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log("Please Enter The Intern's E-mail Address");
                        return false;
                    }
                },
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return "Please Enter A Valid Email Address.";
                }
            },
            {
                type: 'input',
                name: 'intSchool',
                message: "Enter The School Name",
                validate: schoolname => {
                    if (schoolname) {
                        return true;
                    } else {
                        console.log('Please Enter A School Name');
                        return false;
                    }
                }
            }
        ])
        .then(response => {
            return response;
        });

};


function AddTeamMembers() {
    inquirer
        .prompt(
            {
                type: "list",
                name: "employeeType",
                message: "Please Choose An Option Below To Add Team Members ",
                choices: ["Engineer", "Intern", "I Do Not Want To Add Anymore Members."]
            }
        )
        .then(({ employeeType }) => {
            if (employeeType === 'Engineer') {

                console.log(`
      =================
      Add an Engineer 
      =================
      `);

                promptEngineer()
                    .then(response => {

                        const engineer = new Engineer(response.engName, response.engId, response.engEmail, response.engGithub);
                        team.push(engineer);
                        AddTeamMembers();
                    });

            }
            else if (employeeType === 'Intern') {

                console.log(`
      =================
      Add an Intern
      =================
      `);

                promptIntern()
                    .then(response => {

                        const intern = new Intern(response.intName, response.intId, response.intEmail, response.intSchool);
                        team.push(intern);
                        AddTeamMembers();
                    });
            }
            else {
                console.log(`
      =================
      Generate HTML
      =================
      `);
                console.log("Array Of Employee Objects Created!")

                const filedata = generatehtml(team);


                writeToFile(filedata);
            }

        })
}

function AddManager() {
    inquirer
        .prompt([
            {
                type: 'text',
                name: 'managerName',
                message: 'Welcome To Team Profile Generator! Enter The Team Manager Name :',
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log("Please Enter The Team Manager's Name :");
                        return false;
                    }
                }
            },
            {
                type: 'text',
                name: 'managerId',
                message: "Enter The Team Manager's Employee-ID :",
                validate: userInput => {
                    if (userInput) {
                        return true;
                    } else {
                        console.log("Please Enter The Team Manager's Employee-ID:");
                        return false;
                    }
                }

            },
            {
                type: 'text',
                name: 'managerEmail',
                message: "Enter The Team Manager's Email Address :",
                validate: emailInput => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log('Please Enter Your E-mail Address!');
                        return false;
                    }
                },
                validate: answer => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return "Please Enter A Valid Email Address.";
                }
            },
            {
                type: 'text',
                name: 'managerNum',
                message: "Enter The Team Manager's Office Number :",
                validate: userInput => {
                    if (userInput && (parseInt(userInput)) && (userInput.length === 9)) {
                        return true;
                    } else {
                        console.log("Please Enter The Team Manager's Number- Must Be A 9 Digit Phone Number:");
                        return false;
                    }
                }

            }

        ])
        .then(({ managerName, managerId, managerEmail, managerNum }) => {

            this.manager = new Manager(managerName, managerId, managerEmail, managerNum);

            team.push(this.manager);


            AddTeamMembers();

        });
}

const buildTeam = () => {

    AddManager();
}
buildTeam();  