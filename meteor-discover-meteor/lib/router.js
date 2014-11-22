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

Router.route('/posts/:_id/edit',
  {name: 'postEdit',
   data: function(){ return Posts.findOne(this.params._id);}
  }
);

//ROUTE HOOK
var requireLogin = function() {
  //if the user is not logged in
  if (! Meteor.user()) {
    //check if he's actually in the process of logging in already
    if (Meteor.loggingIn()) {
      //if he is, show the loading template
      this.render(this.loadingTemplate);
    }
    //if he's not, show the access denied template
    else { this.render('accessDenied'); }
    }
  //if the user is already logged in, great, move onto the next thing
  //(defined in Router.onBeforeAction(...);)
  else {
    this.next(); }
};


//creating new posts
Router.route('/submit',
    {name: 'postSubmit'}
);

//before anything is loaded, ironRouter will check for data and using the dataNotFound
//plugin, will render postPage if there's no data - this is ONLY applied to routes using
//the postPage plugin
Router.onBeforeAction('dataNotFound', {only: 'postPage'});

//Use the `requireLogin` route hook to check if the user is logged in & should be shown the postSubmit page
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
