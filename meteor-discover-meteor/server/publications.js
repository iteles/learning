Meteor.publish ('posts', function(){
  return Posts.find();
});

//the postId is passed in as an argument in the subscription in router.js 
Meteor.publish('comments', function(postId){
  //checks that the postId is in fact a String
  check(postId, String);

  return Comments.find({postId:postId});
});
