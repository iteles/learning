//holds postItem template's logic

//returns {{domain}} and {{url}} for postItem template
Template.postItem.helpers({
  //new attribute created here, returns true if the user who owns the post is equal to the currently logged in user
  ownPost: function(){
    return this.userId === Meteor.userId();
  },

  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;  //returns full URL, e.g. http://sachagreif.com/introducing-telescope/
    return a.hostname; //returns just domain, e.g sachagreif.com
    //essentially domain = a.hostname & a.href=this.url
  }

});

//As the postItem template iterates over the posts array, at each post it will assign 'this.'
//to the current post, which is why we can call this.url here and have it mean a different thing for each post
