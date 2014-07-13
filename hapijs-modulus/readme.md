This is a record of following along with the modulus tutorial for [creating a rest API using hapi] as part of my efforts to learn hapi.js.

I have added comments throughout to clarify anything I might want to look up in future.

The biggest change I made to the code here was to alter it so rather than having multiple 'server.route()' statements, I pulled all of these into a separate module (contained in ./quotes-routes.js) which exported the necessary routes. This means that in the main 'index.js' file, I now only have 'server.route(routes);'
I also split the functions that were in the handlers of all the routes out into individual functions outside of the route statements for code readability. 
