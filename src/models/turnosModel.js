import { Model, DataTypes } from "sequelize";

class Turnos extends Model {
    static init(sequelize) {
        return super.init(
            {
                idturnos: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                fecha: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                estado: {
                    type: DataTypes.STRING(45),
                    allowNull: false, // Ejemplo: "pendiente", "completado", "cancelado"
                },
                user_id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                servicios_idservicios: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Turnos",
                tableName: "turnos", // Nombre exacto de la tabla en la BD
                timestamps: false, // Si no usas createdAt y updatedAt automáticos
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: "user_id",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
        });
        this.belongsTo(models.Servicios, {
            foreignKey: "servicios_idservicios",
        });
    }
}

export default Turnos;