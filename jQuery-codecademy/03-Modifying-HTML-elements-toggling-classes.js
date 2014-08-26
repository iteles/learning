$(document).ready(function(){
    //when div with the ID of 'text' is clicked on with the mouse
    $('#text').click(function(){

        //the 'highlighted' class is first added to the #text div
        // and then removed with the next mouse click, then added again, & so on
        $(this).toggleClass('highlighted');

        //of course we could just use .addClass() or .removeClass() if we just
        //wanted to do one or the other for example, without the toggling
    });
});
//
// ******** HTML ********
// <!DOCTYPE html>
// <html>
//     <head>
// 		<title>Highlights</title>
//         <link rel='stylesheet' type='text/css' href='stylesheet.css'/>
//         <script type='text/javascript' src='script.js'></script>
// 	</head>
// 	<body>
//         <div id="title" class="highlighted">I\'m highlighted!</div>
//         <div id="text">Highlight me, too!</div>
// 	</body>
// </html>
// ******** /HTML ********
//
// ******** CSS ********
// #title {
//     background-color: #C02942;
//     border-radius: 5px;
//     text-align: center;
//     font-family: Verdana, Arial, Sans-Serif;
//     color: #FFFFFF;
//     width: 200px;
//     height: 25px;
// }
// 
// #text {
//     background-color: #0B486B;
//     border-radius: 5px;
//     text-align: center;
//     font-family: Vivaldi, Cursive;
//     color: #FFFFFF;
//     width: 200px;
//     height: 25px;
// }
//
// .highlighted {
//     -webkit-box-shadow: 0 0 8px #FFD700;
//     -moz-box-shadow: 0 0 8px #FFD700;
//     box-shadow: 0 0 8px #FFD700;
//     cursor:pointer;
// }
// ******** /CSS ********
