#Developing a hapi edge

Most notes for this book are actually in the code files in the form of comments, but I've added some additional notes here.

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
**There is a great list of the _http request lifecycle_ in chapter 2 (location 446 on the Kindle eBook)**

**Extension points**
+ Extension points (`server.ext()`) are used to grab certain points (streams like `onPreResponse` and `onRequest`) and insert a function