const Sequelize = require('sequelize')

const sequelize = new Sequelize("postgres://postgres:e327e42539694610bb364eef3fa2c3d6@localhost:5432/workout-log")

module.exports = sequelize