import { Model, DataTypes } from "sequelize";

class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                    unique: true,
                },
                username: {
                    type: DataTypes.STRING(40),
                    allowNull: false,
                    unique: true,
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                create_time: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    get() {
                        const rawValue = this.getDataValue("create_time");
                        if (!rawValue) return null;

                        // Formatea la fecha en "YYYY-MM-DDTHH:MM"
                        const fecha = new Date(rawValue);
                        return fecha.toISOString().slice(0, 16);
                    },
                },
                rol: {
                    type: DataTypes.ENUM("client", "admin"),
                    allowNull: true,
                },
                active: {
                    type: DataTypes.TINYINT,
                    allowNull: false,
                    defaultValue: 1,
                },
            },
            {
                sequelize,
                modelName: "User",
                tableName: "user", // Nombre exacto de la tabla en la BD
                timestamps: false, // Si no usas createdAt y updatedAt automÃ¡ticos
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Turnos, {
            foreignKey: "user_id",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
        });
    }
}

export default User;