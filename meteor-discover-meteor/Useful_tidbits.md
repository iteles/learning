Using Meteor.users as our collection.
Remember that to start your Mongo shell you use `meteor mongo` in the terminal whilst your server is running

**Finding one user (any one)**
```javascript
//in console
Meteor.users.findOne();

//in Mongo shell
db.users.findOne()
```

* Counting the number of users:
```javascript
//in console
Meteor.users.find().count();

//in Mongo shell
db.users.count()
```

* `Meteor.user()` is _true_ if the user is logged in
* [`Meteor.loggingIn()`](https://docs.meteor.com/#/full/meteor_users) is _true_ if a login process is currently underway (useful for things like knowing not to display an 'access denied' sign for a not-logged-in user when the user is in actual fact already in the process of logging in) - p.119

##Spacebars tidbits
* `currentUser` is the Spacebars equivalent of `Meteor.user()` and is _true_ if the user is logged in
  * It's provided by the `accounts` package
