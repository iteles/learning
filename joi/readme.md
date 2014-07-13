##Validating (Hapi) with Joi

[Joi](https://github.com/spumko/joi) is the validation library built by the team that built [Hapi.js](hapijs.com). It was created for use with Hapi although it can be used with any Javascript language.

Using Joi is a two step process, first creating the 'schema' which will define the constraints that the values will be validated against (e.g. username minimum length) and then validating the values using 'Joi.validate()'.

I have taken the example from [https://github.com/spumko/joi#example](https://github.com/spumko/joi#example) and altered it slightly below, adding in a few comments to explain what is going on at each point. Following through this basic example should give you a good idea of the total basics of Joi. [Much more information on the syntac for Joi is available from spumko](https://github.com/spumko/joi).

'''javascript
var Joi = require('joi');

//sets out the schema that the values must match in order to pass validation
//e.g. password length, required or note required fields, etc
var schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email()
});

//these values that will be passed into the schema for validation using joi.validate
//can actually be defined within the validate function in {} in the same format as we've
//done here. I've split them out for readability.
var valuesForValidation = {
   username: 'we',
   birthyear: 1992
}

//validate(value, schema, [options], callback)
Joi.validate(valuesForValidation, schema, function (err, value) {
   //limite the error to just the message otherwise you'll get the details as well
   if(err){console.log(err.message)}
   //nicer to see 'validated' than just get null at this stage!
   else {console.log('Validated!')}
   });  // err === null -> valid
'''
If you haven't done much coding before, don't forget to install Joi first 'npm install joi' (assuming you've installed [npm](https://www.npmjs.org/)) and run your javascript file above using 'node <name-of-file>'.
