const Sequelize = require('sequelize')
const db = require('../db')

const Arrow = db.define('arrow', {
  material: {
    type: Sequelize.ENUM(['carbon', 'aluminum', 'wood']),
    allowNull: false
  },
  spine: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  arrowLength: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 23,
      max: 32
    }
  },
  pointWeight: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Arrow