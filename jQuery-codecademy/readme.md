[#Codecademy | jQuery](http://www.codecademy.com/en/tracks/jquery)

As I follow this 3 hour tutorial on learning jQuery, I'll add useful notes below as I'm learning and commented code snippets to the repository.

**Note:** All code examples in the .js files in this repository belong to [Codecademy](http://www.codecademy.com/).

##Notes from Codecademy jQuery course
>jQuery is a library, or set of helpful add-ons, to the JavaScript programming language.

* To add your jQuery script to your HTML file, add `<script type="text/javascript" src="ScriptNameHere.js"></script>` to your `<head>`
* Targeting elements in jQuery is done in the same way as CSS elements, but wrapped in quotes. So to target a class of 'button': `$('.button').someAction`
* Breaking down `$(document).ready(something);`:
  * `$()` lets jQuery know it needs to pay attention
  * `document` in the brackets means that whatever will happen will happen to the whole HTML document
  * `.ready()` means that as soon as what's in previous brackets has loaded (in this case it's `$(document)`), it will carry out `something`

* Functions used:
  * `$('div').mouseenter(function(){ //dosomething})` - function is carried out when div is moused over
  * `$('div').mouseleave(function(){ //dosomething})` - function is carried out when mouse leaves div area
  * `$('div').fadeTo(speed, opacity)` - speed can be in milliseconds (numerical, such as 10000) or 'fast' and 'slow', opacity can be a decimal representing a percentage
