Posts = new Mongo.Collection("posts");

//Posts.allow added in after insecure package was removed
Posts.allow({
insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId; }
});
