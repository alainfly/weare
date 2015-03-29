module.exports = {
  "inputs": {
    "passwordAttempt": {
      "example": "l0lcatzz",
      "friendlyName": "Password attempt",
      "description": "The password attempt (unencrypted).",
      "required": true,
      "protect": true,
      "type": "string",
      "name": "passwordAttempt"
    },
    "encryptedPassword": {
      "example": "as34hafsu#w34ndcarok",
      "friendlyName": "Encrypted password",
      "description": "The existing (already-encrypted) password hash to compare against.",
      "required": true,
      "protect": true,
      "type": "string",
      "name": "encryptedPassword"
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "incorrect": {
      "void": true,
      "description": "Password attempt does not match already-encrypted version",
      "name": "incorrect",
      "friendlyName": "incorrect"
    },
    "success": {
      "void": true,
      "description": "OK.",
      "isDefault": true,
      "name": "success",
      "friendlyName": "success"
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    require('bcrypt-nodejs').compare(inputs.passwordAttempt, inputs.encryptedPassword, function(err, ok) {
      if (err) {
        return exits.error(err);
      }
      if (!ok) {
        return exits.incorrect();
      }

      return exits.success();
    });
  },
  "identity": "check-password"
};