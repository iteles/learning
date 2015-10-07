//Again, this code cannot be run as this chapter doesn't take us
//through connecting this snippet to the rest of the code
//NOTE: This chapter doesn't talk through the code, just provides the example

var Async = require('async')
var Boom = require('boom');
var FS = require('fs');
var DB = require('../../db');


module.exports.postUpload = {
    description: 'Post a file for upload',
    payload:{
        //limiting file size helps prevent malicious users crashing app
        maxBytes: 209715200, 
        //readStream created to pipe output to a file (in this case).
        //Chunking the file straight away prevents having to have the whole
        //file in the app's memory at any one point
        output:'stream', 
        parse: true 
    },
    handler: function (request, reply) {
        //datafile = name of the file uploaded as dictated by our upload view
        //pipes the incoming data into a file named "out"
        request.payload.datafile.pipe(FS.createWriteStream("out"));
        return reply('File upload complete');
    }
};


//liking a plugin function
module.exports.like = {
    auth: 'session',
    handler: function (request, reply) {

        var pluginName = request.params.name;

        var username = request.auth.credentials.username;
        if (!username) {
            return reply(Boom.unauthorized());
        }

        var getPlugin = function (user, next) {

            DB.plugin.get(pluginName, function (err, plugin) {

                if (err || !plugin) {
                    return next(Boom.notFound('no such plugin found'));
                }

                return next(null, plugin, user);
            });
        };

        var addLike = function (plugin, user, next) {

            user.like(plugin, function (err) {

                return next(err);
            });
        };

        Async.waterfall([
                        getOrCreateUser, //where is this defined?
                        getPlugin,
                        addLike
        ], function (err, result) {

            if (err) {
                return reply(err);
            }
            return reply({success: true});
        });
    }
};