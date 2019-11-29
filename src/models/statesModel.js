module.exports = (sequelize, DataTypes) => {
    const States = sequelize.define('States', {
      name: DataTypes.STRING
    });

    /*
    States.associates = (models) =>{
      this.belongTo(models.Occurrences)
      this.hasMany(models.Occurrences)
    }
    */
  
    return States;
  }