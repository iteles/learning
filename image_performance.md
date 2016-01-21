# Image Performance at London Web
> Talk by [Grant Kemp](http://www.twitter.com/ukandroid)

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Great talk so far from <a href="https://twitter.com/ukandroid">@ukandroid</a> on Image performance at London Web! <a href="https://t.co/hdJWFWRNbg">pic.twitter.com/hdJWFWRNbg</a></p>&mdash; Ines Teles (@iteles) <a href="https://twitter.com/iteles/status/690256222315003904">January 21, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


Images:
+ Activate and sell
+ Build brand with visitors
+ Make people buy (if an image isn't good enough, people don't bother)

### Problem 2: Creating images is complicated and expensive

### Problem 3: So Many Devices
+ We need to give people a consistently good experience:
  + 1-2 seconds to load the page
  + 40% bounce rate in 3 seconds is the worst bounce rate you should ever have


## Do you need to work on your images?
1. Check `Site Speed` report (answers the question 'Is there an image problem?')
2. Look at `Page Timings`
3. Look at `Google Page Speed` (there's an API so you can include it in your
builds) - anything below a page speed score of 60 is really bad and needs urgent
attention

## Strategies to Improve Image Performance
+ 1 image source for all devices and optimise size and format automatically (for each device _browser_)
  + A service like Cloudinary programatically changes the file based on the URL (video demo on the cloudinary website)
+ Use one workflow for images
  + For fast delivery, hire out a CDN to make sure that the image is stored as close to the end user as possible (a lot of the solutions out there use this)
  
![img_7564](https://cloud.githubusercontent.com/assets/4185328/12497825/1eb1c7a2-c096-11e5-84dd-2d2aa895c78d.jpg)

+ Use the right image for each platform (understand the user agent)
  + E.g. use WEBP for Android instead of serving a PNG as it'll be almost a third of the size
  + Mozilla just brought out MozJPG for example
+ Use the right size image

Examples of image optimisation tools:
  + Akamai (enterprise)
  + Cloudinary
  + imgix
  + Scene7
  + Build your own bespoke open source solution using ImageMagick

**The New New Thing: Responsive Encompassing Server Side (RESS)**
+ Allows you to intelligently serve these images
  + Basic level is customising based on the user agent
  
  
### Great example  
Look up http://uk.lush.com - they've been using image optimisation tools for 2 years so they've now centred their entire website on images, but still have a 1.2 second page load time. They also do a few other things like lazy loading.

**Tip:** Grant is currently working in the studio with the photographers so that they can immediately load the photos into a prototype of the website for approval

Look into: <picture> tags