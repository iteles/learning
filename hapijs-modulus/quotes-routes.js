var Hapi = require('hapi');
var Joi = require('joi');

//********* Routes to be exported by the module *********

module.exports = [
{ path: '/quotes',
  method: 'GET',
  handler: getAllQuotes },

//retrieves a random quote by creating a random ID
{ path: '/random',
  method: 'GET',
  handler: getRandomQuote },

{ path: '/quote/{id?}',
  method: 'GET',
  handler: getQuote },

{ path: '/quote',
  method: 'POST',
  //using config here because we want to include more than one thing in the configuration of this route
  //not just the handler as usual but the handler AND the validation
  config: { handler: postNewQuote,
    //validates author and text of new quote are both strings and are present
    validate: {
      payload: {
        author: Joi.string().required(),
        text: Joi.string().required()  }
    }
  } //end of config options for /quote
},

{ path: '/quote/{id}',
  method: 'DELETE',
  handler: deleteQuote }

];


//********* FUNCTIONS that are be used as the handlers in the routes above *********


//prints a list of all quotes
function getAllQuotes (req, reply) {
    reply(quotes);
  }

//retrieves a random quote by creating a random ID
function getRandomQuote(req, reply) {
    //generated a random number to serve as the ID
    var id = Math.floor(Math.random() * quotes.length);
    reply(quotes[id]);
  }

//reply with a specific quote as determined by the ID passed through in the URL http://localhost:8080/quote/ID
function getQuote(req, reply) {
  if (req.params.id) {
    if (quotes.length <= req.params.id) {
      return reply('No quote found.').code(404);
    }
    return reply(quotes[req.params.id]);
  }
  reply(quotes);
}

function postNewQuote (req, reply) {
  //picks up the author and text of the new quote from the request payload
  var newQuote = {
    author: req.payload.author
  , text: req.payload.text
  };
  //adds the new quote to the quotes array
  quotes.push(newQuote);
  //returns the new quote as the reply on the screen
  reply(newQuote);
}

//deletes a quote of a given ID
function deleteQuote (req, reply) {
  if (quotes.length <= req.params.id) {
    return reply('No quote found.').code(404);
  }
  //removes one quote from the array, with the ID that was passed in the request parameters
  quotes.splice(req.params.id, 1);
  reply(true);
}


//********* DATA array quotes[] *********
var quotes = [
  {
    author: 'Audrey Hepburn'
  , text: 'Nothing is impossible, the word itself says \'I\'m possible\'!'
  }
, {
    author: 'Walt Disney'
  , text: 'You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you'
  }
, {
    author: 'Unknown'
  , text: 'Even the greatest was once a beginner. Don\'t be afraid to take that first step.'
  }
, {
    author: 'Neale Donald Walsch'
  , text: 'You are afraid to die, and you\'re afraid to live. What a way to exist.'
  }
];
