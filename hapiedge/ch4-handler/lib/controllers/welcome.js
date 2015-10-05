module.exports.index = {
  description: 'Show the main page for our welcome page',
  handler: function(request, reply){
    console.log('welcome index activated');
    return reply({status: 'OK'});
  }
};