'use strict';
module.exports = (sequelize, DataTypes) => {
  const restaurant = sequelize.define('restaurant', {
    name: DataTypes.STRING
  }, {});
  restaurant.associate = function(models) {
    // associations can be defined here
  };
  return restaurant;
};