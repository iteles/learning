//Structure of this file:
//1. Define Mongo collection (for posts)
//2. Define client-side allow() and deny()s
//3. Define methods

Posts = new Mongo.Collection("posts");

Posts.allow({
  //insert is actually done via the postInsert method - as it is a method, it bypasses the
  //allow() so there's no point in having an allow statement for them
  update: function(userId, post){ return ownsDocument(userId, post);},
  remove: function(userId, post){ return ownsDocument(userId, post);}
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0); }
});

Meteor.methods({
  //postInsert method: checks the userID, post title and URL (entered into submit form) are
  //strings, then add the current user's ID, name and current timestamp to the post. Finally
  //it inserts the data from that new post into the Posts database and return the ID of the new post

  //defining the postInsert function, called in postSubmit
  postInsert: function(postAttributes){
    //uses Meteor's audit-arguments-check package (built in) to check the userId is a String
    check(Meteor.userId(), String);
    //validates that in the postAttributes passed in, the title and url are both strings
    check(postAttributes, {
      title: String,
      url: String
    });

    //****This section checks whether the URL already exists in the DB & exits the method if it does *****
    var postWithSameLink = Posts.findOne(postAttributes.url);
    //if there *is* a post with that URL already
    if (postWithSameLink){
      return {
        //create a postExists attribute which you will use in the Method call and returns that with the id of the existing post
        postExists: true,
        _id:postWithSameLink._id
      };
    }
    //********************************************

    //assigns the current user to a variable we can use
    var user = Meteor.user();
    //extend - part of the build in Underscore library - the postAttributes variable
    //by adding the user's id, username and the current date and time as a timestamp to it
    var post = _.extend(postAttributes,{
        userId: user._id,
        author: user.username,
        submitted: new Date()
    });
    //inserting a new post into the database yields the ID for the new post
    var postID = Posts.insert(post);

    return{
      _id: postID
    };

  } //end of postInsert method

});
