const {Model,DataTypes}=require('sequelize');
const sequelize=require('../config/connection');
const Department=require('./department')
class Role extends Model{};
Role.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    job_title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    salary:{
        type:DataTypes.INTEGER,

    },
    dep_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'department',
            key:'id'
        }

    }},{
        sequelize,
        timestamps:false,
        freezeTableName:true,
        modelName:'role'
    })
    module.exports=Role;