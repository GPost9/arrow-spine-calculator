const Sequelize = require('sequelize')
const db = require('../db')

const Bow = db.define('bow', {
  centershot: {
    type: Sequelize.ENUM(['on-center', 'past-center']),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  drawWeight: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 30,
      max: 75
    },
    drawLength: {
      type: Sequelize.INTEGER,
      defaultValue: 28,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 23,
        max: 32
      }
    }
  }
})

module.exports = Bow