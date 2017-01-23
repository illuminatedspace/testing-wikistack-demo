Intro
=====

Informal to Formal Testing
--------------------------

We all test our code *informally* to find out if we have implemented the correct functionality. The easiest way to do this is with `console.log()`

```js

let arr = [1, 2, 3];
arr.push(4)
console.log(arr); // expect [1, 2, 3, 4]
```

`Example: 1-logging.js`

This works for ensuring some basic functionality, but it mixes the code and the tests together, and isn't a great solution for long term testing. For that, we might have a seperate test file and use Node's built in `assert` library.

Assert
------

```js
assert(true);  // returns undefined 
assert(false); // throws AssertionError
```

This is the core of `assert` - it is simply a function that returns undefined (does nothing, continues running) if what you are asserting is truthy, otherwise throws an error (if not caught, ends program early)

Assert actually has a little more built-in functionality to make working with different types of data easier, but everything ultimately boils down to `assert(true/false)`

```js
assert.equal(1, 1);
assert.equal(1, '1'); // by default not strict (x == y)
assert.strictEqual(1, '1'); // fails because 1 !== '1'
assert.equal([1, 2, 3], [1, 2, 3]); // FAILS! Why?
// non-primitives need a 'deep' compare. We don't care that they are the same array (they aren't!) 
// but rather that all primitives contained in the arrays are identical (they are)
assert.deepEqual([1, 2, 3], [1, 2, 3]);
```

`Example: 2-example.js, 2-example.spec.js`

Core Topics
-----------
* Mocha - a test runner
* Chai - an assertion library
* Unit Tests - a written test confirming a specific 'unit' of functionality
* Service Tests - a written test confirming integration across multiple pieces of software (the DB + routers, for example)
* TDD + BDD - testing 'philosophies'

By why do 'formal' testing with tools like Mocha and Chai?

Q: Why do we even write tests?

A: This is actually a tricky one because testing is something that varies in importance from project to project, company to company. Testing can be useful for a few reasons:

1. it is a living record of what currently works 
    - software projects can go through many developers over many years, and tests are a valuable form of documentation and reassurance about 'what works'

2. Isolate the problem
    - problems can sometimes arise from many places and it's difficult to isolate the bug. Testing is a way of feeling reasonably confident a certain part of the code is not the problem

3. Regression Testing
    - testing can insure you aren't *reintroducing* a formely squashed bug. If a given bug was hard to find that one time, wouldn't it be nice if you knew the next time it popped up?

As software projects grew massive in size (+100k lines), it became clear that testing, early and often, was the only way to create maintainable software projects.

Setup
=====

Download Dependencies
---------------------

```sh
npm install --save-dev mocha chai
```

or, if you're using `yarn`

```sh
yarn add mocha chai --dev
```

Downloads mocha and chai into `node_modules` directory, and adds a reference to each in `package.json` under the `devDependencies` key.


> `devDependencies` & `dependencies` are functionally identical, and calling `npm install` downloads *all* dependencies, however it is a nice form of documentation to seperate true dependencies from dependencies only used in your dev environment.

Add a test script to `package.json`
----------------------------------
package.json
```json
{
  ...,

  "scripts" {
    "test": "mocha" // optional " --watch"
  }
}
```

Create a `test` directory at root, add a *.js file
-----------------------------------------------
By default mocha will look for a directory called `test` at your root and will run all test in files ending in a .js

Is it working?
--------------
`npm test` should run, showing `0 passing` tests

Standard Unit Testing
=====================

> Definition: A unit test is a test that a specific function has correct behavior (expected input => expected output). Unit tests want to test *just* that function, so everything that function relies on is usually 'mocked' - i.e. instead of reading from a database like our app does, we would just hardcode some input. This is done to isolate this function and test *it and only it*

`Mocha`, `Describe()` and `it()`
--------------------------------

`describe()` is provided by Mocha (the test runner) and it allows us to nest tests inside of each other. This is purely for the purposes of organization.


```js
describe('The cat', function () {
  
  describe('can make sounds', function () {

  });

  describe('eats', function () {
  
  });
});
```

Try running `npm test`. No change, huh? Well, it's because we haven't written an *actual* test yet. We do that with the `it` function.

```js
describe('The cat', function () {
  
  describe('can make sounds', function () {
    it('meow')
    it('purr')
  });

  describe('eats', function () {
    it('mice')
  });
});
```

Run  `npm test` again. We should see output like

```sh
the cat
    can make sounds
      - meow
      - purr
    eats
      - mice

  0 passing (6ms)
  3 pending
```

`Describe` nests our 'test groups', `it` asserts a test is true. However it needs a callback to fail or pass

```js    
describe('can make sounds', function () {
  it('meow', function () {

  })
  
  it('purr', function () {
    throw Error('hello')
  })
});
```

As long as our test has a function callback which **doesn't** throw an Error, it passes. If it does throw an Error, it fails.

This is actually all you need for a test runner, but test runners are commonly used in conjunction with an assertion library.

`Node` actually has a built-in `assert` function.

```js
> assert(true)
undefined
> assert(false)
AssertionError: false == true
```

if we wrote our own `assert` it might look like this 

```js
function assertEqual (x, y) {
  if (x !== y) {
    throw Error(`NotEqualError, ${x} !== ${y}`);
  }
}
```

and we'd use it in our tests like so 

```js
describe('can make sounds', function () {
  it('meow', function () {
    assertEqual(1, 2); // throws error, fails
  })

  it('purr', function () {
    assertEqual(1, 1); // no error, passes
  })
});
```

> If there's multiple assertions, they need to all pass for a test to pass. Think about it, if just one assertion throws an error the test fails.

So assertEqual is nice, but sometimes it's preferable to have a more expressive *library* of asserrtion-style functions. For that we turn to `Chai`.

Assertion libraries and `Chai`
-----------------------------

If you go to the [Chai website](http://chaijs.com/) you'll see that Chai actually comes in flavors

### Should
```js
chai.should();

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
tea.should.have.property('flavors')
  .with.lengthOf(3);
```

### Expect
```js
var expect = chai.expect;

expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(tea).to.have.property('flavors').with.lengthOf(3);
```

> The `.to` and `.have` 'chaining' properties generally don't do anything but make the test sound more like english

### Assert
```js
var assert = chai.assert;

assert.typeOf(foo, 'string');
assert.equal(foo, 'bar');
assert.lengthOf(foo, 3)
assert.property(tea, 'flavors');
assert.lengthOf(tea.flavors, 3);
```

We use the `expect` flavor of Chai in the workshop text and solutions, but feel free to try them all out. Personally I prefer `assert` because I can't stand those `.have.to` and `.be.a` properties in `expect` and `should`. Ultimately they are all equivalent, but you will see the `expect` style throughout the curriculum.

`expect` example
----------------

```js
var expect = require('chai').expect;

describe('Testing suite capabilities', function () {
  
  it('confirms basic arithmetic', function () {
    expect(2 + 2).to.equal(4);
  });

  it("'can deal with approximate' values", function () {
    expect(Math.sqrt(2)).to.be.closeTo(1.42, .01);
  });

  it("has some very fancy assertion functions", function () {
    expect({ foo: 1, bar: 2, baz: 3 }).to.contain.all.keys(['bar', 'foo']);
    expect([ 1, 2, 3 ]).to.have.length.within(2, 4);
  });
});
```

The [expect API](http://chaijs.com/api/bdd/) is large and you can find a lot of cool functions there. Personally I tend to stick to simple statements like `expect(A).to.equal(B)` most of the time. 

More features
=============

Before, BeforeAll, After, AfterAll 
----------------------------------

These are 'hooks' that run within the scope of a describe block. Very common for setup and teardown. BeforeAll is most common of all.

```js
describe('A Cat', function () {
  var c;

  // every test at this level or below will be dealing with a brand new Cat. This is helpful for isolating the test cases
  beforeEach(function () {
    c = new Cat();
  });

  describe('can make the sounds', function () {
    it('meow', function () {
      expect(c.meow()).to.equal('meow')
    })
    it('purr', function () {
      expect(c.purr()).to.equal('purr')
    })
  });
});
```

Async tests
-----------

any callback function in a beforeAll, describe, it can take an optional 'done' parameter. If this parameter is specificed it means the test won't move on until you've explicitly called done()

```js
describe('Connection', function() {
  var db = new Connection,
    tobi = new User('tobi'),
    loki = new User('loki'),
    jane = new User('jane');

  beforeEach(function(done) {
    db.clear(function(err) {
      if (err) return done(err);
      db.save([tobi, loki, jane], done);
    });
  });

  describe('#find()', function() {
    it('respond with matching records', function(done) {
      db.find({type: 'User'}, function(err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
});
```

But it gets better! Mocha works nicely with Promises, so if you're async function returns a promise, there's no need for the done keyword.

```js
describe('Connection', function() {
  var db = new Connection,
    tobi = new User('tobi'),
    loki = new User('loki'),
    jane = new User('jane');

  beforeEach(function() {
    db.clear()
      .then(function () {
        db.save([tobi, loki, jane]);
      })
    });
  });

  describe('#find()', function() {
    it('respond with matching records', function() {
      db.find({type: 'User'})
        .then(function (res) {
          res.should.have.length(3);
        });
      });
    });
  });
});
```

Exclude / Include tests
-----------------------

Skip a describe block or specific test 

the old way

```js
// describe -> xdescribe, skips all nested tests
xdescribe('a test block', function () {
  it('test 1', function () { ... })
  it('test 2', function () { ... })
})

describe('another block', function () {
  // it -> xit, skips just this test
  xit('test 3', function () { ... })
  // test 4 will still run
  it('test 4', function () { ... })
})
```

the new way

```js
// describe -> describe.skip, skips all tests tests
describe.skip('a test block', function () {
  it('test 1', function () { ... })
  it('test 2', function () { ... })
})

describe('another block', function () {
  // it -> it.skip, skips just this test
  it.skip('test 3', function () { ... })
  // test 4 will still run
  it('test 4', function () { ... })
})
```

BONUS - `.only`!

```js
// only runs tests in this describe block
describe.only('a test block', function () {
  it('test 1', function () { ... })
  it('test 2', function () { ... })
})
```

```js
describe('another block', function () {
  // only test 3 will run
  it.only('test 3', function () { ... })
  it('test 4', function () { ... })
})
```

> You can actually have more than one it/describe.only()




Terminology
===========

TDD
---
The idea behind *Test-Driven Development* is simple but profound. 'Traditional' testing works like this

Traditional
1. Think of some functionality you want to add
2. implement the functionality
3. write a test to see if it works, if fails, GOTO 2

Whereas **TDD** works like this

1. Think of some functionality you want to add
2. define a test set *first*
3. make the tests fail
3. implement the functionality
4. verify that the implementation makes the tests succeed, otherwise GOTO 3

***(could use example)***

**TDD** asks you to think of what you are trying to do in terms of a 'specification' of tests, and then you iterate on your code until it passes said specifications. This forces you to define your requirements *before* attempting an implementation.

**BDD, or Behavior Driven Development** takes this a step farther and asks you to consider the specification in terms of business needs or a 'user story'.

```
Story: Returns go to stock

As a store owner
In order to keep track of stock
I want to add items back to stock when they're returned.

Scenario 1: Refunded items should be returned to stock
Given that a customer previously bought a black sweater from me
And I have three black sweaters in stock.
When he returns the black sweater for a refund
Then I should have four black sweaters in stock.

Scenario 2: Replaced items should be returned to stock
Given that a customer previously bought a blue garment from me
And I have two blue garments in stock
And three black garments in stock.
When he returns the blue garment for a replacement in black
Then I should have three blue garments in stock
And two black garments in stock.
```

which could roughly translate into code as 

```js
describe('As a store owner', function () {
  describe('In order to keep track of stock', function () {
    describe("I want to add returned items back to stock", function () {
      it ("Refunded items should be returned to stock", function () {
        ...
      }); 

      it ("Replaced items should be returned to stock", function () {
          ...
      }); 
    });
  });
});
```

Personally, I think tests are just another tool for a developer, and they should be used when it's deemed useful. I often find testing to be more pain than it is worth when prototyping, as it's true value shines in large, maintained code bases.