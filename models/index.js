const Employee=require('./employee');
const Role=require('./role');
const Department=require('./department');

Role.belongsTo(Department,{foreignKey:'dep_id'});
Employee.belongsTo(Role,{foreignKey:'role_id'});
module.exports={Employee,Role,Department};