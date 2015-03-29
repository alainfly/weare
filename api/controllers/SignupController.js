var Machine = require("machine");
module.exports = {
    post_create: function(req, res) {
        Machine.build({
            inputs: {
                "password": {
                    "example": "l0lcatzz",
                    "required": true
                },
                "name": {
                    "example": "scott",
                    "required": true
                },
                "email": {
                    "example": "scott",
                    "required": true
                },
                "title": {
                    "example": "scott",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Encrypt password
                sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.2.0'].encryptPassword({
                    "password": inputs.password
                }).exec({
                    "error": function(encryptPassword) {
                        return exits.error({
                            data: encryptPassword,
                            status: 500
                        });

                    },
                    "success": function(encryptPassword) {
                        // Encrypt
                        sails.machines['8a950b56-8c46-4af7-ac9f-6ee58c6decd1_0.1.1'].encrypt({
                            "value": inputs.password,
                            "secret": inputs.email,
                            "buffer": false
                        }).exec({
                            "error": function(encrypt) {
                                return exits.error({
                                    data: encrypt,
                                    status: 500
                                });

                            },
                            "success": function(encrypt) {
                                // Create User
                                sails.machines['_project_1638_0.0.7'].create_user({
                                    "name": inputs.name,
                                    "password": (encrypt && encrypt.text),
                                    "email": inputs.email,
                                    "title": inputs.title
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(createUser) {
                                        return exits.respond({
                                            data: null,
                                            action: "display_view",
                                            status: 200,
                                            view: "user"
                                        });

                                    },
                                    "error": function(createUser) {
                                        return exits.error({
                                            data: createUser,
                                            status: 500
                                        });

                                    }
                                });

                            }
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    get_find: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: "display_view",
                    status: 200,
                    view: "signup",
                    data: undefined
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};