const Promise = require('bluebird');
const argon2 = require('argon2');

const passwordVerifier = function (password, passwordHash) {
  return new Promise(((resolve, reject) => {
    argon2.verify(passwordHash, password).then((match) => {
      if (match) {
        // password match
        resolve(true);
      } else {
        // password did not match
        resolve(false);
      }
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  }));
};

module.exports = passwordVerifier;
