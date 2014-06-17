var fs = require('fs');

//First need to open the file and can then read or write to the file
//open a file with 'r' flag, which opens a text file for reading
//callback function'opened' is invoked once the file is open with the file descriptor 'fd', which is later used to read or write to the open file
fs.open('./example.txt', 'r', function opened(err, fd){ 
	//deal with possible errors straight away
	if(err) {throw err}

	//create a buffer which will be passed to the fs.read function to contain the data to be read
	var readBuffer = new Buffer(1024);
		bufferOffset = 0;
		bufferLength = readBuffer.length;
		filePosition = 100;

	//passes in file descriptor from the file we opened so we know which file to read from
	//readBuffer where the data to be read is to be stored
	//lastly, passes in 'read' callback function which is invoked when there is either an error or something has been read
	//if the read is successful, the 2nd argument of the callback gets the number of bytes read into the buffer
	fs.read(fd, readBuffer, bufferOffset, bufferLength, filePosition,
		function read(err, readBytes){
			if(err) {throw err}
			console.log('just read '+readBytes+ ' bytes');
			
			//if there is something to read it will be read into the readBuffer, so this prints out the contents of the readBuffer
			if (readBytes > 0){
					console.log(readBuffer.slice(0, readBytes));
			}
		});

});