module.exports = {
  "inputs": {
    "stream": {
      "example": "a stream",
      "description": "a stream",
      "required": true,
      "type": "string",
      "name": "stream",
      "friendlyName": "stream"
    },
    "secret": {
      "example": "a secure phrase or password",
      "description": "a secure phrase",
      "required": true,
      "type": "string",
      "name": "secret",
      "friendlyName": "secret"
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "errorNotStream": {
      "description": "It's not a valid stream",
      "name": "errorNotStream",
      "friendlyName": "errorNotStream"
    },
    "errorUnzip": {
      "description": "Can not a unzip the stream",
      "name": "errorUnzip",
      "friendlyName": "errorUnzip"
    },
    "success": {
      "example": {
        "stream": "a stream"
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
    var helper = require("../lib/helper.js");

    if (helper.isStream(inputs.stream) !== true)
      return exits.errorNotStream({
        error: "It's not a valid stream"
      });

    var stream = helper.decryptStream(inputs.stream, inputs.secret, exits.errorUnzip);

    if (inputs.save) {
      stream.pipe(fs.createWriteStream(inputs.path + ".gz"));
    }

    // Return an a crypted stream
    return exits.success({
      stream: stream
    });
  },
  "identity": "decrypt-stream"
};