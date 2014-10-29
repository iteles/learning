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
    * Collections will be kept in this folder as they will need to be accessed from both server and client
  * ** test**
* Everything outside the _server_ and _client_ directories run on **both** server and client
* Note: To write in [CoffeeScript](http://coffeescript.org/) rather than vanilla JavaScript, just make sure you add the CoffeeScript package to your app `meteor add coffeescript`

###Templates
* Meteor's templating engine is [Spacebars](https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md)
* To _include_ the template in your HTML use the syntax `{{ > templateName}}` - these are called **inclusions**
* The name of the actual _file_ of your template isn't relevant, it's providing a `name` in the opening `<template>` tag, e.g. `<template name="templateName">` that meteor looks for
* **Expressions** are in the format `{{title}}` return a property of the current object or the value of a template helper
* **Block helpers** control parts of the template, e.g. `{{#each}}…{{/each}}` to iterate over objects or `{{#if}}…{{/if}}` to add things in conditionally

* Templates and their logic are kept separate in Meteor, with the logic in _template helpers_
  * Examples: `post_item.js` will hold the logic for the `postItem` template

* As templates iterate through datasets with `{{#each}}…{{/each}}`, they assign each item in that array to `this` in turn, for example in our array of posts, `this` will be assigned to each post in turn so `this.url` will always refer to the `url` property of the **current** post that is being iterated over - this means that in the template helpers we can safely use `this.property` to refer to a property of our current item
An example of a common but simple pattern used in template helpers:
```javascript
//holds postItem template's logic
//returns {{domain}} and {{url}} for postItem template
Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;  //returns full URL, e.g. http://sachagreif.com/introducing-telescope/
    return a.hostname; //returns just domain, e.g sachagreif.com
    //essentially domain = a.hostname & a.href=this.url
  }
});
```

###Collections
* Collections are how Meteor keep data synchronised between the front and back end
* They **store persistent data** by taking care of storing it in the permanent server-side and also provide access to all client browsers in realtime _without having to write a lot of server side code_
* Collections live in the **/lib** folder to make sure they're always loaded first
  * Also remember that because the _/lib_ folder is outside of the _/client_ and _/server_ folders, it will run on _both client and server_

* [MongoDB](http://www.mongodb.org/) is the default server-side database for Meteor
  * To **look inside your database**, open a separate terminal window while your meteor app is running, type `meteor mongo`
  * This brings up the [Mongo Shell](http://docs.mongodb.org/v2.2/mongo/) which you can use with commands like
* The collection **acts as an API** to your Mongo database, so you can write things like `Posts.insert()` in your server-side code









###Further Notes
* In Meteor, the `var` keyword limits the scope of the variable to the current file so you wouldn't use it for collections you want to be available for your whole app, e.g.
```javascript
Posts = new Mongo.collection('posts');
```
*
