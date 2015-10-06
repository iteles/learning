# Developing a hapi edge

Most notes for this book are actually in the code files in the form of comments, but I've added some additional notes here.

## Contents Guide
+ [Chapter 2 - Server](#chapter2)
+ [Chapter 3 - Routes](#chapter3)
+ [Chapter 4 - The Handler](#chapter4)

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



