// dependencies and imports
const bcrypt = require('bcryptjs'); // for encryption

// module.exports is a function that takes in parameter 'db' and returns an object with functions as properties
module.exports = db => {
  // instantiates object to be returned
  const authFunct = {
    // registers new users in local strategy
    localRegNewUser: userData => {
      // returns new Promise for thenability
      return new Promise ((resolve, reject) => {
        // first searches to see if email exists in database
        db.TestTable.findOne({where: {email: userData.email}}).then(result => {
          if (result != null) {
            console.log("USER ALREADY EXISTS:", userData.email);
            return resolve(false);
          }
          // instantiates locally scoped constables, encrypts password argument
          const hash = bcrypt.hashSync(userData.password, 8);
          const user = {
            email: userData.email,
            password: hash,
            first_name: userData.first_name,
            last_name: userData.last_name,
            company_name: userData.company_name,
            phone_number: userData. phone_number
          };
          console.log("CREATING USER:", user.email);
          // inserts new user into database
          db.TestTable.create(user).then(() => {
            return resolve(user);
          });
        }).catch(err => {
          return reject("SERVER ERROR");
        });
      }); // end of returned promise
    }, // end of authFunct.localRegNewUser
    // local strategy authentication - checks if user exists in database and if password matches
    localAuth: (email, password) => {
      return new Promise ((resolve, reject) => {
        // checks database for user by email
        db.TestTable.findOne({where: {'email' : email}}).then(result => {
          if (result == null) {
            console.log("USER NOT FOUND:", email);
            return resolve(false);
          }
          console.log("FOUND USER: " + result.email);
          // saves encrypted password as locally scoped variable
          const hash = result.password;
          // uses bcrypt to see if password matches hash. if so, promise resolves with result sent back.
          if (bcrypt.compareSync(password, hash)) {
            return resolve(result);
          }
          console.log("PASSWORD DOES NOT MATCH email");
          return resolve(false);
        }).catch(err => {
          return reject("SERVER ERROR");
        });
      }); // end of returned promise
    } // end of authFunct.localAuth
  }; // end of authFunct
  return authFunct;
};