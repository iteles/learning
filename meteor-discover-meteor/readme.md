Ahead of a [Meteor London](http://www.meteorlondon.com) workshop, I decided to make my way through [Discover Meteor](https://book.discovermeteor.com/) to make sure I understood the core ideas and wasn't rushing to catch up all day!
Below are some notes I made throughout.

###Setup
* `meteor add mizzao:bootstrap-3` adds the Bootstrap framework
  * This could be added as usual by including its files in our project but this way the package keeps it up to date
* `meteor add underscore` adds [underscore.js](http://underscorejs.org/), a javascript utility library

* Start your meteor app by typing `meteor create <appname>` and you'll get some scaffolding including a `.meteor` folder which holds all of meteor's own code - don't mess with this folder!  
* Suggested app structure (there are no mandatory structures in meteor):
  * **server** - only runs on the server
  * **client** - `main.js` and `main.html` will be in this folder, which only runs on the client
    * `main.*` files are loaded **after everything else**
    * **CSS goes in the _client_ directory** (not in the _public_ one) because it is minified and loaded by meteor
    * Meteor is pretty impressive at finding your client files so the structure inside this folder doesn't matter - use as many sub-folders as you like to keep it clean and organised
  * **public** - contains your _static assets_ like images, favicons and fonts
    * When referencing files in this folder there is no need to use _public/_, just _/<asset-name>_
  * **lib** - is loaded **before anything else**
  * ** test**
* Everything outside the _server_ and _client_ directories run on **both** server and client
* Note: To write in [CoffeeScript](http://coffeescript.org/) rather than vanilla JavaScript, just make sure you add the CoffeeScript package to your app `meteor add coffeescript`

###Templates
* Meteor's templating engine is [Spacebars](https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md)
* To _include_ the template in your HTML use the syntax `{{ > templateName}}` - these are called **inclusions**
* The name of the actual _file_ of your template isn't relevant, it's providing a `name` in the opening `<template>` tag, e.g. `<template name="templateName">` that meteor looks for
* **Expressions** are in the format `{{title}}` return a property of the current object or the value of a template helper
* **Block helpers** control parts of the template, e.g. `{{#each}}…{{/each}}` to iterate over objects or `{{#if}}…{{/if}}` to add things in conditionally 
