'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tanaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tanaman.init({
    nama: DataTypes.STRING,
    kategori: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tanaman',
  });
  return Tanaman;
};