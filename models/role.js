module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define(
        "role",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "roles",
            timestamps: false,
        }
    ); 
    return role;
};
