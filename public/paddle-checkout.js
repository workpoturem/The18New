(function (root, factory) {
  var exports = factory();
  if (typeof module === 'object' && module.exports) module.exports = exports;
  if (root) exports.createCheckout(root);
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  var ERROR_ID = 'the18-checkout-error';
  var ERROR_MESSAGE = 'Checkout is unavailable. Please try again later.';

  function normalizeProductId(value) {
    if (typeof value === 'string') {
      value = value.trim();
      if (!/^[0-9]+$/.test(value)) {
        var match = /^https:\/\/(?:buy\.paddle\.com|buy-paddle\.com)\/product\/([0-9]+)\/?$/.exec(value);
        if (!match) return null;
        value = match[1];
      }
      value = Number(value);
    }
    return typeof value === 'number' && value > 0 &&
      value <= 9007199254740991 && Math.floor(value) === value ? value : null;
  }

  function createCheckout(win) {
    if (!win || (typeof win !== 'object' && typeof win !== 'function')) win = {};
    if (win.__the18ClassicCheckout) {
      win.The18Checkout = win.__the18ClassicCheckout;
      return win.The18Checkout;
    }

    var nativeOpen = null;
    var ready = false;

    function setError(message) {
      try {
        var doc = win.document;
        if (!doc) return;
        var node = doc.getElementById(ERROR_ID);
        if (!node && message && doc.body) {
          node = doc.createElement('p');
          node.id = ERROR_ID;
          node.setAttribute('role', 'alert');
          node.setAttribute('aria-live', 'assertive');
          node.setAttribute('aria-atomic', 'true');
          // Outside React's tree; stays visible on long product pages and Safari,
          // where a clicked button does not always become document.activeElement.
          node.style.cssText = 'position:fixed;bottom:20px;left:20px;right:20px;' +
            'z-index:2147483646;margin:0;padding:16px;background:#fff;color:#111;' +
            'border:1px solid #111;border-radius:8px;font:16px/1.4 sans-serif;';
          doc.body.appendChild(node);
        }
        if (node) {
          node.textContent = message;
          node.hidden = !message;
        }
      } catch (_) {
        // Checkout handlers must remain safe even without a usable DOM.
      }
    }

    function onEvent(data) {
      try {
        var event = data && data.event;
        if (event === 'Checkout.Error' || event === 'Checkout.Failed') {
          setError(ERROR_MESSAGE);
        } else if (event === 'Checkout.Loaded' || event === 'Checkout.Close' ||
          event === 'Checkout.Closed') {
          setError('');
        }
      } catch (_) {
        // Never interrupt Paddle's event handling or inspect customer payloads.
      }
    }

    function guardedOpen(options) {
      setError('');
      try {
        var product = options && typeof options === 'object' &&
          !Array.isArray(options) ? normalizeProductId(options.product) : null;
        if (product === null || !ready || !nativeOpen) {
          setError(ERROR_MESSAGE);
          return false;
        }
        var next = {};
        Object.keys(options).forEach(function (key) {
          if (key !== 'product' && key !== 'method' && key !== '__proto__') {
            next[key] = options[key];
          }
        });
        next.product = product;
        next.method = 'overlay';
        if (nativeOpen(next) === false) {
          setError(ERROR_MESSAGE);
          return false;
        }
        return true;
      } catch (_) {
        setError(ERROR_MESSAGE);
        return false;
      }
    }

    var api = {
      open: function (productRef) { return guardedOpen({ product: productRef }); }
    };
    win.__the18ClassicCheckout = api;
    win.The18Checkout = api;

    try {
      var paddle = win.Paddle;
      if (!paddle || (typeof paddle !== 'object' && typeof paddle !== 'function')) {
        paddle = win.Paddle = {};
      }
      var checkout = paddle.Checkout;
      if (!checkout || (typeof checkout !== 'object' && typeof checkout !== 'function')) {
        checkout = paddle.Checkout = {};
      }
      if (typeof checkout.open === 'function') nativeOpen = checkout.open.bind(checkout);
      checkout.open = guardedOpen;
      if (nativeOpen && typeof paddle.Setup === 'function') {
        ready = paddle.Setup({ vendor: 112127, debug: false, eventCallback: onEvent }) !== false;
      }
    } catch (_) {
      ready = false;
    }
    return api;
  }

  return { createCheckout: createCheckout, normalizeProductId: normalizeProductId };
});
