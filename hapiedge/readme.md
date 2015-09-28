#Developing a hapi edge

Most notes for this book are actually in the code files in the form of comments, but I've added some additional notes here.

## Chapter 2 - Server
+ It's cleaner to split out the HTTP server and the API server (which handles the data)
  + You can add `labels` to the server to ensure the connection is recognisable as one or the other (used for loading plugins)
+ All methods available on the server are also available on anything passed to the plugins  (more on plugins in chapter 6)
  + It's the first argument passed to the plugin