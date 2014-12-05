Template.postPage.helpers({
  comments: function(){
    return Comments.findOne(this._id);
  }
});
