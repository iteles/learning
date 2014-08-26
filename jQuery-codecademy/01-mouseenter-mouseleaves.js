//Description: An HTML button originally set to 0.5 opacity with CSS,
//now fades up to 100% opacity when moused over & back to 50% opacity
//when mouse moves off the button


//first bracket refers to element that action will be performed on as soon as it is `.ready()`
//in this case, it's the whole document
$(document).ready(function(){

    //mouseenter used for mouseover
    $('div').mouseenter(function(){
        //fadeTo - first argument is speed, second argument is opacity
        $('div').fadeTo('fast', '1');
    });

    //when mouse leaves the area of the div
    $('div').mouseleave(function(){
        $('div').fadeTo('fast', '0.5');
    });
});

// ******** HTML ********
// <html>
// 	<head>
// 		<title>Button Magic</title>
//         <link rel='stylesheet' type='text/css' href='stylesheet.css'/>
//         <script type="text/javascript" src="script.js"></script>
// 	</head>
// 	<body>
//      <div><br/><strong>Click Me!</strong></div>
// 	</body>
// </html>
// ******** /HTML ********
//
// ******** CSS ********
// div {
//     height: 60px;
//     width: 100px;
//     border-radius: 5px;
//     background-color: #69D2E7;
//     text-align: center;
//     color: #FFFFFF;
//     font-family: Verdana, Arial, Sans-Serif;
//     opacity: 0.5;
// }
// ******** /CSS ********
