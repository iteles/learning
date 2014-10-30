//holds postList template's logic


//in the HTML this is iterated over using {{#each posts}}
Template.postsList.helpers({
  posts: function(){
    return Posts.find();
  }
});
