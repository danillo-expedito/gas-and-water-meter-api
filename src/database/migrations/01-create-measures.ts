import { Model, DataTypes, QueryInterface } from 'sequelize';
import IMeasure from '../../interfaces/Measure/IMeasure';

export default {
    up(queryInterface: QueryInterface): Promise<void> {
        return queryInterface.createTable<Model<IMeasure>>('measures', {
            measureUuid: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            measureDatetime: {
                type: DataTypes.DATE
            },
            measureType: {
                type: DataTypes.STRING
            },
            measureValue: {
                type: DataTypes.INTEGER
            },
            hasConfirmed: {
                type: DataTypes.BOOLEAN
            },
            imageUrl: {
                type: DataTypes.STRING
            },
            customerCode: {
                type: DataTypes.STRING
            },
        });
    },
    down(queryInterface: QueryInterface): Promise<void> {
        return queryInterface.dropTable('measures');
    }
}