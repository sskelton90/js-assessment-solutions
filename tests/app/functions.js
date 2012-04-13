define([ 'use!underscore' ], function(_) {
  describe("functions", function() {
    var sayIt = function(greeting, name, punctuation) {
          return greeting + ', ' + name + (punctuation || '!');
        },
        fn = function() {};

    it("you should be able to use an array as arguments when calling a function", function() {
      fn = function (ar) {
        return sayIt(ar[0], ar[1], ar[2]);
      };
      var result = fn([ 'Hello', 'Ellie', '!' ]);
      expect(result).to.be('Hello, Ellie!');
    });

    it("you should be able to change the context in which a function is called", function() {
      var speak = function() {
            return sayIt(this.greeting, this.name, '!!!');
          },
          obj = {
            greeting : 'Hello',
            name : 'Rebecca'
          };
      
      fn = function() {
        return speak.call(obj);
      };
      // define a function for fn that calls the speak function such that the
      // following test will pass
      expect(fn()).to.be('Hello, Rebecca!!!');
    });

    it("you should be able to return a function from a function", function() {
      // define a function for fn so that the following will pass
      fn = function(a) {
        return function(b) {
          return sayIt(a, b);
        };
      };
      expect(fn('Hello')('world')).to.be('Hello, world!');
    });

    it("you should be able to create a 'partial' function", function() {
      // define a function for fn so that the following will pass
      fn = function (func, w1, w2) {
        return function(punc) {
          return func(w1, w2, punc);
        };
      };
      var partial = fn(sayIt, 'Hello', 'Ellie');
      expect(partial('!!!')).to.be('Hello, Ellie!!!');
    });
  });
});
