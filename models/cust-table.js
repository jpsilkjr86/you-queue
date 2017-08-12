// model for customer waitlist table
module.exports = function(sequelize, DataTypes) {
  const CustTable = sequelize.define("CustTable", {
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    party_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // accepts only allows letters, spaces and hyphens
        is: /^[a-z\d\-\s]+$/i,
        under140: (str) => {
          if (str.length > 140 || str.length < 1) {
            throw new Error('Must be between 1 and 140 characters!');
          }
        }
      }
    },
    party_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // only allows integers or null values
        isInt: true
      }
    },
    first_name: {
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
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        // accepts only allows letters and spaces 
        is: /^[a-zA-Z\s]*$/,
        under140: (str) => {
          if (str.length > 140) {
            throw new Error('Must be less than 140 characters!');
          }
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      //   // only allows integers or null values
      //   isInt: true
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        // only allows emails
        isEmail: true,
        under140: (str) => {
          if (str.length > 140) {
            throw new Error('Must be less than 140 characters!');
          }
        }
      }
    },
    occasion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    arrived_table: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    alerted_sms: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  return CustTable;
};