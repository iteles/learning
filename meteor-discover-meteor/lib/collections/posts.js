Posts = new Mongo.Collection("posts");

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
