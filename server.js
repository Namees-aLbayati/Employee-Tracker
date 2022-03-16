const mysql = require('mysql2')
const inquirer = require('inquirer');
require("dotenv").config();
const DepArr=[];


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

          case('Display all the Employee information?'):
          selectEmployee();
          break;

          case ('Display Role Information?'):
            selectRole();
            break;

            case('Add Department'):
            AddDep();
            break;

            case('Add Role'):
            AddRole();
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

const selectEmployee = () => {
  const selectE = 'select f_name,l_name,Department.dep_name as department,Role.title as job_position,Role.salary from Employee left join Role on Employee.role_id=Role.id left join Department on Role.dep_id=Department.id';
  db.query(selectE, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.table(result);
      UserChoices()
    }
  })
}


const selectRole=()=>{
  const selectR='select title,Department.dep_name as department,salary from Role left join Department on Role.dep_id=Department.id;'
db.query(selectR,(err,result)=>{
  console.table(result);
  UserChoices()
})
}

const AddDep=()=>{
  inquirer.prompt({
    type: 'input',
    message: 'Enter Department Name?',
    name: 'depname'}).then((result)=>{
      console.log(result)
      const insertD=`insert into Department (dep_name) values(?);`;
db.query(insertD,result.depname,(err,newresult)=>{
if(err){
  console.log(err)
}else{
  console.log(`${result.depname} added successfully to your Departments DB`)
UserChoices();

}})})}


const AddRole=()=>{
  const getDepName='select dep_name from Department;';
  db.query(getDepName,(err,result)=>{

    if(err){
      console.log(err)
    }
    for(var i=0;i<result.length;i++){
          DepArr.push(result[i].dep_name);

    }

    

  })



  inquirer.prompt([
    { message:'Enter Role title you want add?',
   type:'input',
   name:'Rtitle'},
   {
     message:'how much the salary for this title?',
     type:'input',
     name:'Rsalary'

   },
   {
     message:'which Department this title belongs to?',
     name:'depname',
     type:'list',
     choices:DepArr

   }
  ]).then((result)=>{
    const getId=`select id from Department where dep_name=?`;
    db.query(getId,result.depname,(err,resultdata)=>{
      if(err){
        console.log(err)
      }
    const getIdUsingDepname=resultdata[0].id;
    const finalAddtoRole=`insert into Role (title,salary,dep_id) values
    (?,?,?);`;
    db.query(finalAddtoRole,[result.Rtitle,result.Rsalary,getIdUsingDepname],(err,data)=>{

    if(err){
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




