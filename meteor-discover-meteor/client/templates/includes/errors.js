throwError = function(message) {
  Errors.insert({message: message});
};

Template.errors.helpers({
  errors: function(){
    return Errors.find();
  }
});

//.rendered is triggered once the template has been fully rendered in the browser
//ideal for error as these only happen after rendering
Template.error.rendered = function(){
  //'this' refers to the current instance of the error template (so this.data will be the current error)
  var error = this.data;
  //removes the error from the local Errors collection 3000ms after it was created so
  //the collection doesn't become bloated for no reason
  Meteor.setTimeout(function(){
    Errors.remove(error._id);
  }, 3000);
};
