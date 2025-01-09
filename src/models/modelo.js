import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Modelo = sequelize.define('modelo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'nombre_tabla'
});

export default Modelo;