// model for customer waitlist table
module.exports = function(sequelize, DataTypes) {
  const UserTable = sequelize.define("UserTable", {
    rest_name: {
    	type: DataTypes.STRING,
    	allowNull: false,
    	validate: {
        // accepts only allows letters and spaces 
        is: /^[a-zA-Z\s]*$/,
	    	under140: (str) => {
	    		if (str.length > 140 || str.length < 1) {
	    			throw new Error('Must be between 1 and 140 characters!');
	    		}
	    	}
    	}
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // only allows integers or null values
        isInt: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // only allows emails
        isEmail: true,
        under140: (str) => {
          if (str.length > 140 || str.length < 1) {
            throw new Error('Must be between 1 and 140 characters!');
          }
        }
      }
    }
  });
  return UserTable;
};