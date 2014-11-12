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
