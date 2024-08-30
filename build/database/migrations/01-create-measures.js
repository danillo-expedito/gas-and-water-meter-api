"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('measures', {
            measureUuid: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            measureDatetime: {
                type: sequelize_1.DataTypes.DATE
            },
            measureType: {
                type: sequelize_1.DataTypes.STRING
            },
            measureValue: {
                type: sequelize_1.DataTypes.INTEGER
            },
            hasConfirmed: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            imageUrl: {
                type: sequelize_1.DataTypes.STRING
            },
            customerCode: {
                type: sequelize_1.DataTypes.STRING
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('measures');
    }
};
