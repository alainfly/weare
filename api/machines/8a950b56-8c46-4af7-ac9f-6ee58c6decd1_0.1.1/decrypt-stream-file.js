module.exports = {
  "inputs": {
    "path": {
      "example": "file.txt.gz",
      "description": "a path",
      "required": true,
      "type": "string",
      "name": "path",
      "friendlyName": "path"
    },
    "secret": {
      "example": "a secure phrase or password",
      "description": "a secure phrase",
      "required": true,
      "type": "string",
      "name": "secret",
      "friendlyName": "secret"
    },
    "save": {
      "example": true,
      "description": "a boolean, saving in the same folder",
      "required": false,
      "type": "boolean",
      "name": "save",
      "friendlyName": "save"
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "errorFileNotFind": {
      "description": "Error: File not find.",
      "name": "errorFileNotFind",
      "friendlyName": "errorFileNotFind"
    },
    "success": {
      "description": "OK.",
      "isDefault": true,
      "name": "success",
      "friendlyName": "success"
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var helper = require("../lib/helper.js");
    var fs = require("fs");

    if (fs.existsSync(inputs.path) !== true)
      return exits.errorFileNotFind();

    var stream = helper.decryptStream(fs.createReadStream(inputs.path), inputs.secret);

    if (inputs.save) {
      var newPath = inputs.path.slice(0, -3);
      console.log("newPath", newPath);
      stream.pipe(fs.createWriteStream(newPath));
    }

    return exits.success({
      stream: stream,
      path: inputs.save ? inputs.path.slice(0, -3) : inputs.path
    });
  },
  "identity": "decrypt-stream-file"
};