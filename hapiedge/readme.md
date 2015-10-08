# Developing a hapi edge

Most notes for this book are actually in the code files in the form of comments, but I've added some additional notes here.

## How the code is organized:
Each chapter directory contains the code in the state it should be in **at the _beginning_ of that chapter**. The idea here is that for every chapter there is a _"clean slate"_ that I or anyone using these notes can come back to if they want to dip in to just one chapter and do the work there.    
If you want to see all of the code created during chapter 4 for example, you would actually go into the chapter 5 directory.

## Contents Guide
+ [Chapter 2 - Server](#chapter2)
+ [Chapter 3 - Routes](#chapter3)
+ [Chapter 4 - The Handler](#chapter4)
+ [Chapter 5 - Validation](#chapter5)

<a name="chapter2"/>
## Chapter 2 - Server
**Takeaways:**
>Using `glue` can make setup look cleaner and simpler and the book recommends using `rejoice` or `confidence` to configure our server with JSON files when there are multiple environments (`dev`, `prod`, etc).   
**This chapter also contains a great overview of the hapi http request lifecycle**.

+ It's cleaner to split out the HTTP server and the API server (which handles the data)
  + You can add `labels` to the server to ensure the connection is recognisable as one or the other (used for loading plugins)
+ All methods available on the server are also available on anything passed to the plugins  (more on plugins in chapter 6)
  + It's the first argument passed to the plugin
  
+ **Using `glue`** means the [index.js](./ch2-server/index.js) file is cleaner and simpler to read through
  + Everything is defined in the `manifest` JSON object (connections and plugins) and then brought together by `glue`'s `compose` function
  + Before `glue` (see [PART1-index.js](./ch2-server/PART1-index.js)), we had to require all the plugins, then set up 2 functions to register the plugins against each connection plus the rest of the server functionality
<br/>
<br/>
+ [`rejoice`](https://www.npmjs.com/package/rejoice) is a CLI tool which starts up a hapi instance from a single JSON file with `rejoice -c example.json`
  + It used to be part of hapi but was split out
+ [`confidence`](https://www.npmjs.com/package/confidence) is also a CLI tool which does the same thing except you can apply filters to it so that you can quickly alter your configuration in multiple environments (i.e. have a _base_ environment configuration with alterations for _dev_ and _prod_)
<br/>
<br/>
+ `server.decorate` adds functions directly to the server, whereas `server.method` simply registers methods on the server that are then available everywhere on that server via a call to `server.methods.methodNameHere`
<br/>

**Caching**
+ hapi's built-in **caching** facility **relies on [`catbox`](https://www.npmjs.com/package/catbox)**
+ You can set up a cache with segments and give each segment a name as a way of isolating cached items
  + When you instantiate (?) the cache from within a plugin, the segment defaults to `!pluginNameHere`
<br/><br/>

**There is a great list of the _http request lifecycle_ in chapter 2 (location 446 on the Kindle eBook)**.

**Extension points**
+ Extension points (`server.ext()`) are used to grab certain points (streams like `onPreResponse` and `onRequest`) and insert a function
  + _Note: Professional Node developers I know have said they don't ever use extension points_
  
<a name="chapter3"/>
## Chapter 3 - Routes
+ For more complex configuration, route `config` (handlers, validation, caching - though this is a different caching to `server.cache` - etc) is usually kept in a separate file
```javascript
//server.js
var Welcome = require('./controllers/welcome.js')
//...
server.route({
    method:'GET',
    path:'/',
    config: Welcome.index
});
//...
```
```javascript
//welcome.js
module.exports.index = {
    description: 'description here',
    handler: function(request, reply){
    //...
  }
};
```

+ hapi protects you against conflicts between your routes by complaining when there is a conflict

+ **Route prerequisites** allow you to perform an action before the route handler is called, like fetching data from a database
  + part of `config`
  + `pre:` inside `server.route`
  + Takes an array of _objects_
    + Each object has a `method` and an `assign` property (although it [can have more](http://hapijs.com/api#route-prerequisites))
    + Runs in series - except arrays within that array where the actions are run in parallel

```javascript
server.route({
  //...
  config:{
    pre: [
      series, //e.g. {method: yourFunctionHere, assign: 'connection'}
      series,
      [
        parallel, 
        parallel
      ],
      series
    ]
  }
});
```
+ Paths accept parameters in curly brackets such as `path: '/plugins/{name}'`, which can then be accessed in the handler using `request.params.name`
  + Adding a `?` to the parameter name indicates it is optional: `'/plugins/{name?}'`
  + You can also add a wildcard `*`, `'/plugins/{name*}'`, which will store wildcard characters as an array in the named parameter (name)
    + You can also add the number of segments you want to be wilcards: `'/plugins/{name*2}'` would match '_/plugins/hapijs/hapi-auth-jwt2_' for example
  
+ Only 2 options can be set as part of the server itself:
  + `stripTrailingSlash` which **defaults to `false`** and strips slashes from the end of a path (e.g. _'plugin/hapijs/bell/'_ becomes _'plugin/hapijs/bell'_)
  + `isCaseSensitive` which **defaults to `true`** and means paths are case sensitive 
  
<a name="chapter4"/>
## Chapter 4 - The Handler
A handler determines how the incoming request to the server should be dealt with and what to respond to the client. It's a callback generally with two arguments: `request` and `reply`.

_Note: handlers **can** be defined directly on the server object (`server.handler`) but this is **not advised in practice**).

### Request object
There's a lot of important information attached to the **request object** such as:
+ **parameters** from `'/plugins/{name*}'` accessed via `request.params.name`
+ **query** is the `?search=accessibility&search=books` part of the URL, accessed via `request.query` which contains all the key value pairs in the query - e.g. `{search: 'accessibility', 'books'}`
+ **payload** contains what was transmitted as part of the request _but not in the query string_ (e.g. a blob of JSON or a user's email address when they sign up to a newsletter)
  + Should **never have a payload with `GET`**, if so, rethink your design
  ```javascript
  handler: function(request, reply){
    console.log("You've signed up with the email ", request.payload.email);
    return reply('success');
  };
  ```
+ **headers** are accessed via `request.headers`, so `request.headers.Content-Type` could be `application/json` for example 

### Reply object
Serves as a callback and is **returns control to the framework**.

As it's a callback, it passes back both an error and a result object though in practice only the result is used.

### Organizing handlers
It's recommended that they go into `/lib/routes.js` and it's typical for the configuration of the route to live in a completely different file like this (for clarity and structure).

### Common handlers
Handlers **used to be built-in** (before hapi 9.0), **they are now plugins**.

In order to _use_ these plugins, add them to `package.json` and make sure they're [registered with the server](http://hapijs.com/api#serverregisterplugins-options-callback).

#### file handler
**Plugin:** `inert`    
**Function:** Serves individual files.    
**Example:** Serving a favicon

Add a route to your _lib/routes.js_
```javascript
{
  method:'GET',
  path: '/favicon.ico',
  handler: Controllers.Static.favicon
}
```

There will be a corresponding exported handler in _lib/controllers/handlers/static.js_ :
```javascript
exports.favicon = {
    file: __dirname + '/../../public/favicon.ico'
};
```

+ Using a **string** as above in the handler is the most straight-forward approach
  + A **callback** takes the `request` object as an argument and returns the path
  ```javascript
  exports.favicon = {
      file: function(request){
        __dirname + '/../../public/favicon.ico'
      }
  };
  ```
  + An **object** allows you a few more options:
  ```javascript
  //inside the exports.favicon
  file: {
    path: '/../../public/favicon.ico',
    fileName: 'nameGoesHere', //overrides filename in Content-Disposition header
    mode: false, //defualts to false, Content-Disposition header is not included
    lookUpCompressed: false //defaults to false, means it doesn't look for a file of the same name with .gz ending
  }
  ```

#### directory handler
**Plugin:** `inert`    
**Function:** Serves multiple files.    
**Example:** Serving CSS, JS, images, etc
```javascript
exports.css = {
    directory: {
        path: __dirname + '/../../public/css',
        index: false
    }
};
```

Rather than using `file:`, it uses `directory:` and has a few more options that can be included in the object:
  + `path` can be set up in the same numerous ways as in the file handler
  + `index` contains `true`, `false` or string with name of index file to look for - the default is `index.html`
  + A few more [directory handler options can be found in the hapijs documentation](http://hapijs.com/tutorials/serving-files#directory-handler-options)

#### views handler
**Plugin:** `vision`    
**Function:** Displays information using templates 

_Note:_ **In practice, what is _used most often_ is actually configuring the server with a view option and then using `reply.view()` in the handler,** but hapi supports both well.
**These notes will therefore focus on the regular handler using `server.views`**.

In _both_ cases you **start by adding a views manager to the server configuration** - in the hapi-plugins.com project, this is done by exporting it from _lib/routes.js_.
```javascript
plugin.views({
  engines: {
    html: {
      //sets handlebars as the rendering engine
      model: require('handlebars') 
    }
  },
  path: __dirname + '/views'
});
```
To reply with your index page including a quote you might add something like this to _lib/controllers/handlers/home.js_:
```javascript
var internals = {};

internals.quotes = [
  //"list of quotes", "goes here"
]

module.exports.get = {
  handler: function(request, reply){
    reply.view('index', {
      //finalmsg is what is in our template (<div> {{finalmsg}} </div>)
      finalmsg: internals.quotes[Math.floor(Math.random()*internals.quotes.length)]
    });  
  };
};
```

#### proxy handler
**Plugin:** `h202`    
**Function:** Sets up a proxy, often used for proxying legacy services    
**Example:** Proxying google

This allows for smaller, more controlled changes in your code as you slowly add routes to replace the service you're proxying over time.

Here are just [some of the things](http://hapijs.com/api#route-options) you can do with the proxy handler:
```javascript
server.route({
  method: '*', //matches any method
  path: '/(path*)' //routes everything
  config: {
    handler:{
      proxy: {
        host: 'google.com',
        port: '80',
        protocol: 'http',
        redirects: '5', //6th redirect gets a 300 error instead
        passThrough: true, //preserves headers on the request
        xforward: true //appends 'x-forwarded-for' header to request
      }
    }
  }
});
```
### Binding methods to the server

When you have function that need to be accessed multiple times, you can **[bind them](http://hapijs.com/api#serverbindcontext) to the global context** which makes them available on the `this` keyword within the handler.
```javascript
server.bind({
  myService: new Service()
});

//now accessible in the handlers as `this.myService`
```
### Decorating the reply

You can choose to decorate the server _or_ the reply and it's in the first argument of the `decorate()` function that you choose which one you're decorating. 
```javascript
//here we're decorating the reply with a 'success' function
server.decorate('reply', 'success', function(){
  return this.response({ success: true });
});

//NOTE: Accessed in the handler simply through `reply.success();`
```

This particular example is also good for ensuring consistency across replies for success.

### Tails
When a request finishes processing, it emits a `tail` event, which can be picked up with `server.on('tail', function(request){ ... })`.

When tails are [explicitly added using `request.tail`](http://hapijs.com/api#requesttailname) (e.g. `var publishTail = request.tail('publish the book in the background for download');`)they must complete _before_ the request lifecycle is complete.

<a name="chapter5"/>
## Chapter 5 - Validation
hapi provides validation for `query`, `payload`, `headers` and `params` and
typically this is validated with a [Joi](https://github.com/hapijs/joi) validation object.

+ Configured as part of the route options
+ `validate` is conveniently baked into hapi, but Joi can be used with other frameworks

**Example:** You want to send change a password for one you specify
```javascript
//JSON object you send to the /user/{id}/password endpoint
{ password: "somePasswordHere" }
```
So you set up the route like this:
```javascript
var Joi = require('joi');

var routeOptions = {
  //validate section is ONLY for INPUTS, so `response` has to be separate
  validate:{
    //id is made into a parameter
    params: Joi.object().keys({
      id: Joi.number();
    });
    //turns the password JSON object into the payload object 
    payload: Joi.object().required().keys({
      password: Joi.string().min(8).required();
    });
  },
  //response (output) validation is extra important if you are relying on
  // another API for example, you need to be confident it is valid
  response:{
    schema: Joi.object.keys({
      success: Joi.boolean().required;
    });
  },
  handler: handler;   
};

server.route({
  method: 'POST',
  path: '/user/{id}/password',
  config: routeOptions;
});
```
+ Validation schemas can get quite big so if you're going to re-use them or keep your code clean, you can put the validation rules in the  `internals` variable (`var internals = { pluginSchema: Joi.object().keys({ ... })}`) and then refer to them in through `schema: internals.pluginSchema`

+ Joi is chainable, e.g. in this case only these 4 values are accepted: `Joi.string().insensitive().required().valid(['BR', 'SF', 'WR', 'WL']);`
+ You don't have to use Joi of course, you can just write your own validation function










