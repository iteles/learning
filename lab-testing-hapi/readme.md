##Learning to test [Hapi](https://github.com/spumko/hapi) with [Lab](https://github.com/spumko/lab)

I have used the tutorial example from [Testing Hapi Services with Lab](https://medium.com/the-spumko-suite/96ac463c490a) with _heavy_ backup from [@nelsonic](https://twitter.com/nelsonic)'s [Testing with Lab](https://github.com/nelsonic/learn-hapi#testing-with-lab) to understand the finer points of Lab and how testing works.  

####Key points
A few key things that will need to be remembered in future when using Lab and are relatively easy to forget:
* Add the following _scripts_ section to your `package.json` so that lab can be found when you run `npm test` from the command line:
```json
"scripts": {
  "test": "./node_modules/lab/bin/lab -c"
},
```
  * The `-c` enables code coverage for lab, so it will automatically tell you your percentage of code coverage when you run `npm test`
* If we change this to the following as per [@nelsonic's Time app](https://github.com/nelsonic/time/blob/master/package.json), we can then open the test/coverage.html document to see exactly what is covered by the tests and what isn't:
```json
  "scripts": {
    "test": "./node_modules/lab/bin/lab -c && ./node_modules/lab/bin/lab -r html -o ./test/coverage.html"
  },
```
* Using `server.inject` lets you test the code without actually having to start the server every time you want to do so
