'use strict';

module.exports = function(sequelize, DataTypes) {
    var table1 = sequelize.define("table1", {
        col1: DataTypes.INTEGER,
        col2: DataTypes.INTEGER
    });

    return table1;
};