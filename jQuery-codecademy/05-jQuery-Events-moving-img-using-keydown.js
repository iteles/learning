//animates a little image by moving it 10px to the left
//(away from the left margin) when a key is pressed
//Note the focus has to be on it so you must click into the window it is open in first

$(document).ready(function() {
    $(document).keydown(function(key) {
        switch(parseInt(key.which,10)) {
			// Left arrow key pressed (translates to the number 37 for the machine)
			case 37:
				$('img').animate({left: "-=10px"}, 'fast');
				break;
			// Up Arrow Pressed
			case 38:
				$('img').animate({top: "-=10px"}, 'fast');
				break;
			// Right Arrow Pressed
			case 39:
				$('img').animate({left: "+=10px"}, 'fast');
				break;
			// Down Array Pressed
			case 40:
				$('img').animate({top: "+=10px"}, 'fast');
				break;
		}
	});
});

// ******** HTML ********
// <!DOCTYPE html>
// <html>
//     <head>
//     	<title>Super Mario!</title>
//         <link rel='stylesheet' type='text/css' href='stylesheet.css'/>
// 		<script type='text/javascript' src='script.js'></script>
// 	</head>
// 	<body>
//         <img src="http://i1061.photobucket.com/albums/t480/ericqweinstein/mario.jpg"/>
// 	</body>
// </html>
// ******** /HTML ********
//
// ******** CSS ********
// img {
//     position: relative;
//     left: 0;
//     top: 0;
// }
// ******** /CSS ********
