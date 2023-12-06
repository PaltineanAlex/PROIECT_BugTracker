import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./bazadate.db",
    define: {
        timestamps: false
    } 
});

const Users = sequelize.define('users', {
    id: {
        type: sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4
    },
    username: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    usertype: {
        type: sequelize.STRING,
        allowNull: false
    }
});

const Bugs = sequelize.define('bugs', {
    id: {
        type: sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    status: {
        type: sequelize.STRING,
        allowNull: false
    },
    priority: {
        type: sequelize.STRING,
        allowNull: false
    },
    creationdate: {
        type: sequelize.STRING,
        allowNull: false
    }
});

Bugs.belongsTo(Users); // This adds a userID column to the Bugs table

const Projects = sequelize.define('projects', {
    id: {
        type: sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    link: {
        type: sequelize.STRING,
        allowNull: false
    }
});

Projects.belongsTo(Users); // This adds a userID column to the Bugs table
Bugs.belongsTo(Projects); // This adds a project

async function initialize(){
    await sequelize.authenticate();
    await sequelize.sync({alter: true});
}

module.exports = {initialize, Users, Bugs, Projects};