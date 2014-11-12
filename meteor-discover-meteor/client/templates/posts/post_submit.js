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

    //Using 'insert()' on a collection returns the newly generated id
    //here we're creating the new post by passing it the url and title (within the post variable)
    post._id = Posts.insert(post);

    //constructs a URL using the
    Router.go('postPage',{_id: post._id});
  }
});
