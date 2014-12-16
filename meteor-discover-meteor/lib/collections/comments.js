Comments = new Mongo.Collection("comments");

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String); check(commentAttributes, {
        postId: String,
        body: String
    });

    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);

    if (!post)
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');

    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    //update the post's commentCount variable to show the added comment
    Posts.update(comment.postId, {$incl:{commentCount: 1}});

  return Comments.insert(comment); }
});
