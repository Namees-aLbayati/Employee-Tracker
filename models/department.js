const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/connection');
class Department extends Model{}
Department.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    dep_name:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'services'
    }},
    {
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:true,
        modelName:'department'
    });
    module.exports=Department;
