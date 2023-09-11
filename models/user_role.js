db.role.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  db.users.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  })


// module.exports = (sequelize, DataTypes, Users, Role) => {
//     const User_Role = sequelize.define("user_role", {
//       UserId: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: Users,
//           key: 'id'
//         }
//       },
//       RoleId: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: Role,
//           key: 'id'
//         }
//       }
//     },
//     {
//       tableName: "user_role",
//       timestamps: true,
//     });
//     return User_Role;
//   }
  