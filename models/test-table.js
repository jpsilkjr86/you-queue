// model for test table
module.exports = function(sequelize, DataTypes) {
  const TestTable = sequelize.define("TestTable", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    test_name: {
    	type: DataTypes.STRING,
    	allowNull: false,
    	validate: {
	    	under140: (str) => {
	    		if (str.length > 140 || str.length < 1) {
	    			throw new Error('Must be between 1 and 140 characters!');
	    		}
	    	}
    	}
    },
    someBool: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  return TestTable;
};