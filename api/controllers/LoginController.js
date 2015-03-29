var Machine = require("machine");
module.exports = {
    get_find: function(req, res) {
        Machine.build({
            inputs: {
                "userId": {
                    "example": ""
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // If defined
                sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.2.0'].ifDefined({
                    "value": (req.session.userId ? (req.session.userId + '') : '')
                }).exec({
                    "error": function(ifDefined) {
                        return exits.error({
                            data: ifDefined,
                            status: 500
                        });

                    },
                    "otherwise": function(ifDefined) {
                        return exits.respond({
                            data: null,
                            action: "display_view",
                            status: 500,
                            view: "login"
                        });

                    },
                    "success": function(ifDefined) {
                        return exits.respond({
                            data: null,
                            action: "display_view",
                            status: 200,
                            view: "login"
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    post_create: function(req, res) {
        Machine.build({
            inputs: {
                "password": {
                    "example": "fly061979",
                    "required": true
                },
                "email": {
                    "example": "abc123",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Find One User
                sails.machines['_project_1638_0.0.7'].findOne_user({
                    "criteria": {
                        email: inputs.email
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(findOneUser) {
                        // Decrypt
                        sails.machines['8a950b56-8c46-4af7-ac9f-6ee58c6decd1_0.1.1'].decrypt({
                            "value": (findOneUser && findOneUser.password),
                            "secret": inputs.email,
                            "buffer": false
                        }).exec({
                            "error": function(decrypt) {
                                return exits.error({
                                    data: decrypt,
                                    status: 500
                                });

                            },
                            "success": function(decrypt) {
                                // If equal (===)
                                sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.2.0'].ifEqual({
                                    "a": inputs.password,
                                    "b": (decrypt && decrypt.text)
                                }).exec({
                                    "error": function(ifEqual) {
                                        return exits.error({
                                            data: ifEqual,
                                            status: 500
                                        });

                                    },
                                    "otherwise": function(ifEqual) {
                                        return exits.respond({
                                            action: "respond_with_status",
                                            status: 500,
                                            view: "login"
                                        });

                                    },
                                    "success": function(ifEqual) {
                                        // Remember
                                        sails.machines['cebb1bbf-8b7f-4447-bfe1-5eae49cfbc28_1.1.0'].Remember({
                                            "data": {
                                                userId: (findOneUser && findOneUser.id)
                                            }
                                        }).setEnvironment({
                                            req: req,
                                            sails: sails
                                        }).exec({
                                            "error": function(remember) {
                                                return exits.error({
                                                    data: remember,
                                                    status: 500
                                                });

                                            },
                                            "then": function(remember) {
                                                return exits.respond({
                                                    action: "respond_with_status",
                                                    status: 200,
                                                    view: "/"
                                                });

                                            }
                                        });

                                    }
                                });

                            }
                        });

                    },
                    "error": function(findOneUser) {
                        return exits.error({
                            data: findOneUser,
                            status: 500
                        });

                    },
                    "notFound": function(findOneUser) {
                        return exits.respond({
                            data: "this user email do not exiset",
                            action: "respond_with_value_and_status",
                            status: 500,
                            view: ""
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};