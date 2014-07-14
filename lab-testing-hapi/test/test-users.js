//This will test the users aspect of our mock social network API

var Lab = require("lab");

var server = require("../"); //requires our index.js file which contains our server

//.experiments sets up the enclosure for our tests, similar to 'describe' in mocha
Lab.experiment("Users", function() {
    Lab.test("main endpoint lists usernames on the network", function(done) {
    var options = {
        method: "GET",
        url: "/users"
    };

    //server.inject lets you simulate HTTP requests on the server without actually having
    //to start the server itself (running node index.js)
    server.inject(options, function(response) {
        var result = response.result;

        Lab.expect(response.statusCode).to.equal(200);
        Lab.expect(result).to.be.instanceof(Array);
        Lab.expect(result).to.have.length(5);

        done(); //required to signal the end of the test
    });
}); //end of Lab.test

//test case for adding a new user through the PUT route for users/{username}
    Lab.test("creating a new user correctly", function(done) {
      var options = {
        method: 'PUT',
        url: "/users/newtestuser",
        payload: {
          full_name: "newtestuser",
          age: 23,
          image: "dhown783hhdwinx.png"
        }
      };

      server.inject(options, function(response) {
        var result = response.result;
        var payload = options.payload

        Lab.expect(response.statusCode).to.equal(200);
        Lab.expect(result.full_name).to.equal(payload.full_name);
        Lab.expect(result.age).to.equal(payload.age);
        Lab.expect(result.image).to.equal(payload.image);
        Lab.expect(result.count).to.equal(0);

        done();
      });
    }); //end of Lab.test

//new test for invalid user
Lab.test("creating an invalid new user", function(done) {
  var options = {
    method: 'PUT',
    url: "/users/{username}/newtestuser",
    payload: {
      full_name: "newtestuser",
      age: 23,
      image: "dhown783hhdwinx.png"
    }
  };

  server.inject(options, function(response) {
    var result = response.result;
    var payload = options.payload

    Lab.expect(response.statusCode).to.equal(404);
    Lab.expect(result.full_name).to.equal(undefined);
    Lab.expect(result.age).to.equal(undefined);
    Lab.expect(result.image).to.equal(undefined);

    done();
  });
}); //end of Lab.test

//new test for deleting a user
Lab.test("deleting an existing user", function(done) {
  var options = {
    method: 'DELETE',
    url: "/users/lighthue"
  };

  server.inject(options, function(response) {
    var result = response.result;
    
    Lab.expect(response.statusCode).to.equal(200);
    Lab.expect(result).to.equal("success");
    Lab.expect(result.full_name).to.equal(undefined);
    Lab.expect(result.age).to.equal(undefined);
    Lab.expect(result.image).to.equal(undefined);

    done();
  });
}); //end of Lab.test

}); //end of Lab.experiment
