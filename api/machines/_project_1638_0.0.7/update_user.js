module.exports = {
  "inputs": {
    "name": {
      "example": "scott",
      "friendlyName": "name"
    },
    "password": {
      "example": "scott",
      "friendlyName": "password"
    },
    "email": {
      "example": "scott",
      "friendlyName": "email"
    },
    "title": {
      "example": "scott",
      "friendlyName": "title"
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving User instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "name": "scott",
        "password": "scott",
        "email": "scott",
        "title": "scott",
        "id": 123,
        "createdAt": "2015-03-25T00:01:46.005Z",
        "updatedAt": "2015-03-25T00:01:46.005Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.user.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_user"
};