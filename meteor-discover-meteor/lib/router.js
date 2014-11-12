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

Router.route('/posts/:_id',
//the '_id' here goes into the router's params array
  {name: 'postPage',
    //this data context passes the id in the current URL (this.params._id) to the findOne function
   data: function(){ return Posts.findOne(this.params._id); }
   }
);

//creating new posts
Router.route('/submit',
    {name: 'postSubmit'}
);

//before anything is loaded, ironRouter will check for data and using the dataNotFound
//ZZZ - plugin, will render postPage if there's no data (not sure what the 'only' does yet)
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
