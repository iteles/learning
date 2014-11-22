//In lib folder to ensure that permissions are loaded first

//check that the current user is the owner of the document
ownsDocument = function(userId, doc){
  return doc && doc.userId === userId;
};
