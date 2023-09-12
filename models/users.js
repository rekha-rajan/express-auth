module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );
    return Users;
};
