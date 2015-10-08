var Async = require('async')
var Boom = require('boom');
var Xss = require('xss'); //sanitizes HTML to prevent XSS

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


//liking a plugin function - didn't get any explanation in chapter 4
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

//added chapter 5
module.exports.search = {
    //for inputs from search form
    validate: {
        //part of the URL after the ?=
        //currently expects 3 inputs, but only q is required
        query: {
            q: Joi.string().required(),
            sort: Joi.string().optional(),
            fields: Joi.string().optional()
        }
    },
    response: {
        //not separated out into it's own file in this case because it's small
        schema: Joi.array().includes(Joi.object().keys({
            name: Joi.string().required(),
            authors: Joi.array().optional(),
            keywords: Joi.array().optional(),
            dependencies: Joi.array().optional(),
            dependents: Joi.array().optional(),
            //by default empty strings aren't allowed in Joi
            //so for the homepage we have to make that explicit
            homepage: Joi.string().allow(''),
            version: Joi.string().optional().allow(''),
            license: Joi.string().optional().allow(''),
            description: Joi.string().optional().allow(''),
        }))
    },
    handler: function (request, reply) {

        var query = null;
        var sort = null;
        if (request.query.q) {
          //Xss sanitizes the input to prevent XSS
            query = Xss(request.query.q);
        }
        if (request.query.sort) {
            sort = Xss(request.query.sort);
        }
        
        DB.plugin.search(query, sort, function (err, results){
          
            //convert is a function that is in the final code
            // but not in this chapter oddly
            var converted =  internals.convert(results);        
            return reply(converted);
            });
    }
};