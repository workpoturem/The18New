'use strict';

// Dependency-free contract checks. Paddle is mocked: no network or real orders.
// Node: node tests/paddle-checkout.test.js
// macOS without Node (from the18_dev): osascript -l JavaScript tests/paddle-checkout.test.js
function testCheckout(library) {
  var passed = 0;
  function assert(value, message) {
    if (!value) throw new Error(message || 'Assertion failed');
  }
  function equal(actual, expected) {
    assert(actual === expected, String(actual) + ' !== ' + String(expected));
  }
  function test(name, fn) {
    try { fn(); passed += 1; }
    catch (error) { throw new Error(name + ': ' + error.message); }
  }
  function fixture() {
    var nodes = {};
    var doc = {
      getElementById: function (id) { return nodes[id] || null; },
      createElement: function () {
        return { style: {}, setAttribute: function (name, value) { this[name] = value; } };
      },
      body: { appendChild: function (node) { nodes[node.id] = node; } }
    };
    var state = { calls: [], setups: [], failOpen: false, failSetup: false };
    var checkout = { open: function (options) {
      equal(this, checkout);
      state.calls.push(options);
      if (state.failOpen) throw new Error('Private SDK error must not be displayed');
      if (state.returnFalse) return false;
    } };
    state.win = { document: doc, Paddle: {
      Checkout: checkout,
      Setup: function (options) {
        state.setups.push(options);
        if (state.failSetup) throw new Error('Setup failed');
        if (state.rejectSetup) return false;
      }
    } };
    state.error = function () { return doc.getElementById('the18-checkout-error'); };
    return state;
  }

  [901903, '901903', ' 901903 ', '000901903',
    'https://buy.paddle.com/product/901903',
    'https://buy.paddle.com/product/901903/',
    'https://buy-paddle.com/product/901903'
  ].forEach(function (input) {
    test('Product reference: ' + input, function () {
      equal(library.normalizeProductId(input), 901903);
    });
  });

  [null, undefined, '', ' ', 0, -1, 1.5, NaN, Infinity, true, {}, [],
    '901903junk', '9e5', '901903.0', '0x123', '-901903', 'pri_901903',
    'https://evil.example/product/901903',
    'https://buy.paddle.com.evil.example/product/901903',
    'https://buy.paddle.com@evil.example/product/901903',
    'https://user@buy.paddle.com/product/901903',
    'https://buy.paddle.com:443/product/901903',
    'https://buy.paddle.com/product/901903?coupon=changed-price',
    'https://buy.paddle.com/product/901903#something',
    'https://buy.paddle.com/checkout/901903',
    'javascript:alert(1)', 9007199254740992, '9007199254740993'
  ].forEach(function (input, index) {
    test('Reject invalid reference #' + index, function () {
      equal(library.normalizeProductId(input), null);
    });
  });

  test('Buy and Demo remain different products, using overlay', function () {
    var f = fixture();
    var client = library.createCheckout(f.win);
    equal(client.open(901901), true);
    equal(client.open('901903'), true);
    equal(f.calls.length, 2);
    equal(f.calls[0].product, 901901);
    equal(f.calls[1].product, 901903);
    equal(f.calls[0].method, 'overlay');
    equal(f.calls[1].method, 'overlay');
    equal(f.calls[1].successCallback, undefined);
    equal(f.calls[1].price, undefined);
  });

  test('Classic vendor and initialization run exactly once', function () {
    var f = fixture();
    var client = library.createCheckout(f.win);
    equal(library.createCheckout(f.win), client);
    equal(f.win.The18Checkout, client);
    equal(f.setups.length, 1);
    equal(f.setups[0].vendor, 112127);
    equal(f.setups[0].debug, false);
    equal(f.setups[0].successCallback, undefined);
    equal(f.calls.length, 0);
  });

  test('Old compiled bundle uses guarded open with same ID', function () {
    var f = fixture();
    library.createCheckout(f.win);
    var callback = function () {};
    var options = { product: 'https://buy-paddle.com/product/901903',
      method: 'popup', closeCallback: callback, quantity: 1 };
    equal(f.win.Paddle.Checkout.open(options), true);
    equal(f.calls.length, 1);
    equal(f.calls[0].product, 901903);
    equal(f.calls[0].method, 'overlay');
    equal(f.calls[0].closeCallback, callback);
    equal(f.calls[0].quantity, 1);
    equal(options.method, 'popup');
    equal(options.product, 'https://buy-paddle.com/product/901903');
  });

  test('Invalid or missing product never opens another checkout', function () {
    var f = fixture();
    var client = library.createCheckout(f.win);
    equal(client.open(undefined), false);
    equal(f.win.Paddle.Checkout.open(), false);
    equal(f.win.Paddle.Checkout.open({ product: '901903junk' }), false);
    equal(f.win.Paddle.Checkout.open([]), false);
    equal(f.calls.length, 0);
    equal(f.error().role, 'alert');
    equal(f.error().hidden, false);
  });

  test('Missing CDN script is handled by old and new buttons', function () {
    var f = fixture();
    delete f.win.Paddle;
    var client = library.createCheckout(f.win);
    equal(client.open('901903'), false);
    equal(f.win.Paddle.Checkout.open({ product: 901901 }), false);
    equal(f.calls.length, 0);
    equal(f.setups.length, 0);
    equal(f.error().hidden, false);
  });

  test('No Classic Setup (including a Billing-only SDK) fails closed', function () {
    var f = fixture();
    delete f.win.Paddle.Setup;
    f.win.Paddle.Initialize = function () { throw new Error('Must not migrate'); };
    equal(library.createCheckout(f.win).open(901903), false);
    equal(f.calls.length, 0);
    equal(f.error().hidden, false);
  });

  test('Setup exception never opens a checkout', function () {
    var f = fixture();
    f.failSetup = true;
    equal(library.createCheckout(f.win).open(901903), false);
    equal(f.calls.length, 0);
  });

  test('Rejected Setup never opens a checkout', function () {
    var f = fixture();
    f.rejectSetup = true;
    equal(library.createCheckout(f.win).open(901903), false);
    equal(f.calls.length, 0);
  });

  test('Thrown SDK error is generic and never retried automatically', function () {
    var f = fixture();
    f.failOpen = true;
    var client = library.createCheckout(f.win);
    equal(client.open(901901), false);
    equal(f.calls.length, 1);
    assert(f.error().textContent.indexOf('Private') === -1);
    equal(f.error().hidden, false);
    f.failOpen = false;
    equal(client.open('901903'), true);
    equal(f.calls.length, 2);
    equal(f.error().hidden, true);
  });

  test('Explicit SDK refusal is not reported as an open', function () {
    var f = fixture();
    f.returnFalse = true;
    equal(library.createCheckout(f.win).open(901903), false);
    equal(f.error().hidden, false);
  });

  test('Paddle events show errors without reading customer data', function () {
    var f = fixture();
    library.createCheckout(f.win);
    var callback = f.setups[0].eventCallback;
    var event = { event: 'Checkout.Failed' };
    Object.defineProperty(event, 'eventData', {
      get: function () { throw new Error('Must not inspect payment data'); }
    });
    callback(event);
    equal(f.error().hidden, false);
    callback({ event: 'Checkout.Loaded' });
    equal(f.error().hidden, true);
    callback({ event: 'Checkout.Error' });
    equal(f.error().hidden, false);
    callback({ event: 'Checkout.Close' });
    equal(f.error().hidden, true);
    callback({ event: 'Checkout.Complete' });
    equal(f.calls.length, 0);
  });

  test('Unavailable DOM does not throw on failure', function () {
    equal(library.createCheckout({}).open('invalid'), false);
  });

  return passed + ' Paddle contract checks passed (mock SDK; no payment made).';
}

function run() {
  ObjC.import('Foundation');
  var cwd = ObjC.unwrap($.NSFileManager.defaultManager.currentDirectoryPath);
  var file = cwd + '/public/paddle-checkout.js';
  var contents = $.NSString.stringWithContentsOfFileEncodingError(file, $.NSUTF8StringEncoding, null);
  if (!contents) throw new Error('Run this command from the18_dev');
  var loaded = { exports: {} };
  new Function('module', ObjC.unwrap(contents))(loaded);
  return testCheckout(loaded.exports);
}

if (typeof module === 'object' && typeof require === 'function' && require.main === module) {
  console.log(testCheckout(require('../public/paddle-checkout.js')));
}
