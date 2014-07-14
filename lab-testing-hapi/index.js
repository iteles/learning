var Hapi = require("hapi");
var Joi = require("joi");
var database = require("./database.json"); //picks up the array of users we will use for this test

var server = new Hapi.Server('localhost', Number(process.argv[2] || 8080));

//If this script is being used as a module by another script rather than being the
//main module, we shouldn't start the server
//This prevents the server from starting when we're testing it
if (!module.parent) {
    server.start(function() {
        console.log("Server started", server.info.uri);
    });
}

server.route({
  method: 'GET',
  path: '/users',
  handler: function(request, reply){
    reply(Object.keys(database));
  }
});

//if username exists, return that user
server.route({
    path: "/users/{username}",
    method: "GET",
    config: {
        validate: {
            params: { username: Joi.string().token() }
        },
        handler: function(request, reply) {
            if (database[request.params.username]) {
                reply(database[request.params.username]);
            } else {
                reply(Hapi.error.notFound("User not found."));
            }
        }
    }
});

//creating a new user
server.route({
    path: "/users/{username}",
    method: "PUT",
    config: {
        validate: {
            params: { username: Joi.string().token() },
            //expects a full_name, an age and an image parameter
            payload: {
                full_name: Joi.string(),
                age: Joi.number().integer(),
                image: Joi.string()
            }
        },
        handler: function(request, reply) {
            if (!database[request.params.username]) {
                database[request.params.username] = request.payload;
                database[request.params.username].count = 0;
                reply(database[request.params.username]);
            } else {
                reply(Hapi.error.conflict("User already exists."));
            }
        }
    }
});

server.route({
    path: "/users/{username}",
    method: "DELETE",
    config: {
        validate: {
            params: { username: Joi.string().token() }
        },
        handler: function(request, reply) {
            if (!database[request.params.username]) {
                reply(Hapi.error.notFound("User not found."))
            } else {
                delete database[request.params.username];
                reply("success");
            }
        }
    }
});

module.exports = server;
