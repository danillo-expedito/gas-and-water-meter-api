import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from '.'

class Measure extends Model<InferAttributes<Measure>, InferCreationAttributes<Measure>> {
  declare measure_uuid: string;

  declare measure_datetime: string;

  declare measure_type: string;

  declare measure_value: number;

  declare has_confirmed: boolean;

  declare image_url: string;

  declare customer_code: string;
}

Measure.init({
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
  measure_value: {
    type: DataTypes.NUMBER
  },
  has_confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  image_url: {
    type: DataTypes.STRING
  },
  customer_code: {
    type: DataTypes.STRING
  }
}, {
  sequelize: db,
  modelName: 'Measure'
});

export default Measure;