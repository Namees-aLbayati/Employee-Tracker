const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/connection');
const Role=require('./role')
class Employee extends Model{};
Employee.init({
    id:{
       type:DataTypes.INTEGER,
       allowNull:false,
       primaryKey:true,
       autoIncrement:true
    },
    f_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    l_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    manger_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    role_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'role',
            key:'id'
        }
    }
},{
    sequelize,
    timestamps:false,
    freezeTableName:true,
    underscored:true,
    modelName:'employee'
})