var Joi = require('joi');
// var schema = Joi.object().keys({
//     query: Joi.string(),
//     payload: Joi.string().min(3).required()
// });

//Check ->hellovalidate.js for syntax: Joi.validate(param.query, schema, function (err, value){if(err){console.log('There was a validation error Ines: '+err.message)}})

//currently no validation
module.exports = [
    { method: 'GET', path: '/products', config: { handler: getProducts, validate: { params: { query: Joi.string() } } } },
    { method: 'GET', path: '/products/{id}', config: { handler: getProduct } },
    { method: 'POST', path: '/products', config: { handler: addProduct, validate: { params: { payload: Joi.string().min(3).required()} } } }
];

//using the validation method below rather than joi would require 'hapi.types' -> var Types = require('hapi').types;
//validate for first GET method ', validate: { query: { name: Types.String() } }'
//validate for POST method ', validate: { payload: { name: Types.String().required().min(3) } }'


//ADDING THE HANDLERS used in the routes that are exported above
function getProducts(request) {

//allowing a query string parameter name
//if the query string parameter exists, we pass the name to findProducts and return the result of that
//which is a list of filtered products by that name
    if (request.query.name) {
        //request.reply is hapi's simple way to add a response body
        request.reply(findProducts(request.query.name));
    }
    else {
        request.reply(products);
    }
}

//is passed a name & returns a filtered list of products with that name
function findProducts(name) {

    return products.filter(function(product) {
        return product.name.toLowerCase() === name.toLowerCase();
    });
}

function getProduct(request) {
    //filters the products array for the product with an ID identical to what has been passed in
    var product = products.filter(function(p) {
        //returns the product ID which is identical to the ID passed in throught the URL
        return p.id === parseInt(request.params.id);
    }).pop(); //why pop? I don't understand why it's removing the last element from products[]

    request.reply(product);
}

function addProduct(request) {

    var product = {
        //gives it an ID of + 1 more than the last ID existing in the products array
        id: products[products.length - 1].id + 1,
        name: request.payload.name
    };

    products.push(product);

    request.reply(product).code(201).header('Location,: /products/' + product.id);
}



//Adding a small array of products
var products = [{
        id: 1,
        name: 'Guitar'
    },
    {
        id: 2,
        name: 'Banjo'
    }
];
