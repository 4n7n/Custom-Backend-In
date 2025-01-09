import { Model, DataTypes } from "sequelize";

class Servicios extends Model {
    static init(sequelize) {
        return super.init(
            {
                idservicios: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nombre: {
                    type: DataTypes.STRING(45),
                    allowNull: false,
                },
                descripcion: {
                    type: DataTypes.STRING(45),
                    allowNull: true,
                },
                precio: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                duracion: {
                    type: DataTypes.INTEGER,
                    allowNull: false, // Duración en minutos
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: "Servicios",
                tableName: "servicios", // Nombre exacto de la tabla en la BD
                timestamps: false, // Si no usas createdAt y updatedAt automáticos
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Turnos, {
            foreignKey: "servicios_idservicios",
        });
    }
}

export default Servicios;