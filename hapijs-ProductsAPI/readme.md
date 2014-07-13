I originally found this example through a NodeJS Knockout tutorial, [Making an API happy with hapi](http://blog.nodeknockout.com/post/34571027029/making-an-api-happy-with-hapi), but quickly realised it was using parts of hapi that no longer exist (the tutorial uses version 0.8 of hapi and we're at version 6.0 at the time of writing.

Luckily I found an [updated version by wpreul](https://github.com/wpreul/hapi-example). Although it's still not super up-to-date, I will be following along to see what it can teach me about hapi. Debugging is always a great teacher.
It creates and lists products using hapi.

In terms of dependencies, this API uses:
* [hapi](https://www.npmjs.org/package/hapi), our HTTP server framework of choice
* [lout](https://www.npmjs.org/package/lout), a documentation generator plugin for hapi
* [handlebars](https://www.npmjs.org/package/handlebars), a templating language used to process templates and helpers

As at 13th July 2014, the code is still not functional. I'm changing small bits where I can to bring them up to date but I'm still learning what all the working parts do. I plan to make this example work for the current versions of hapi and lout and handlebars.
