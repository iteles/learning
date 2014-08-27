#[Codecademy | jQuery](http://www.codecademy.com/en/tracks/jquery)

As I follow this 3 hour tutorial on learning jQuery, I'll add useful notes below as I'm learning and commented code snippets to the repository.

**Note:** All code examples in the .js files in this repository belong to [Codecademy](http://www.codecademy.com/).

The [jQuery documentation](http://api.jquery.com/) is the best source of information on jQuery.

##Notes from Codecademy jQuery course
>jQuery is a library, or set of helpful add-ons, to the JavaScript programming language.

* To add your jQuery script to your HTML file, add `<script type="text/javascript" src="ScriptNameHere.js"></script>` to your `<head>`
* Targeting elements in jQuery is done in the same way as CSS elements, but wrapped in quotes. So to target an ID of 'button': `$('#button').someAction`
  * Also similarly to CSS, you can target multiple elements together (here, all elements with a class of pink or red):`$('.pink, .red').someAction`

* Breaking down `$(document).ready(something);`:
  * `$()` lets jQuery know it needs to pay attention
  * `document` in the brackets means that whatever will happen will happen to the whole HTML document
  * `.ready()` means that as soon as what's in previous brackets has loaded (in this case it's `$(document)`), it will carry out `something`

* Event handlers used:
  * `$('div').mouseenter(function(){ //dosomething})` - event is carried out (& stays that way) when div is moused over
  * `$('div').mouseleave(function(){ //dosomething})` - event is carried out when mouse leaves div area
  * `$('div').hover(function(){}, function(){})` - event is carried out only when mouse is hovering over the div, event stops happening when it's moved away. It **holds two functions**, the first for what happens when we mouse over the div and the second for what happens when we move away
  * `$('div').click(function(){ //dosomething})` - event is carried out when mouse clicks on div
  * `$('div').dblclick(function(){ //dosomething})`- event is carried out when mouse double clicks on div
  * The `.keydown()` event is triggered whenever a key on the keyboard is pressed (only works when an element has focus)
  * `$('div').on(function(){ //dosomething})` is essentially a 'general purpose' environment, where the syntax is:
```javascript
  $(document).on('event', 'selector', function() {
      //Do something, can also use the $(this) selector here
  });
```



###Using `$this`
Whenever you have an event handler (like `.click()` or `.mouseenter()`), something that refers to an action taking place, you can then call the actual event (like `fadeTo()` for example) on the `this` keyword.
So for example, in the code below, _only the single div you click on_ will fade out. All the others will be left intact.
```javascript
$(document).ready(function() {
    $('div').click(function() {
        $(this).fadeOut('slow');
    });
});
```


###Functions used
* `$('div').fadeTo(speed, opacity)` - speed can be in milliseconds (numerical, such as 10000) or 'fast' and 'slow', opacity can be a decimal representing a percentage
* `$('div').fadeOut(speed)`
* `$('div').slideToggle(speed)` - animates the height of the div, so for a div of height 300px set to display:none in the CSS, this will show the div by sliding it out (see jQuery documentation for more options)
* `$('div').append(something)` inserts 'something' as the last child of the div
* `$('div').prepend(something)` inserts 'something' as the first child of the div
* `$('div').after('<p>Text</p>')` inserts the paragraph of text directly _after_ specified div (in this case _every_ div, you could also specify a class or ID for example)
* `$('div').before('<p>Text</p>')` inserts the paragraph of text directly _before_ the specified div
* `$('ol').empty()` deletes an the `ol`'s content **and** _all its descendants' contents_ - so all of the `li`s as well
* `$('p').remove()` deletes the element <p> tags as well as all the contents of the <p> elements
* `$('div').addClass('className')` adds the class 'className' to the <div> element
* `$('div').removeClass('className')` deletes the class 'className' to the <div> element
* `$('div').toggleClass('className')` toggles the class 'className' on and off on the <div> element depending on the event handler that surrounds this statement (for example, if this was wrapped inside a `.click()` event handler as per the example, it would be toggled by clicking inside the div with the mouse)
* `$('div').focus(something)` does whatever that _something_ is (like [change the colour of the focus using CSS](#css)) when the focus is on that div (for example when the mouse is clicked on it or it is tabbed to)
* `$('div').animate(animation, time)` takes two inputs: the animation to perform, and the time in which to perform the animation, e.g. `$('div').animate({left:'+=10px'},500);` (add 10px to the left margin throughout a 500ms time period)


<a name="css"/>
####Changing CSS styles with jQuery
```javascript
$(document).ready(function(){
    $('div').height("200px"); //changes height
    $('div').width("200px"); //changes width
    $('div').css("border-radius", "10px"); //can be used to change any CSS property
});
```


###Miscellaneous
* One can pick up on a form `input` field using it's name and the `val()` function: `var input = $('input[name=checkListItem]').val();`



###jQuery UI
To include jQuery UI, add the following <script> tag to your HTML document's <head>: ` <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>`

The [jQuery UI documentation](http://jqueryui.com/) is especially useful. Various examples of jQuery UI effects can be found in this repository in the [06-jQuery-UI-multiple-examples.js](https://github.com/iteles/learning/blob/master/jQuery-codecademy/06-jQuery-UI-multiple-examples.js) and the accordion menu effect in [07-jQuery-UI-accordion-menu.js](https://github.com/iteles/learning/blob/master/jQuery-codecademy/07-jQuery-UI-accordion-menu.js).
