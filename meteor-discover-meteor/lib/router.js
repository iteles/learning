Router.configure(
  {
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function(){
      return Meteor.subscribe('posts');
    }
  }
);

Router.route('/',
  {name: 'postsList'}
);

Router.route('/:_id',
//the '_id' here goes into the router's params array
  {name: 'postPage',
    //thi data context passes the id in the current URL to the findOne function
   data: function(){ return Posts.findOne(this.params._id); }
   }
);
