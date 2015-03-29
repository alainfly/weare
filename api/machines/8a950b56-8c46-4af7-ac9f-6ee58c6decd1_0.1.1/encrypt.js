module.exports = {
  "inputs": {
    "value": {
      "example": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "description": "a text or a buffer (if buffer = true) for encrypt",
      "required": true,
      "type": "string",
      "name": "value",
      "friendlyName": "value"
    },
    "secret": {
      "example": "a secure phrase or password",
      "description": "a secure phrase",
      "required": true,
      "type": "string",
      "name": "secret",
      "friendlyName": "secret"
    },
    "buffer": {
      "example": false,
      "description": "a text for encrypt",
      "required": false,
      "type": "boolean",
      "name": "buffer",
      "friendlyName": "buffer"
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "success": {
      "example": {
        "text": "cXJYIINixoiZtVE/gKhx/grE5QMWQblr17wxdlTQyR1uSEcVA/iNpOwVbiF3U+6QaUDhbRDK5VEpzS26e/+kLP+NJmcgfqsA5WRHfPQy4TfmzarIUrbL+NsPJm2Gxq+n8KtovheB6YNCqEyvTeB+fbtosSdFkNgUR+u6EFQwbrGF7200zqZx9UMd+1zcTHXxjdOo+EwZlULlpQ52KInPJlTk9FH2G2hgfqx2kotD2/sdTtcqWTZZSssWINJcVNO4cVM56XWfdcwxhQ=="
      },
      "description": "OK.",
      "isDefault": true,
      "type": "object",
      "name": "success",
      "friendlyName": "success"
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    if (inputs.buffer && require('isbuffer')(inputs.value) !== true)
      return exits.error({
        error: "It's not a valid buffer"
      });

    var algorithm = "aes-256-ctr",
      input_encoding = "utf8",
      output_encoding = "hex",
      res = null;

    var cipher = require('crypto').createCipher(algorithm, inputs.secret)
    if (inputs.buffer) {
      res = Buffer.concat([cipher.update(inputs.value), cipher.final()]);
    } else {
      res = cipher.update(inputs.value, input_encoding, output_encoding) + cipher.final(output_encoding);
    }

    // Return an a crypted string
    return exits.success({
      text: res
    });

  },
  "identity": "encrypt"
};