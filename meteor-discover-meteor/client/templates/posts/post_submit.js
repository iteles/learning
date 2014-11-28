//note the use of 'events' here as opposed to 'helpers'which is what we've been using up until now
Template.postSubmit.events({
   'submit form': function(event) {
       //prevents default browser behaviour of page refresh on submit
      event.preventDefault();

      var post = {
        //finds input field named 'url' and sets its contents as the value of the url property
        url: $(event.target).find('[name=url]').val(),
        //finds input field names 'title' and sets its contents as the value of the title property
        title: $(event.target).find('[name=title]').val()
      };


      Meteor.call('postInsert', post, function(error, result) {
        // display the error to the user and abort
        if (error)
          //throwError function created in templates/includes/errors.js & uses errors.html template
          //to show a little red box at the top of the screen
          return throwError(error.reason);

        //postExists is set to true in the postInsert method if the submitted post already exists
        if (result.postExists)
          return throwError('Post already exists');

        //constructs a URL using the ID for the new post and calls the postPage template
        Router.go('postPage', {_id: result._id});
      });

    }
});
