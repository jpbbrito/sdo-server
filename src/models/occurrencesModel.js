module.exports = (sequelize, DataTypes) => {
    const Occurrences = sequelize.define('Occurrences', {
        problem: DataTypes.TEXT,    
        note: DataTypes.TEXT,
        state: DataTypes.INTEGER,
        typeService: DataTypes.TEXT,
        createdDate: DataTypes.DATEONLY,
        closedDate: DataTypes.DATEONLY,
        user: DataTypes.TEXT
    });
    
    return Occurrences;
  }