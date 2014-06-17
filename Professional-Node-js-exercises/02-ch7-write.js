var fs = require('fs');

//opening the file with an 'a' flag opens the file for writing
fs.open('./example.txt', 'a', function opened(err, fd){
	if(err) {throw err;}

	//writeBuffer contains the text that will be added to teh file
	var writeBuffer = new Buffer ('writing some new text to the buffer');
		bufferPosition = 0;
		bufferLength = writeBuffer.length;
		filePosition = null; //not needed as opening the file with an 'a' flag positions the stream at the end of the file

	fs.write (fd, writeBuffer, bufferPosition, bufferLength, filePosition,
		function wrote(err, written){ //callback is invoked either after file is written to or if there is an error
			if(err) {throw err;}

			//writes to the console if the file is successfully written to
			console.log('wrote '+written+' bytes to the file.')
		})

})