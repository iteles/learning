//accordion menu effect, uses HTML below and already comes with some built in styles


$(document).ready(function(){

    //'collapsible' set to true means all sections can be closed at once
    //there are many other options available: http://api.jqueryui.com/accordion/
    $('#menu').accordion({collapsible: true});
});


// ******** HTML ********
// <!DOCTYPE html>
// <html>
//     <head>
// 		<title></title>
//         <link rel='stylesheet' type='text/css' href='http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css'/>
//         <script type='text/javascript' src='script.js'></script>
//         <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
// 	</head>
// 	<body>
//         <div id="menu">
//             <h3>Section 1</h3>
//             <div>
//                 <p>I'm the first section!</p>
//             </div>
//             <h3>Section 2</h3>
//             <div>
//                 <p>And I'm the second.'</p>
//             </div>
//             <h3>Section 1</h3>
//             <div>
//                 <p>I'm the last!</p>
//             </div>
//
//         </div>
// 	</body>
// </html>
// ******** /HTML ********
