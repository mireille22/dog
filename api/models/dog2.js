'use strict';
module.exports = (sequelize, DataTypes) => {
  const dog2 = sequelize.define('dog2', {
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    weight: DataTypes.STRING,
    origin: DataTypes.STRING
  }, {});
  dog2.associate = function(models) {
    // associations can be defined here
  };
  return dog2;
};