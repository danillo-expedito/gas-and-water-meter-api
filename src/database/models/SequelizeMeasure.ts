import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from '.'

class Measure extends Model<InferAttributes<Measure>, InferCreationAttributes<Measure>> {
  declare measureUuid: string;

  declare measureDatetime: Date;

  declare measureType: string;

  declare measureValue: number;

  declare hasConfirmed: boolean;

  declare imageUrl: string;

  declare customerCode: string;
}

Measure.init({
  measureUuid: {
    type: DataTypes.UUID,
    allowNull: false,   
    primaryKey: true,
  },
  measureDatetime: {
    type: DataTypes.DATE,
  },
  measureType: {
    type: DataTypes.STRING,
  },
  measureValue: {
    type: DataTypes.INTEGER,
  },
  hasConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  customerCode: {
    type: DataTypes.STRING,
  }
}, {
  sequelize: db,
  modelName: 'measure',
  timestamps: false
});

export default Measure;