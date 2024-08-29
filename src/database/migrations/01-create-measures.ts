import { Model, DataTypes, QueryInterface } from 'sequelize';
import IMeasure from '../../interfaces/Measure/IMeasure';

export default {
    up(queryInterface: QueryInterface): Promise<void> {
        return queryInterface.createTable<Model<IMeasure>>('measures', {
            measure_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            measure_datetime: {
                type: DataTypes.DATE
            },
            measure_type: {
                type: DataTypes.STRING
            },
            has_confirmed: {
                type: DataTypes.BOOLEAN
            },
            image_url: {
                type: DataTypes.STRING
            }
        });
    },
    down(queryInterface: QueryInterface): Promise<void> {
        return queryInterface.dropTable('measures');
    }
}