const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
      name: DataTypes.STRING,
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      hooks : {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync()
          user.set('password', bcrypt.hashSync(user.password, salt))
        }
      }
    });
  return Users
}
