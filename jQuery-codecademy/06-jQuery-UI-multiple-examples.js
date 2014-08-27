//Snippets using jQuery UI

//explode effect
$(document).ready(function(){
    $('div').click(function(){
        $(this).effect('explode');
    });
});

//bounce effect, including number of bounces of certain period of time
$(document).ready(function(){
    $('div').click(function(){
        $(this).effect('bounce', {times:3}, 500);
    });
});

//slide into view
$(document).ready(function(){
    $('div').click(function(){
        $(this).effect('slide');
    });
});


//.draggable() lets you click on the element and drag it anywhere on the page!
$(document).ready(function(){
    $('#car').draggable();
});

//As it says on the tin, .resizable() lets you click and resize the div
$(document).ready(function(){
    $('div').resizable();
});

//.selectable() essentially add a temporary class of 'ui-selected' to one
//element at a time (the one you clicked on) - you also need to make sure you
//add the CSS styles for this class (e.g. below)
$(document).ready(function(){
    $('ol').selectable();
});
  //CSS for this was:
  // ol .ui-selected {
  // 	background: #F39814; color: white;
  // }

//.sortable() lets you drag and drop <li> items to rearrange them as you see fit!
$(document).ready(function(){
    $('ol').sortable();
});
