"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Measure extends sequelize_1.Model {
}
Measure.init({
    measureUuid: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    measureDatetime: {
        type: sequelize_1.DataTypes.DATE,
    },
    measureType: {
        type: sequelize_1.DataTypes.STRING,
    },
    measureValue: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    hasConfirmed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
    customerCode: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: _1.default,
    modelName: 'measure',
    timestamps: false
});
exports.default = Measure;
