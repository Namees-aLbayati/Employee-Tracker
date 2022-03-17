const mysql = require('mysql2')
const inquirer = require('inquirer');
require("dotenv").config();
const DepArr = [];
const roleArr = [];
const ManagerArr = [];


const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log("Connected to DB successfully")
);

const UserChoices = () => {


  inquirer
    .prompt(
      {
        type: 'rawlist',
        message: 'which information you want to display?',
        name: 'UserInput1',
        choices: [
          'Display all the Employee information?',
          'Display Departments sections?',
          'Display Role Information?',
          'Add Employee',
          'Add Role',
          'Add Department',

          'update Employee Role Information',
          'Delete existing employee',
          'EXIT'


        ]
      },

    )
    .then((answer) => {
      switch (answer.UserInput1) {
        case ('Display Departments sections?'):
          selectDepartment();
          break;

        case ('Display all the Employee information?'):
          selectEmployee();
          break;

        case ('Display Role Information?'):
          selectRole();
          break;

        case ('Add Department'):
          AddDep();
          break;

        case ('Add Role'):
          AddRole();
          break;

        case ('Add Employee'):
          AddEmployee();
          break;

        case ('EXIT'):
          EXIT();
          break;




      }




    })
}
UserChoices();

const selectDepartment = () => {
  const selectD = 'select dep_name as departments from Department';
  db.query(selectD, (err, result) => {
    if (err) {
      console.log(err);

    } else {
      console.table(result);
      UserChoices()
    }

  })
};
//FK i should make a connection between two tables which means we should find equal data(connection data between these two column)
//becuase i have forginer key which is make as a realationship between employee table and role table so i can access the second table (role)using join ,and at the same time i can access the third table Department using realation ship between role and department through FK
//when i need to access the second table column i need to use join + second table's name + on+the fk at the first table will equal the second table.id



//here ther is very important hint which is using manager id as a FK to the same table here what should we do??
//we need to use the realationship as a between two table using join BUT we will give the joining table different name as a Employee e 
// here its look like we will have two results:the first result comes from Employee table and the second one will get from employee e 
const selectEmployee = () => {
  const selectE = 'select Employee.f_name,Employee.l_name,Department.dep_name as department,Role.title as job_position,Role.salary,concat(e.f_name," ",e.l_name) as Mangername from Employee left join Role on Employee.role_id=Role.id left join Department on Role.dep_id=Department.id left join Employee e on Employee.manager_id=e.id;';
  db.query(selectE, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.table(result);
      UserChoices()
    }
  })
}
//at this function below i has a realationship between Role and department table,iwill get the second table column using left join


const selectRole = () => {
  const selectR = 'select title,Department.dep_name as department,salary from Role left join Department on Role.dep_id=Department.id;'
  db.query(selectR, (err, result) => {
    console.table(result);
    UserChoices()
  })
}

//here we didnt use any FK so we insert values to department table easly :)
const AddDep = () => {
  inquirer.prompt({
    type: 'input',
    message: 'Enter Department Name?',
    name: 'depname'
  }).then((result) => {
    console.log(result)
    const insertD = `insert into Department (dep_name) values(?);`;
    db.query(insertD, result.depname, (err, newresult) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`${result.depname} added successfully to your Departments DB`)
        UserChoices();

      }
    })
  })
}

//to add new role i should add values to title,salary,dep_id(FK) becuase it is FK so i need to use data which is have realation ship with department table
//so i get the departments name as a chices to user.prompt and when i get the result i will using select the ID for dep_id 
const AddRole = () => {
  const getDepName = 'select dep_name from Department;';
  db.query(getDepName, (err, result) => {

    if (err) {
      console.log(err)
    }
    for (var i = 0; i < result.length; i++) {
      DepArr.push(result[i].dep_name);

    }



  })



  inquirer.prompt([
    {
      message: 'Enter Role title you want to add?',
      type: 'input',
      name: 'Rtitle'
    },
    {
      message: 'how much the salary for this title?',
      type: 'input',
      name: 'Rsalary'

    },
    {
      message: 'which Department this title belongs to?',
      name: 'depname',
      type: 'list',
      choices: DepArr

    }
  ]).then((result) => {
    const getId = `select id from Department where dep_name=?`;
    db.query(getId, result.depname, (err, resultdata) => {
      if (err) {
        console.log(err)
      }
      const getIdUsingDepname = resultdata[0].id;
      const finalAddtoRole = `insert into Role (title,salary,dep_id) values
    (?,?,?);`;
      db.query(finalAddtoRole, [result.Rtitle, result.Rsalary, getIdUsingDepname], (err, data) => {

        if (err) {
          console.log(err)
        }
        console.log(`Data Added successfully to Role DB:\n
    title:${result.Rtitle}\n
    salary:${result.Rsalary}\n
    belongs to this section:${result.depname} which has id:${getIdUsingDepname}`);

        UserChoices()

      })

    })
  });

}
//here i need to use values to f_name,l_name,manager_id,role_id(FK)

const AddEmployee = () => {
  const getRoleTitle = `select title from Role`;
  db.query(getRoleTitle, (err, result) => {
    if (err) {
      console.log(err)
    }
    for (var i = 0; i < result.length; i++) {
      // console.log(result[i].title)
      roleArr.push(result[i].title)

    }
  })
  const managerName = `select concat (manager.f_name," ",manager.l_name) as manager from Employee left join Employee manager on Employee.manager_id=manager.id; `;
db.query(managerName,(err,managerResult)=>{
  if(err){
    console.log(err)
  }
  for(var i=0;i< managerResult.length;i++){
    ManagerArr.push(managerResult[i].manager);
    console.log(ManagerArr)
  }
})






  inquirer.prompt([{
    message: 'Enter Employee first name?',
    name: 'f_name',
    type: 'input'
  }, {
    message: 'Enter Employee last name?',
    name: 'l_name',
    type: 'input'
  }, {
    message: 'Enter Employee position?',
    name: 'title',
    type: 'list',
    choices: roleArr
  }, {
    message: 'Enter Employees manger?',
    name: 'manager',
    type: 'list',
    choices: ManagerArr
  }
  ]).then((result) => {

    const getRoleId = `select id from Role where title=(?);`
    db.query(getRoleId, result.title, (err, result) => {
      if (err) {
        console.log(err)
      }
      const roleid = result[0].id;
      const addEmployee = `insert into Employee f_name,l_name,role_id,manager_id values(?,?,?,?);`
      db.query(addEmployee, [result.f_name, result.l_name, roleid], (err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(`Congrats!!! your new Employee has been added successfullt \n`);


      })


    })





  })








}







const EXIT = () => {
  console.log('See you Again!!');
  process.exit()

}




