var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// node_modules/crocks/core/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/crocks/core/isFunction.js"(exports, module) {
    function isFunction(fn) {
      return typeof fn === "function";
    }
    module.exports = isFunction;
  }
});

// node_modules/crocks/core/curry.js
var require_curry = __commonJS({
  "node_modules/crocks/core/curry.js"(exports, module) {
    var isFunction = require_isFunction();
    var CURRY_SYMB = "@@crocks/curried";
    function applyCurry(fn, arg) {
      if (!isFunction(fn)) {
        return fn;
      }
      return fn.length > 1 ? fn.bind(null, arg) : fn.call(null, arg);
    }
    function curry(fn) {
      if (fn[CURRY_SYMB]) {
        return fn;
      }
      function curried() {
        var xs = [], len = arguments.length;
        while (len--)
          xs[len] = arguments[len];
        var args = xs.length ? xs : [void 0];
        if (args.length < fn.length) {
          return curry(Function.bind.apply(fn, [null].concat(args)));
        }
        var val = args.length === fn.length ? fn.apply(null, args) : args.reduce(applyCurry, fn);
        if (isFunction(val)) {
          return curry(val);
        }
        return val;
      }
      Object.defineProperty(curried, CURRY_SYMB, {
        enumerable: false,
        writable: false,
        value: true
      });
      return curried;
    }
    module.exports = curry;
  }
});

// node_modules/crocks/combinators/applyTo.js
var require_applyTo = __commonJS({
  "node_modules/crocks/combinators/applyTo.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function applyTo(x, f) {
      if (!isFunction(f)) {
        throw new TypeError("applyTo: Function required for second argument");
      }
      return f(x);
    }
    module.exports = curry(applyTo);
  }
});

// node_modules/crocks/combinators/compose2.js
var require_compose2 = __commonJS({
  "node_modules/crocks/combinators/compose2.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function compose2(f, g, h, x, y) {
      if (!isFunction(f) || !isFunction(g) || !isFunction(h)) {
        throw new TypeError("compose2: First, second and third arguments must be functions");
      }
      return curry(f)(g(x), h(y));
    }
    module.exports = curry(compose2);
  }
});

// node_modules/crocks/core/compose.js
var require_compose = __commonJS({
  "node_modules/crocks/core/compose.js"(exports, module) {
    function compose2(f, g) {
      return function(x) {
        return f(g(x));
      };
    }
    module.exports = compose2;
  }
});

// node_modules/crocks/combinators/composeB.js
var require_composeB = __commonJS({
  "node_modules/crocks/combinators/composeB.js"(exports, module) {
    var compose2 = require_compose();
    var curry = require_curry();
    var isFunction = require_isFunction();
    function composeB(f, g) {
      if (!(isFunction(f) && isFunction(g))) {
        throw new TypeError(
          "composeB: Functions required for first two arguments"
        );
      }
      return compose2(f, g);
    }
    module.exports = curry(composeB);
  }
});

// node_modules/crocks/combinators/constant.js
var require_constant = __commonJS({
  "node_modules/crocks/combinators/constant.js"(exports, module) {
    var curry = require_curry();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    module.exports = curry(constant);
  }
});

// node_modules/crocks/combinators/converge.js
var require_converge = __commonJS({
  "node_modules/crocks/combinators/converge.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function converge(f, g, h, x) {
      if (!isFunction(f) || !isFunction(g) || !isFunction(h)) {
        throw new TypeError("converge: Functions required for first three arguments");
      }
      return curry(f)(g(x), h(x));
    }
    module.exports = curry(converge);
  }
});

// node_modules/crocks/combinators/flip.js
var require_flip = __commonJS({
  "node_modules/crocks/combinators/flip.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function flip(f, x, y) {
      if (!isFunction(f)) {
        throw new TypeError(
          "flip: Function required for first argument"
        );
      }
      return curry(f)(y, x);
    }
    module.exports = curry(flip);
  }
});

// node_modules/crocks/combinators/identity.js
var require_identity = __commonJS({
  "node_modules/crocks/combinators/identity.js"(exports, module) {
    var identity = function(x) {
      return x;
    };
    module.exports = identity;
  }
});

// node_modules/crocks/combinators/psi.js
var require_psi = __commonJS({
  "node_modules/crocks/combinators/psi.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function psi(f, g, x, y) {
      if (!isFunction(f) || !isFunction(g)) {
        throw new TypeError("psi: First and second arguments must be functions");
      }
      return curry(f)(g(x), g(y));
    }
    module.exports = curry(psi);
  }
});

// node_modules/crocks/combinators/substitution.js
var require_substitution = __commonJS({
  "node_modules/crocks/combinators/substitution.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function substitution(f, g, x) {
      if (!(isFunction(f) && isFunction(g))) {
        throw new TypeError(
          "substitution: Functions required for first two arguments"
        );
      }
      return curry(f)(x, g(x));
    }
    module.exports = curry(substitution);
  }
});

// node_modules/crocks/combinators/index.js
var require_combinators = __commonJS({
  "node_modules/crocks/combinators/index.js"(exports, module) {
    module.exports = {
      applyTo: require_applyTo(),
      compose2: require_compose2(),
      composeB: require_composeB(),
      constant: require_constant(),
      converge: require_converge(),
      flip: require_flip(),
      identity: require_identity(),
      psi: require_psi(),
      substitution: require_substitution()
    };
  }
});

// node_modules/crocks/core/types.js
var require_types = __commonJS({
  "node_modules/crocks/core/types.js"(exports, module) {
    var _types = {
      "unk": function() {
        return "unknown";
      },
      "All": function() {
        return "All";
      },
      "Any": function() {
        return "Any";
      },
      "Arrow": function() {
        return "Arrow";
      },
      "Assign": function() {
        return "Assign";
      },
      "Async": function() {
        return "Async";
      },
      "Const": function(inner) {
        return "Const(" + inner + ")";
      },
      "Either": function() {
        return "Either";
      },
      "Endo": function() {
        return "Endo";
      },
      "Equiv": function() {
        return "Equiv";
      },
      "First": function() {
        return "First";
      },
      "Identity": function() {
        return "Identity";
      },
      "IO": function() {
        return "IO";
      },
      "Last": function() {
        return "Last";
      },
      "List": function() {
        return "List";
      },
      "Max": function() {
        return "Max";
      },
      "Maybe": function() {
        return "Maybe";
      },
      "Min": function() {
        return "Min";
      },
      "Pair": function() {
        return "Pair";
      },
      "Pred": function() {
        return "Pred";
      },
      "Prod": function() {
        return "Prod";
      },
      "Reader": function() {
        return "Reader";
      },
      "Result": function() {
        return "Result";
      },
      "Star": function() {
        return "Star";
      },
      "State": function() {
        return "State";
      },
      "Sum": function() {
        return "Sum";
      },
      "Tuple": function(n) {
        return n + "-Tuple";
      },
      "Unit": function() {
        return "Unit";
      },
      "Writer": function() {
        return "Writer";
      }
    };
    var type3 = function(type4) {
      return _types[type4] || _types["unk"];
    };
    var proxy = function(t, ctx) {
      return { type: function() {
        return type3(t)(ctx);
      } };
    };
    var typeFn = function(t, ver, ctx) {
      var typeStr = type3(t)(ctx);
      return "crocks/" + typeStr + "@" + (ver || 0);
    };
    module.exports = {
      proxy,
      type: type3,
      typeFn
    };
  }
});

// node_modules/crocks/core/type.js
var require_type = __commonJS({
  "node_modules/crocks/core/type.js"(exports, module) {
    var isFunction = require_isFunction();
    function type3(x) {
      if (x) {
        if (isFunction(x.type)) {
          return x.type();
        }
      }
      return {}.toString.call(x).slice(8, -1);
    }
    module.exports = type3;
  }
});

// node_modules/crocks/core/isSameType.js
var require_isSameType = __commonJS({
  "node_modules/crocks/core/isSameType.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    var type3 = require_type();
    function isSameType(x, y) {
      var tX = type3(x);
      var tY = type3(y);
      return tX === tY || isFunction(x) && x.name === tY || isFunction(y) && y.name === tX;
    }
    module.exports = curry(isSameType);
  }
});

// node_modules/crocks/core/isPredOrFunc.js
var require_isPredOrFunc = __commonJS({
  "node_modules/crocks/core/isPredOrFunc.js"(exports, module) {
    var Pred = require_types().proxy("Pred");
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var isPredOrFunc = function(predOrFunc) {
      return isFunction(predOrFunc) || isSameType(Pred, predOrFunc);
    };
    module.exports = isPredOrFunc;
  }
});

// node_modules/crocks/core/predOrFunc.js
var require_predOrFunc = __commonJS({
  "node_modules/crocks/core/predOrFunc.js"(exports, module) {
    var isFunction = require_isFunction();
    function predOrFunc(pred, x) {
      if (isFunction(pred)) {
        return pred(x);
      }
      return pred.runWith(x);
    }
    module.exports = predOrFunc;
  }
});

// node_modules/crocks/logic/and.js
var require_and = __commonJS({
  "node_modules/crocks/logic/and.js"(exports, module) {
    var curry = require_curry();
    var isPredOrFunc = require_isPredOrFunc();
    var predOrFunc = require_predOrFunc();
    function and(f, g) {
      if (!(isPredOrFunc(f) && isPredOrFunc(g))) {
        throw new TypeError(
          "and: Preds or predicate functions required for first two arguments"
        );
      }
      return function(x) {
        return !!(predOrFunc(f, x) && predOrFunc(g, x));
      };
    }
    module.exports = curry(and);
  }
});

// node_modules/crocks/logic/ifElse.js
var require_ifElse = __commonJS({
  "node_modules/crocks/logic/ifElse.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isPredOrFunc = require_isPredOrFunc();
    var predOrFunc = require_predOrFunc();
    function ifElse(pred, f, g) {
      if (!isPredOrFunc(pred)) {
        throw new TypeError(
          "ifElse: Pred or predicate function required for first argument"
        );
      }
      if (!(isFunction(f) && isFunction(g))) {
        throw new TypeError(
          "ifElse: Functions required for second and third arguments"
        );
      }
      return function(x) {
        return predOrFunc(pred, x) ? f(x) : g(x);
      };
    }
    module.exports = curry(ifElse);
  }
});

// node_modules/crocks/logic/implies.js
var require_implies = __commonJS({
  "node_modules/crocks/logic/implies.js"(exports, module) {
    var curry = require_curry();
    var isPredOrFunc = require_isPredOrFunc();
    var predOrFunc = require_predOrFunc();
    function implies(p, q) {
      if (!(isPredOrFunc(p) && isPredOrFunc(q))) {
        throw new TypeError(
          "implies: Preds or predicate functions required for first two arguments"
        );
      }
      return function(x) {
        return !predOrFunc(p, x) || !!predOrFunc(q, x);
      };
    }
    module.exports = curry(implies);
  }
});

// node_modules/crocks/logic/not.js
var require_not = __commonJS({
  "node_modules/crocks/logic/not.js"(exports, module) {
    var curry = require_curry();
    var isPredOrFunc = require_isPredOrFunc();
    var predOrFunc = require_predOrFunc();
    function not(pred, x) {
      if (!isPredOrFunc(pred)) {
        throw new TypeError(
          "not: Pred or predicate function required for first argument"
        );
      }
      return !predOrFunc(pred, x);
    }
    module.exports = curry(not);
  }
});

// node_modules/crocks/logic/or.js
var require_or = __commonJS({
  "node_modules/crocks/logic/or.js"(exports, module) {
    var curry = require_curry();
    var isPredOrFunc = require_isPredOrFunc();
    var predOrFunc = require_predOrFunc();
    function or(f, g) {
      if (!(isPredOrFunc(f) && isPredOrFunc(g))) {
        throw new TypeError(
          "or: Preds or predicate functions required for first two arguments"
        );
      }
      return function(x) {
        return !!(predOrFunc(f, x) || predOrFunc(g, x));
      };
    }
    module.exports = curry(or);
  }
});

// node_modules/crocks/logic/unless.js
var require_unless = __commonJS({
  "node_modules/crocks/logic/unless.js"(exports, module) {
    var curry = require_curry();
    var isPredOrFunc = require_isPredOrFunc();
    var isFunction = require_isFunction();
    var predOrFunc = require_predOrFunc();
    function unless(pred, f) {
      if (!isPredOrFunc(pred)) {
        throw new TypeError(
          "unless: Pred or predicate function required for first argument"
        );
      }
      if (!isFunction(f)) {
        throw new TypeError(
          "unless: Function required for second argument"
        );
      }
      return function(x) {
        return !predOrFunc(pred, x) ? f(x) : x;
      };
    }
    module.exports = curry(unless);
  }
});

// node_modules/crocks/logic/when.js
var require_when = __commonJS({
  "node_modules/crocks/logic/when.js"(exports, module) {
    var curry = require_curry();
    var predOrFunc = require_predOrFunc();
    var isPredOrFunc = require_isPredOrFunc();
    var isFunction = require_isFunction();
    function when(pred, f) {
      if (!isPredOrFunc(pred)) {
        throw new TypeError(
          "when: Pred or predicate function required for first argument"
        );
      }
      if (!isFunction(f)) {
        throw new TypeError(
          "when: Function required for second argument"
        );
      }
      return function(x) {
        return predOrFunc(pred, x) ? f(x) : x;
      };
    }
    module.exports = curry(when);
  }
});

// node_modules/crocks/logic/index.js
var require_logic = __commonJS({
  "node_modules/crocks/logic/index.js"(exports, module) {
    module.exports = {
      and: require_and(),
      ifElse: require_ifElse(),
      implies: require_implies(),
      not: require_not(),
      or: require_or(),
      unless: require_unless(),
      when: require_when()
    };
  }
});

// node_modules/crocks/core/isDefined.js
var require_isDefined = __commonJS({
  "node_modules/crocks/core/isDefined.js"(exports, module) {
    function isDefined(x) {
      return x !== void 0;
    }
    module.exports = isDefined;
  }
});

// node_modules/crocks/core/isObject.js
var require_isObject = __commonJS({
  "node_modules/crocks/core/isObject.js"(exports, module) {
    var toString4 = Object.prototype.toString;
    function isObject(x) {
      return !!x && toString4.call(x) === "[object Object]";
    }
    module.exports = isObject;
  }
});

// node_modules/crocks/core/flNames.js
var require_flNames = __commonJS({
  "node_modules/crocks/core/flNames.js"(exports, module) {
    module.exports = {
      alt: "fantasy-land/alt",
      bimap: "fantasy-land/bimap",
      chain: "fantasy-land/chain",
      compose: "fantasy-land/compose",
      concat: "fantasy-land/concat",
      contramap: "fantasy-land/contramap",
      empty: "fantasy-land/empty",
      equals: "fantasy-land/equals",
      extend: "fantasy-land/extend",
      filter: "fantasy-land/filter",
      id: "fantasy-land/id",
      map: "fantasy-land/map",
      of: "fantasy-land/of",
      promap: "fantasy-land/promap",
      reduce: "fantasy-land/reduce",
      zero: "fantasy-land/zero"
    };
  }
});

// node_modules/crocks/core/hasAlg.js
var require_hasAlg = __commonJS({
  "node_modules/crocks/core/hasAlg.js"(exports, module) {
    var isFunction = require_isFunction();
    var fl = require_flNames();
    var check = function(alg, m) {
      return isFunction(m[fl[alg]]) || isFunction(m[alg]);
    };
    var checkImpl = function(alg, m) {
      return isFunction(m["@@implements"]) && !!m["@@implements"](alg);
    };
    var hasAlg = function(alg, m) {
      return !!m && (check(alg, m) || checkImpl(alg, m));
    };
    module.exports = hasAlg;
  }
});

// node_modules/crocks/core/isString.js
var require_isString = __commonJS({
  "node_modules/crocks/core/isString.js"(exports, module) {
    function isString(x) {
      return typeof x === "string";
    }
    module.exports = isString;
  }
});

// node_modules/crocks/core/isSemigroup.js
var require_isSemigroup = __commonJS({
  "node_modules/crocks/core/isSemigroup.js"(exports, module) {
    var isString = require_isString();
    var hasAlg = require_hasAlg();
    function isSemigroup(m) {
      return isString(m) || !!m && hasAlg("concat", m);
    }
    module.exports = isSemigroup;
  }
});

// node_modules/crocks/core/isMonoid.js
var require_isMonoid = __commonJS({
  "node_modules/crocks/core/isMonoid.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isSemigroup = require_isSemigroup();
    function isMonoid(m) {
      return isSemigroup(m) && (hasAlg("empty", m) || hasAlg("empty", m.constructor));
    }
    module.exports = isMonoid;
  }
});

// node_modules/crocks/core/isSame.js
var require_isSame = __commonJS({
  "node_modules/crocks/core/isSame.js"(exports, module) {
    function isSame(x, y) {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      }
      return x !== x && y !== y;
    }
    module.exports = isSame;
  }
});

// node_modules/crocks/core/equals.js
var require_equals = __commonJS({
  "node_modules/crocks/core/equals.js"(exports, module) {
    var isSameType = require_isSameType();
    var isSame = require_isSame();
    var hasAlg = require_hasAlg();
    var type3 = require_type();
    var fl = require_flNames();
    var comp = function(a, b) {
      return a.valueOf() === b.valueOf();
    };
    var strats = {
      "Array": function(a, b) {
        return a.length === b.length && deepEquals(a, b);
      },
      "Date": function(a, b) {
        return isSame(a.valueOf(), b.valueOf());
      },
      "Error": function(a, b) {
        return a.name === b.name && a.message === b.message;
      },
      "Object": function(a, b) {
        return Object.keys(a).length === Object.keys(b).length && deepEquals(a, b);
      },
      "RegExp": function(a, b) {
        return a.source === b.source && a.ignoreCase === b.ignoreCase && a.global === b.global && a.multiline === b.multiline && a.unicode === b.unicode;
      }
    };
    function deepEquals(a, b) {
      for (var key in a) {
        if (!equals3(a[key], b[key])) {
          return false;
        }
      }
      return true;
    }
    function equals3(a, b) {
      if (isSame(a, b)) {
        return true;
      }
      if (!isSameType(a, b)) {
        return false;
      }
      if (hasAlg("equals", a)) {
        return (b[fl.equals] || b.equals).call(b, a);
      }
      return (strats[type3(a)] || comp)(a, b);
    }
    module.exports = equals3;
  }
});

// node_modules/crocks/core/isEmpty.js
var require_isEmpty = __commonJS({
  "node_modules/crocks/core/isEmpty.js"(exports, module) {
    var isObject = require_isObject();
    var isMonoid = require_isMonoid();
    var equals3 = require_equals();
    var fl = require_flNames();
    function isEmpty(x) {
      if (isMonoid(x)) {
        var empty = x.constructor[fl["empty"]] || x.constructor["empty"] || x["empty"];
        return equals3(x, empty());
      }
      if (isObject(x)) {
        return !Object.keys(x).length;
      }
      if (x && x.length !== void 0) {
        return !x.length;
      }
      return true;
    }
    module.exports = isEmpty;
  }
});

// node_modules/crocks/core/isNumber.js
var require_isNumber = __commonJS({
  "node_modules/crocks/core/isNumber.js"(exports, module) {
    function isNumber(x) {
      return typeof x === "number" && !isNaN(x);
    }
    module.exports = isNumber;
  }
});

// node_modules/crocks/core/isInteger.js
var require_isInteger = __commonJS({
  "node_modules/crocks/core/isInteger.js"(exports, module) {
    var isNumber = require_isNumber();
    function isInteger(x) {
      return isNumber(x) && isFinite(x) && Math.floor(x) === x;
    }
    module.exports = isInteger;
  }
});

// node_modules/crocks/core/isNil.js
var require_isNil = __commonJS({
  "node_modules/crocks/core/isNil.js"(exports, module) {
    function isNil3(x) {
      return x == null || x !== x;
    }
    module.exports = isNil3;
  }
});

// node_modules/crocks/predicates/hasProp.js
var require_hasProp = __commonJS({
  "node_modules/crocks/predicates/hasProp.js"(exports, module) {
    var curry = require_curry();
    var isDefined = require_isDefined();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isNil3 = require_isNil();
    var isString = require_isString();
    function hasProp(key, x) {
      if (!(isString(key) && !isEmpty(key) || isInteger(key))) {
        throw new TypeError(
          "hasProp: Non-empty String or Integer required for first argument"
        );
      }
      if (isNil3(x)) {
        return false;
      }
      return isDefined(x[key]);
    }
    module.exports = curry(hasProp);
  }
});

// node_modules/crocks/core/isFoldable.js
var require_isFoldable = __commonJS({
  "node_modules/crocks/core/isFoldable.js"(exports, module) {
    var hasAlg = require_hasAlg();
    function isFoldable(m) {
      return !!m && hasAlg("reduce", m);
    }
    module.exports = isFoldable;
  }
});

// node_modules/crocks/predicates/hasProps.js
var require_hasProps = __commonJS({
  "node_modules/crocks/predicates/hasProps.js"(exports, module) {
    var curry = require_curry();
    var isDefined = require_isDefined();
    var isEmpty = require_isEmpty();
    var isFoldable = require_isFoldable();
    var isInteger = require_isInteger();
    var isNil3 = require_isNil();
    var isString = require_isString();
    var err = "hasProps: First argument must be a Foldable of Non-empty Strings or Integers";
    var isKeyValid = function(key) {
      return isString(key) && !isEmpty(key) || isInteger(key);
    };
    var hasKey = function(obj) {
      return function(key) {
        if (!isKeyValid(key)) {
          throw new TypeError(err);
        }
        return isDefined(obj[key]);
      };
    };
    var every = function(fn) {
      return function(acc, x) {
        return (acc === null ? true : acc) && fn(x);
      };
    };
    function hasProps(keys4, x) {
      if (!isFoldable(keys4)) {
        throw new TypeError(err);
      }
      if (isNil3(x)) {
        return false;
      }
      var result = keys4.reduce(
        every(hasKey(x)),
        null
      );
      return result === null || result;
    }
    module.exports = curry(hasProps);
  }
});

// node_modules/crocks/core/isArray.js
var require_isArray = __commonJS({
  "node_modules/crocks/core/isArray.js"(exports, module) {
    function isArray(x) {
      return Array.isArray(x);
    }
    module.exports = isArray;
  }
});

// node_modules/crocks/predicates/hasPropPath.js
var require_hasPropPath = __commonJS({
  "node_modules/crocks/predicates/hasPropPath.js"(exports, module) {
    var curry = require_curry();
    var isArray = require_isArray();
    var isDefined = require_isDefined();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isNil3 = require_isNil();
    var isString = require_isString();
    function hasPropPath(keys4, target) {
      if (!isArray(keys4)) {
        throw new TypeError(
          "hasPropPath: Array of Non-empty Strings or Integers required for first argument"
        );
      }
      if (isNil3(target)) {
        return false;
      }
      var value = target;
      for (var i = 0; i < keys4.length; i++) {
        var key = keys4[i];
        if (!(isString(key) && !isEmpty(key) || isInteger(key))) {
          throw new TypeError(
            "hasPropPath: Array of Non-empty Strings or Integers required for first argument"
          );
        }
        if (isNil3(value)) {
          return false;
        }
        value = value[key];
        if (!isDefined(value)) {
          return false;
        }
      }
      return true;
    }
    module.exports = curry(hasPropPath);
  }
});

// node_modules/crocks/core/isFunctor.js
var require_isFunctor = __commonJS({
  "node_modules/crocks/core/isFunctor.js"(exports, module) {
    var hasAlg = require_hasAlg();
    function isFunctor(m) {
      return !!m && hasAlg("map", m);
    }
    module.exports = isFunctor;
  }
});

// node_modules/crocks/core/isAlt.js
var require_isAlt = __commonJS({
  "node_modules/crocks/core/isAlt.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isFunctor = require_isFunctor();
    function isAlt(m) {
      return isFunctor(m) && hasAlg("alt", m);
    }
    module.exports = isAlt;
  }
});

// node_modules/crocks/predicates/isAlt.js
var require_isAlt2 = __commonJS({
  "node_modules/crocks/predicates/isAlt.js"(exports, module) {
    module.exports = require_isAlt();
  }
});

// node_modules/crocks/core/isApply.js
var require_isApply = __commonJS({
  "node_modules/crocks/core/isApply.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isFunctor = require_isFunctor();
    function isApply(m) {
      return isFunctor(m) && hasAlg("ap", m);
    }
    module.exports = isApply;
  }
});

// node_modules/crocks/core/isApplicative.js
var require_isApplicative = __commonJS({
  "node_modules/crocks/core/isApplicative.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isApply = require_isApply();
    function isApplicative(m) {
      return isApply(m) && (hasAlg("of", m) || hasAlg("of", m.constructor));
    }
    module.exports = isApplicative;
  }
});

// node_modules/crocks/core/isPlus.js
var require_isPlus = __commonJS({
  "node_modules/crocks/core/isPlus.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isAlt = require_isAlt();
    function isPlus(m) {
      return isAlt(m) && (hasAlg("zero", m) || hasAlg("zero", m.constructor));
    }
    module.exports = isPlus;
  }
});

// node_modules/crocks/predicates/isAlternative.js
var require_isAlternative = __commonJS({
  "node_modules/crocks/predicates/isAlternative.js"(exports, module) {
    var isApplicative = require_isApplicative();
    var isPlus = require_isPlus();
    function isAlternative(m) {
      return isPlus(m) && isApplicative(m);
    }
    module.exports = isAlternative;
  }
});

// node_modules/crocks/predicates/isApplicative.js
var require_isApplicative2 = __commonJS({
  "node_modules/crocks/predicates/isApplicative.js"(exports, module) {
    module.exports = require_isApplicative();
  }
});

// node_modules/crocks/predicates/isApply.js
var require_isApply2 = __commonJS({
  "node_modules/crocks/predicates/isApply.js"(exports, module) {
    module.exports = require_isApply();
  }
});

// node_modules/crocks/predicates/isArray.js
var require_isArray2 = __commonJS({
  "node_modules/crocks/predicates/isArray.js"(exports, module) {
    module.exports = require_isArray();
  }
});

// node_modules/crocks/core/isBifunctor.js
var require_isBifunctor = __commonJS({
  "node_modules/crocks/core/isBifunctor.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isFunctor = require_isFunctor();
    function isBifunctor(m) {
      return isFunctor(m) && hasAlg("bimap", m);
    }
    module.exports = isBifunctor;
  }
});

// node_modules/crocks/predicates/isBifunctor.js
var require_isBifunctor2 = __commonJS({
  "node_modules/crocks/predicates/isBifunctor.js"(exports, module) {
    module.exports = require_isBifunctor();
  }
});

// node_modules/crocks/core/isBichain.js
var require_isBichain = __commonJS({
  "node_modules/crocks/core/isBichain.js"(exports, module) {
    var hasAlg = require_hasAlg();
    function isBichain(m) {
      return hasAlg("bichain", m);
    }
    module.exports = isBichain;
  }
});

// node_modules/crocks/predicates/isBichain.js
var require_isBichain2 = __commonJS({
  "node_modules/crocks/predicates/isBichain.js"(exports, module) {
    module.exports = require_isBichain();
  }
});

// node_modules/crocks/predicates/isBoolean.js
var require_isBoolean = __commonJS({
  "node_modules/crocks/predicates/isBoolean.js"(exports, module) {
    function isBoolean(x) {
      return typeof x === "boolean";
    }
    module.exports = isBoolean;
  }
});

// node_modules/crocks/core/isSemigroupoid.js
var require_isSemigroupoid = __commonJS({
  "node_modules/crocks/core/isSemigroupoid.js"(exports, module) {
    var hasAlg = require_hasAlg();
    function isSemigroupoid(m) {
      return !!m && hasAlg("compose", m);
    }
    module.exports = isSemigroupoid;
  }
});

// node_modules/crocks/predicates/isCategory.js
var require_isCategory = __commonJS({
  "node_modules/crocks/predicates/isCategory.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isSemigroupoid = require_isSemigroupoid();
    function isCategory(m) {
      return isSemigroupoid(m) && (hasAlg("id", m) || hasAlg("id", m.constructor));
    }
    module.exports = isCategory;
  }
});

// node_modules/crocks/core/isChain.js
var require_isChain = __commonJS({
  "node_modules/crocks/core/isChain.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isApply = require_isApply();
    function isChain(m) {
      return isApply(m) && hasAlg("chain", m);
    }
    module.exports = isChain;
  }
});

// node_modules/crocks/predicates/isChain.js
var require_isChain2 = __commonJS({
  "node_modules/crocks/predicates/isChain.js"(exports, module) {
    module.exports = require_isChain();
  }
});

// node_modules/crocks/core/isContravariant.js
var require_isContravariant = __commonJS({
  "node_modules/crocks/core/isContravariant.js"(exports, module) {
    var hasAlg = require_hasAlg();
    function isContravariant(m) {
      return !!m && hasAlg("contramap", m);
    }
    module.exports = isContravariant;
  }
});

// node_modules/crocks/predicates/isContravariant.js
var require_isContravariant2 = __commonJS({
  "node_modules/crocks/predicates/isContravariant.js"(exports, module) {
    module.exports = require_isContravariant();
  }
});

// node_modules/crocks/core/isDate.js
var require_isDate = __commonJS({
  "node_modules/crocks/core/isDate.js"(exports, module) {
    function isDate(x) {
      return Object.prototype.toString.apply(x) === "[object Date]" && !isNaN(x.valueOf());
    }
    module.exports = isDate;
  }
});

// node_modules/crocks/predicates/isDate.js
var require_isDate2 = __commonJS({
  "node_modules/crocks/predicates/isDate.js"(exports, module) {
    module.exports = require_isDate();
  }
});

// node_modules/crocks/predicates/isDefined.js
var require_isDefined2 = __commonJS({
  "node_modules/crocks/predicates/isDefined.js"(exports, module) {
    module.exports = require_isDefined();
  }
});

// node_modules/crocks/predicates/isEmpty.js
var require_isEmpty2 = __commonJS({
  "node_modules/crocks/predicates/isEmpty.js"(exports, module) {
    module.exports = require_isEmpty();
  }
});

// node_modules/crocks/core/isExtend.js
var require_isExtend = __commonJS({
  "node_modules/crocks/core/isExtend.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isFunctor = require_isFunctor();
    function isExtend(m) {
      return isFunctor(m) && hasAlg("extend", m);
    }
    module.exports = isExtend;
  }
});

// node_modules/crocks/predicates/isExtend.js
var require_isExtend2 = __commonJS({
  "node_modules/crocks/predicates/isExtend.js"(exports, module) {
    module.exports = require_isExtend();
  }
});

// node_modules/crocks/predicates/isFalse.js
var require_isFalse = __commonJS({
  "node_modules/crocks/predicates/isFalse.js"(exports, module) {
    function isFalse(x) {
      return x === false;
    }
    module.exports = isFalse;
  }
});

// node_modules/crocks/predicates/isFalsy.js
var require_isFalsy = __commonJS({
  "node_modules/crocks/predicates/isFalsy.js"(exports, module) {
    function isFalsy(x) {
      return !x;
    }
    module.exports = isFalsy;
  }
});

// node_modules/crocks/predicates/isFoldable.js
var require_isFoldable2 = __commonJS({
  "node_modules/crocks/predicates/isFoldable.js"(exports, module) {
    module.exports = require_isFoldable();
  }
});

// node_modules/crocks/predicates/isFunction.js
var require_isFunction2 = __commonJS({
  "node_modules/crocks/predicates/isFunction.js"(exports, module) {
    module.exports = require_isFunction();
  }
});

// node_modules/crocks/predicates/isFunctor.js
var require_isFunctor2 = __commonJS({
  "node_modules/crocks/predicates/isFunctor.js"(exports, module) {
    module.exports = require_isFunctor();
  }
});

// node_modules/crocks/predicates/isInteger.js
var require_isInteger2 = __commonJS({
  "node_modules/crocks/predicates/isInteger.js"(exports, module) {
    module.exports = require_isInteger();
  }
});

// node_modules/crocks/core/isIterable.js
var require_isIterable = __commonJS({
  "node_modules/crocks/core/isIterable.js"(exports, module) {
    var isFunction = require_isFunction();
    var isNil3 = require_isNil();
    function isIterable(iterable) {
      return !isNil3(iterable) && isFunction(iterable[Symbol.iterator]);
    }
    module.exports = isIterable;
  }
});

// node_modules/crocks/predicates/isIterable.js
var require_isIterable2 = __commonJS({
  "node_modules/crocks/predicates/isIterable.js"(exports, module) {
    module.exports = require_isIterable();
  }
});

// node_modules/crocks/core/isMap.js
var require_isMap = __commonJS({
  "node_modules/crocks/core/isMap.js"(exports, module) {
    function isMap(x) {
      return x instanceof Map;
    }
    module.exports = isMap;
  }
});

// node_modules/crocks/predicates/isMap.js
var require_isMap2 = __commonJS({
  "node_modules/crocks/predicates/isMap.js"(exports, module) {
    module.exports = require_isMap();
  }
});

// node_modules/crocks/core/isMonad.js
var require_isMonad = __commonJS({
  "node_modules/crocks/core/isMonad.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isApplicative = require_isApplicative();
    function isMonad(m) {
      return isApplicative(m) && hasAlg("chain", m);
    }
    module.exports = isMonad;
  }
});

// node_modules/crocks/predicates/isMonad.js
var require_isMonad2 = __commonJS({
  "node_modules/crocks/predicates/isMonad.js"(exports, module) {
    module.exports = require_isMonad();
  }
});

// node_modules/crocks/predicates/isMonoid.js
var require_isMonoid2 = __commonJS({
  "node_modules/crocks/predicates/isMonoid.js"(exports, module) {
    module.exports = require_isMonoid();
  }
});

// node_modules/crocks/predicates/isNil.js
var require_isNil2 = __commonJS({
  "node_modules/crocks/predicates/isNil.js"(exports, module) {
    module.exports = require_isNil();
  }
});

// node_modules/crocks/predicates/isNumber.js
var require_isNumber2 = __commonJS({
  "node_modules/crocks/predicates/isNumber.js"(exports, module) {
    module.exports = require_isNumber();
  }
});

// node_modules/crocks/predicates/isObject.js
var require_isObject2 = __commonJS({
  "node_modules/crocks/predicates/isObject.js"(exports, module) {
    module.exports = require_isObject();
  }
});

// node_modules/crocks/predicates/isPlus.js
var require_isPlus2 = __commonJS({
  "node_modules/crocks/predicates/isPlus.js"(exports, module) {
    module.exports = require_isPlus();
  }
});

// node_modules/crocks/core/isProfunctor.js
var require_isProfunctor = __commonJS({
  "node_modules/crocks/core/isProfunctor.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isContravariant = require_isContravariant();
    var isFunctor = require_isFunctor();
    function isProfunctor(m) {
      return isContravariant(m) && isFunctor(m) && hasAlg("promap", m);
    }
    module.exports = isProfunctor;
  }
});

// node_modules/crocks/predicates/isProfunctor.js
var require_isProfunctor2 = __commonJS({
  "node_modules/crocks/predicates/isProfunctor.js"(exports, module) {
    module.exports = require_isProfunctor();
  }
});

// node_modules/crocks/core/isPromise.js
var require_isPromise = __commonJS({
  "node_modules/crocks/core/isPromise.js"(exports, module) {
    var isFunction = require_isFunction();
    function isPromise(p) {
      return !!p && isFunction(p.then) && isFunction(p.catch);
    }
    module.exports = isPromise;
  }
});

// node_modules/crocks/predicates/isPromise.js
var require_isPromise2 = __commonJS({
  "node_modules/crocks/predicates/isPromise.js"(exports, module) {
    module.exports = require_isPromise();
  }
});

// node_modules/crocks/predicates/isSame.js
var require_isSame2 = __commonJS({
  "node_modules/crocks/predicates/isSame.js"(exports, module) {
    var curry = require_curry();
    var isSame = require_isSame();
    module.exports = curry(isSame);
  }
});

// node_modules/crocks/predicates/isSameType.js
var require_isSameType2 = __commonJS({
  "node_modules/crocks/predicates/isSameType.js"(exports, module) {
    module.exports = require_isSameType();
  }
});

// node_modules/crocks/predicates/isSemigroup.js
var require_isSemigroup2 = __commonJS({
  "node_modules/crocks/predicates/isSemigroup.js"(exports, module) {
    module.exports = require_isSemigroup();
  }
});

// node_modules/crocks/predicates/isSemigroupoid.js
var require_isSemigroupoid2 = __commonJS({
  "node_modules/crocks/predicates/isSemigroupoid.js"(exports, module) {
    module.exports = require_isSemigroupoid();
  }
});

// node_modules/crocks/predicates/isSetoid.js
var require_isSetoid = __commonJS({
  "node_modules/crocks/predicates/isSetoid.js"(exports, module) {
    var hasAlg = require_hasAlg();
    function isSetoid(m) {
      return !!m && hasAlg("equals", m);
    }
    module.exports = isSetoid;
  }
});

// node_modules/crocks/predicates/isString.js
var require_isString2 = __commonJS({
  "node_modules/crocks/predicates/isString.js"(exports, module) {
    module.exports = require_isString();
  }
});

// node_modules/crocks/core/isSymbol.js
var require_isSymbol = __commonJS({
  "node_modules/crocks/core/isSymbol.js"(exports, module) {
    function isSymbol(x) {
      return typeof x === "symbol";
    }
    module.exports = isSymbol;
  }
});

// node_modules/crocks/predicates/isSymbol.js
var require_isSymbol2 = __commonJS({
  "node_modules/crocks/predicates/isSymbol.js"(exports, module) {
    module.exports = require_isSymbol();
  }
});

// node_modules/crocks/predicates/isTraversable.js
var require_isTraversable = __commonJS({
  "node_modules/crocks/predicates/isTraversable.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isFunctor = require_isFunctor();
    function isTraversable(m) {
      return isFunctor(m) && hasAlg("traverse", m);
    }
    module.exports = isTraversable;
  }
});

// node_modules/crocks/predicates/isTrue.js
var require_isTrue = __commonJS({
  "node_modules/crocks/predicates/isTrue.js"(exports, module) {
    function isTrue(x) {
      return x === true;
    }
    module.exports = isTrue;
  }
});

// node_modules/crocks/predicates/isTruthy.js
var require_isTruthy = __commonJS({
  "node_modules/crocks/predicates/isTruthy.js"(exports, module) {
    function isTruthy(x) {
      return !!x;
    }
    module.exports = isTruthy;
  }
});

// node_modules/crocks/predicates/pathEq.js
var require_pathEq = __commonJS({
  "node_modules/crocks/predicates/pathEq.js"(exports, module) {
    var curry = require_curry();
    var equals3 = require_equals();
    var isArray = require_isArray();
    var isDefined = require_isDefined();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isNil3 = require_isNil();
    var isString = require_isString();
    var err = function(name) {
      return name + ": First argument must be an Array of non-empty Strings or Integers";
    };
    function fn(name) {
      function pathEq2(keys4, value, target) {
        if (!isArray(keys4)) {
          throw new TypeError(err(name));
        }
        if (isNil3(target)) {
          return false;
        }
        var acc = target;
        for (var i = 0; i < keys4.length; i++) {
          var key = keys4[i];
          if (!(isString(key) && !isEmpty(key) || isInteger(key))) {
            throw new TypeError(err(name));
          }
          if (isNil3(acc)) {
            return false;
          }
          acc = acc[key];
          if (!isDefined(acc)) {
            return false;
          }
        }
        return equals3(acc, value);
      }
      return curry(pathEq2);
    }
    var pathEq = fn("pathEq");
    pathEq.origFn = fn;
    module.exports = pathEq;
  }
});

// node_modules/crocks/predicates/pathSatisfies.js
var require_pathSatisfies = __commonJS({
  "node_modules/crocks/predicates/pathSatisfies.js"(exports, module) {
    var curry = require_curry();
    var isArray = require_isArray();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isNil3 = require_isNil();
    var isPredOrFunc = require_isPredOrFunc();
    var isString = require_isString();
    var predOrFunc = require_predOrFunc();
    var err = function(name) {
      return name + ": First argument must be an Array of non-empty Strings or Integers";
    };
    function fn(name) {
      function pathSatisfies2(keys4, pred, x) {
        if (!isArray(keys4)) {
          throw new TypeError(err(name));
        }
        if (!isPredOrFunc(pred)) {
          throw new TypeError(
            name + ": Second argument must be a Pred or predicate Function"
          );
        }
        if (isNil3(x)) {
          return false;
        }
        var target = x;
        for (var i = 0; i < keys4.length; i++) {
          var key = keys4[i];
          if (!(isString(key) && !isEmpty(key) || isInteger(key))) {
            throw new TypeError(err(name));
          }
          if (isNil3(target)) {
            return false;
          }
          target = target[key];
        }
        return !!predOrFunc(pred, target);
      }
      return curry(pathSatisfies2);
    }
    var pathSatisfies = fn("pathSatisfies");
    pathSatisfies.origFn = fn;
    module.exports = pathSatisfies;
  }
});

// node_modules/crocks/predicates/propEq.js
var require_propEq = __commonJS({
  "node_modules/crocks/predicates/propEq.js"(exports, module) {
    var curry = require_curry();
    var equals3 = require_equals();
    var isDefined = require_isDefined();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isNil3 = require_isNil();
    var isString = require_isString();
    function propEq3(key, value, x) {
      if (!(isString(key) && !isEmpty(key) || isInteger(key))) {
        throw new TypeError(
          "propEq: Non-empty String or Integer required for first argument"
        );
      }
      if (isNil3(x)) {
        return false;
      }
      var target = x[key];
      return isDefined(target) && equals3(target, value);
    }
    module.exports = curry(propEq3);
  }
});

// node_modules/crocks/predicates/propPathEq.js
var require_propPathEq = __commonJS({
  "node_modules/crocks/predicates/propPathEq.js"(exports, module) {
    var pathEq = require_pathEq();
    module.exports = pathEq.origFn("propPathEq");
  }
});

// node_modules/crocks/predicates/propSatisfies.js
var require_propSatisfies = __commonJS({
  "node_modules/crocks/predicates/propSatisfies.js"(exports, module) {
    var curry = require_curry();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isNil3 = require_isNil();
    var isPredOrFunc = require_isPredOrFunc();
    var isString = require_isString();
    var predOrFunc = require_predOrFunc();
    function propSatisfies(key, pred, x) {
      if (!(isString(key) && !isEmpty(key) || isInteger(key))) {
        throw new TypeError(
          "propSatisfies: Non-empty String or Integer required for first argument"
        );
      }
      if (!isPredOrFunc(pred)) {
        throw new TypeError(
          "propSatisfies: Pred or predicate function required for second argument"
        );
      }
      return isNil3(x) ? false : !!predOrFunc(pred, x[key]);
    }
    module.exports = curry(propSatisfies);
  }
});

// node_modules/crocks/predicates/propPathSatisfies.js
var require_propPathSatisfies = __commonJS({
  "node_modules/crocks/predicates/propPathSatisfies.js"(exports, module) {
    var pathSatisfies = require_pathSatisfies();
    module.exports = pathSatisfies.origFn("propPathSatisfies");
  }
});

// node_modules/crocks/predicates/index.js
var require_predicates = __commonJS({
  "node_modules/crocks/predicates/index.js"(exports, module) {
    module.exports = {
      hasProp: require_hasProp(),
      hasProps: require_hasProps(),
      hasPropPath: require_hasPropPath(),
      isAlt: require_isAlt2(),
      isAlternative: require_isAlternative(),
      isApplicative: require_isApplicative2(),
      isApply: require_isApply2(),
      isArray: require_isArray2(),
      isBifunctor: require_isBifunctor2(),
      isBichain: require_isBichain2(),
      isBoolean: require_isBoolean(),
      isCategory: require_isCategory(),
      isChain: require_isChain2(),
      isContravariant: require_isContravariant2(),
      isDate: require_isDate2(),
      isDefined: require_isDefined2(),
      isEmpty: require_isEmpty2(),
      isExtend: require_isExtend2(),
      isFalse: require_isFalse(),
      isFalsy: require_isFalsy(),
      isFoldable: require_isFoldable2(),
      isFunction: require_isFunction2(),
      isFunctor: require_isFunctor2(),
      isInteger: require_isInteger2(),
      isIterable: require_isIterable2(),
      isMap: require_isMap2(),
      isMonad: require_isMonad2(),
      isMonoid: require_isMonoid2(),
      isNil: require_isNil2(),
      isNumber: require_isNumber2(),
      isObject: require_isObject2(),
      isPlus: require_isPlus2(),
      isProfunctor: require_isProfunctor2(),
      isPromise: require_isPromise2(),
      isSame: require_isSame2(),
      isSameType: require_isSameType2(),
      isSemigroup: require_isSemigroup2(),
      isSemigroupoid: require_isSemigroupoid2(),
      isSetoid: require_isSetoid(),
      isString: require_isString2(),
      isSymbol: require_isSymbol2(),
      isTraversable: require_isTraversable(),
      isTrue: require_isTrue(),
      isTruthy: require_isTruthy(),
      pathEq: require_pathEq(),
      pathSatisfies: require_pathSatisfies(),
      propEq: require_propEq(),
      propPathEq: require_propPathEq(),
      propSatisfies: require_propSatisfies(),
      propPathSatisfies: require_propPathSatisfies()
    };
  }
});

// node_modules/crocks/core/implements.js
var require_implements = __commonJS({
  "node_modules/crocks/core/implements.js"(exports, module) {
    var fulfills = function(algs) {
      return function(test) {
        return algs.indexOf(test) !== -1;
      };
    };
    module.exports = fulfills;
  }
});

// node_modules/crocks/core/inspect.js
var require_inspect = __commonJS({
  "node_modules/crocks/core/inspect.js"(exports, module) {
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    var isObject = require_isObject();
    var isString = require_isString();
    var isSymbol = require_isSymbol();
    var isDate = require_isDate();
    function arrayInspect(xs) {
      return xs.length ? xs.map(inspect).reduce(function(a, x) {
        return a + "," + x;
      }) : xs;
    }
    function inspect(x) {
      if (x && isFunction(x.inspect)) {
        return " " + x.inspect();
      }
      if (isFunction(x)) {
        return " Function";
      }
      if (isArray(x)) {
        return " [" + arrayInspect(x) + " ]";
      }
      if (isObject(x)) {
        return " { " + Object.keys(x).reduce(function(acc, key) {
          return acc.concat([key + ":" + inspect(x[key])]);
        }, []).join(", ") + " }";
      }
      if (isString(x)) {
        return ' "' + x + '"';
      }
      if (isSymbol(x) || isDate(x)) {
        return " " + x.toString();
      }
      return " " + x;
    }
    module.exports = inspect;
  }
});

// node_modules/crocks/Arrow/index.js
var require_Arrow = __commonJS({
  "node_modules/crocks/Arrow/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var type3 = require_types().type("Arrow");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var Pair = require_types().proxy("Pair");
    var _id = function() {
      return Arrow(function(x) {
        return x;
      });
    };
    function Arrow(runWith) {
      var obj;
      if (!isFunction(runWith)) {
        throw new TypeError("Arrow: Function required");
      }
      var inspect = function() {
        return "Arrow" + _inspect(runWith);
      };
      var id = _id;
      var _map2 = function(fn) {
        return Arrow(function(x) {
          return fn(runWith(x));
        });
      };
      function compose2(method) {
        return function(m) {
          if (!isSameType(Arrow, m)) {
            throw new TypeError("Arrow." + method + ": Arrow required");
          }
          return _map2(m.runWith);
        };
      }
      function map3(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Arrow." + method + ": Function required");
          }
          return _map2(fn);
        };
      }
      function contramap(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Arrow." + method + ": Function required");
          }
          return Arrow(function(x) {
            return runWith(fn(x));
          });
        };
      }
      function promap(method) {
        return function(l, r) {
          if (!isFunction(l) || !isFunction(r)) {
            throw new TypeError("Arrow." + method + ": Functions required for both arguments");
          }
          return Arrow(function(x) {
            return r(runWith(l(x)));
          });
        };
      }
      function first() {
        return Arrow(function(x) {
          if (!isSameType(Pair, x)) {
            throw TypeError("Arrow.first: Pair required for inner argument");
          }
          return x.bimap(runWith, function(x2) {
            return x2;
          });
        });
      }
      function second() {
        return Arrow(function(x) {
          if (!isSameType(Pair, x)) {
            throw TypeError("Arrow.second: Pair required for inner argument");
          }
          return x.bimap(function(x2) {
            return x2;
          }, runWith);
        });
      }
      function both() {
        return Arrow(function(x) {
          if (!isSameType(Pair, x)) {
            throw TypeError("Arrow.both: Pair required for inner argument");
          }
          return x.bimap(runWith, runWith);
        });
      }
      return obj = {
        inspect,
        toString: inspect,
        type: type3,
        runWith,
        id,
        first,
        second,
        both,
        compose: compose2("compose"),
        map: map3("map"),
        contramap: contramap("contramap"),
        promap: promap("promap")
      }, obj[fl.id] = id, obj[fl.compose] = compose2(fl.compose), obj[fl.map] = map3(fl.map), obj[fl.contramap] = contramap(fl.contramap), obj[fl.promap] = promap(fl.promap), obj["@@type"] = _type, obj.constructor = Arrow, obj;
    }
    Arrow.id = _id;
    Arrow.type = type3;
    Arrow[fl.id] = _id;
    Arrow["@@type"] = _type;
    Arrow["@@implements"] = _implements(
      ["compose", "contramap", "id", "map", "promap"]
    );
    module.exports = Arrow;
  }
});

// node_modules/crocks/core/isTypeRepOf.js
var require_isTypeRepOf = __commonJS({
  "node_modules/crocks/core/isTypeRepOf.js"(exports, module) {
    var isFunction = require_isFunction();
    var isTypeRepOf = function(x, y) {
      return isFunction(y) && (x === y || x.name === y.name);
    };
    module.exports = isTypeRepOf;
  }
});

// node_modules/crocks/core/apOrFunc.js
var require_apOrFunc = __commonJS({
  "node_modules/crocks/core/apOrFunc.js"(exports, module) {
    var isApplicative = require_isApplicative();
    var isTypeRepOf = require_isTypeRepOf();
    var apOrFunc = function(af) {
      return function(x) {
        return isApplicative(af) ? af.of(x) : isTypeRepOf(Array, af) ? [x] : af(x);
      };
    };
    module.exports = apOrFunc;
  }
});

// node_modules/crocks/core/array.js
var require_array = __commonJS({
  "node_modules/crocks/core/array.js"(exports, module) {
    var isApply = require_isApply();
    var isArray = require_isArray();
    var isEmpty = require_isEmpty();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var isSemigroup = require_isSemigroup();
    var apOrFunc = require_apOrFunc();
    var identity = function(x) {
      return x;
    };
    var concat = function(x) {
      return function(m) {
        return x.concat(m);
      };
    };
    function runTraverse(name, fn) {
      return function(acc, x) {
        var m = fn(x);
        if (!((isApply(acc) || isArray(acc)) && isSameType(acc, m))) {
          throw new TypeError("Array." + name + ": Must wrap Applys of the same type");
        }
        if (isArray(m)) {
          return ap(acc, map3(function(v) {
            return concat([v]);
          }, m));
        }
        return m.map(function(v) {
          return concat([v]);
        }).ap(acc);
      };
    }
    var allFuncs = function(xs) {
      return xs.reduce(function(b, i) {
        return b && isFunction(i);
      }, true);
    };
    var map3 = function(f, m) {
      return m.map(function(x) {
        return f(x);
      });
    };
    function ap(x, m) {
      if (!(m.length && allFuncs(m))) {
        throw new TypeError("Array.ap: Second Array must all be functions");
      }
      return m.reduce(function(acc, f) {
        return acc.concat(map3(f, x));
      }, []);
    }
    function chain(f, m) {
      return m.reduce(function(y, x) {
        var n = f(x);
        if (!isArray(n)) {
          throw new TypeError("Array.chain: Function must return an Array");
        }
        return y.concat(n);
      }, []);
    }
    function sequence(f, m) {
      var fn = apOrFunc(f);
      return m.reduceRight(runTraverse("sequence", identity), fn([]));
    }
    function traverse(f, fn, m) {
      var af = apOrFunc(f);
      return m.reduceRight(runTraverse("traverse", fn), af([]));
    }
    function fold(m) {
      if (isEmpty(m)) {
        throw new TypeError(
          "Array.fold: Non-empty Array of Semigroups required"
        );
      }
      var head2 = m[0];
      if (!isSemigroup(head2)) {
        throw new TypeError("Array.fold: Must contain Semigroups of the same type");
      }
      return m.reduce(function(x, y) {
        if (!isSameType(x, y)) {
          throw new TypeError("Array.fold: Must contain Semigroups of the same type");
        }
        return x.concat(y);
      });
    }
    function foldMap(fn, m) {
      if (isEmpty(m)) {
        throw new TypeError(
          "Array.foldMap: Non-empty Array required"
        );
      }
      var head2 = fn(m[0]);
      if (!isSemigroup(head2)) {
        throw new TypeError(
          "Array.foldMap: Provided function must return Semigroups of the same type"
        );
      }
      return m.length === 1 ? head2 : m.slice(1).reduce(function(semi, x) {
        var val = fn(x);
        if (!(isSameType(semi, val) && isSemigroup(val))) {
          throw new TypeError(
            "Array.foldMap: Provided function must return Semigroups of the same type"
          );
        }
        return semi.concat(val);
      }, head2);
    }
    function set(indx, val, m) {
      var arr = m.slice();
      arr[indx] = val;
      return arr;
    }
    function unset(indx, m) {
      return m.slice(0, indx).concat(m.slice(indx + 1));
    }
    module.exports = {
      ap,
      chain,
      fold,
      foldMap,
      map: map3,
      sequence,
      set,
      traverse,
      unset
    };
  }
});

// node_modules/crocks/core/once.js
var require_once = __commonJS({
  "node_modules/crocks/core/once.js"(exports, module) {
    function once(fn) {
      var called, result;
      return function() {
        if (!called) {
          called = true;
          result = fn.apply(null, arguments);
        }
        return result;
      };
    }
    module.exports = once;
  }
});

// node_modules/crocks/core/_unit.js
var require_unit = __commonJS({
  "node_modules/crocks/core/_unit.js"(exports, module) {
    module.exports = Function.prototype;
  }
});

// node_modules/crocks/Async/index.js
var require_Async = __commonJS({
  "node_modules/crocks/Async/index.js"(exports, module) {
    var VERSION = 5;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var type3 = require_types().type("Async");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var array = require_array();
    var compose2 = require_compose();
    var once = require_once();
    var unit = require_unit();
    var isArray = require_isArray();
    var isFoldable = require_isFoldable();
    var isFunction = require_isFunction();
    var isInteger = require_isInteger();
    var isPromise = require_isPromise();
    var isSameType = require_isSameType();
    var allAsyncs = function(xs) {
      return xs.reduce(function(acc, x) {
        return acc && isSameType(Async2, x);
      }, true);
    };
    var _of2 = function(x) {
      return Async2(function(_, resolve) {
        return resolve(x);
      });
    };
    var Rejected = function(x) {
      return Async2(function(reject3) {
        return reject3(x);
      });
    };
    function all(asyncs) {
      if (!(isFoldable(asyncs) && allAsyncs(asyncs))) {
        throw new TypeError("Async.all: Foldable structure of Asyncs required");
      }
      if (isArray(asyncs)) {
        return array.sequence(Async2.of, asyncs);
      }
      return asyncs.sequence(Async2.of);
    }
    function fromNode(fn, ctx) {
      if (!isFunction(fn)) {
        throw new TypeError("Async.fromNode: CPS function required");
      }
      return function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return Async2(function(reject3, resolve) {
          fn.apply(
            ctx,
            args.concat(
              function(err, data) {
                return err ? reject3(err) : resolve(data);
              }
            )
          );
        });
      };
    }
    function fromPromise(fn) {
      if (!isFunction(fn)) {
        throw new TypeError("Async.fromPromise: Promise returning function required");
      }
      return function() {
        var promiseArgs = arguments;
        return Async2(function(reject3, resolve) {
          var promise = fn.apply(null, promiseArgs);
          if (!isPromise(promise)) {
            throw new TypeError("Async.fromPromise: Promise returning function required");
          }
          promise.then(resolve, reject3);
        });
      };
    }
    function rejectAfter(ms, value) {
      if (!(isInteger(ms) && ms >= 0)) {
        throw new TypeError(
          "Async.rejectAfter: Positive Integer required for first argument"
        );
      }
      return Async2(function(rej) {
        var token = setTimeout(function() {
          rej(value);
        }, ms);
        return function() {
          clearTimeout(token);
        };
      });
    }
    function resolveAfter(ms, value) {
      if (!(isInteger(ms) && ms >= 0)) {
        throw new TypeError(
          "Async.resolveAfter: Positive Integer required for first argument"
        );
      }
      return Async2(function(_, res) {
        var token = setTimeout(function() {
          res(value);
        }, ms);
        return function() {
          clearTimeout(token);
        };
      });
    }
    function Async2(fn) {
      var obj;
      if (!isFunction(fn)) {
        throw new TypeError("Async: Function required");
      }
      var of2 = _of2;
      var inspect = function() {
        return "Async" + _inspect(fn);
      };
      function fork(reject3, resolve, cleanup) {
        if (!isFunction(reject3) || !isFunction(resolve)) {
          throw new TypeError("Async.fork: Reject and resolve functions required");
        }
        var cancelled = false;
        var settled = false;
        var cancel = function() {
          cancelled = true;
        };
        var forkCancel = isFunction(cleanup) ? cleanup : unit;
        var settle = function(f, x) {
          if (!settled) {
            settled = true;
            if (cancelled) {
              return unit();
            }
            return f(x);
          }
        };
        var internal = fn(
          settle.bind(null, reject3),
          settle.bind(null, resolve)
        );
        var internalFn = isFunction(internal) ? internal : unit;
        return once(function() {
          return forkCancel(cancel(internalFn()));
        });
      }
      function toPromise() {
        return new Promise(function(resolve, reject3) {
          fork(reject3, resolve);
        });
      }
      function race(m) {
        if (!isSameType(Async2, m)) {
          throw new TypeError("Async.race: Async required");
        }
        return Async2(function(reject3, resolve) {
          var settle = once(
            function(resolved, value) {
              return resolved ? resolve(value) : reject3(value);
            }
          );
          var res = settle.bind(null, true);
          var rej = settle.bind(null, false);
          var cancelOne = fork(rej, res);
          var cancelTwo = m.fork(rej, res);
          return function() {
            cancelOne();
            cancelTwo();
          };
        });
      }
      function swap(l, r) {
        if (!isFunction(l) || !isFunction(r)) {
          throw new TypeError("Async.swap: Functions required for both arguments");
        }
        return Async2(function(reject3, resolve) {
          return fork(
            compose2(resolve, l),
            compose2(reject3, r)
          );
        });
      }
      function coalesce(l, r) {
        if (!isFunction(l) || !isFunction(r)) {
          throw new TypeError("Async.coalesce: Functions required for both arguments");
        }
        return Async2(function(reject3, resolve) {
          return fork(
            compose2(resolve, l),
            compose2(resolve, r)
          );
        });
      }
      function map3(method) {
        return function(mapFn) {
          if (!isFunction(mapFn)) {
            throw new TypeError("Async." + method + ": Function required");
          }
          return Async2(function(reject3, resolve) {
            return fork(reject3, compose2(resolve, mapFn));
          });
        };
      }
      function bimap(method) {
        return function(l, r) {
          if (!isFunction(l) || !isFunction(r)) {
            throw new TypeError("Async." + method + ": Functions required for both arguments");
          }
          return Async2(function(reject3, resolve) {
            return fork(
              compose2(reject3, l),
              compose2(resolve, r)
            );
          });
        };
      }
      function alt(method) {
        return function(m) {
          if (!isSameType(Async2, m)) {
            throw new TypeError("Async." + method + ": Async required");
          }
          return Async2(function(rej, res) {
            var cancel = unit;
            var innerCancel = unit;
            cancel = fork(
              function() {
                innerCancel = m.fork(rej, res);
              },
              res
            );
            return once(function() {
              return innerCancel(cancel());
            });
          });
        };
      }
      function ap(m) {
        if (!isSameType(Async2, m)) {
          throw new TypeError("Async.ap: Async required");
        }
        return Async2(function(reject3, resolve) {
          var apFn = null;
          var value = null;
          var fnDone = false;
          var valueDone = false;
          var cancelled = false;
          var cancel = function() {
            cancelled = true;
          };
          var rejectOnce = once(reject3);
          function resolveBoth() {
            if (!cancelled && fnDone && valueDone) {
              compose2(resolve, apFn)(value);
            }
          }
          var fnCancel = fork(rejectOnce, function(f) {
            if (!isFunction(f)) {
              throw new TypeError("Async.ap: Wrapped value must be a function");
            }
            fnDone = true;
            apFn = f;
            resolveBoth();
          });
          var valueCancel = m.fork(rejectOnce, function(x) {
            valueDone = true;
            value = x;
            resolveBoth();
          });
          return function() {
            fnCancel();
            valueCancel();
            cancel();
          };
        });
      }
      function chain(method) {
        return function(mapFn) {
          if (!isFunction(mapFn)) {
            throw new TypeError(
              "Async." + method + ": Async returning function required"
            );
          }
          return Async2(function(reject3, resolve) {
            var cancel = unit;
            var innerCancel = unit;
            cancel = fork(reject3, function(x) {
              var m = mapFn(x);
              if (!isSameType(Async2, m)) {
                throw new TypeError(
                  "Async." + method + ": Function must return another Async"
                );
              }
              innerCancel = m.fork(reject3, resolve);
            });
            return once(function() {
              return innerCancel(cancel());
            });
          });
        };
      }
      function bichain(l, r) {
        var bichainErr = "Async.bichain: Both arguments must be Async returning functions";
        if (!isFunction(l) || !isFunction(r)) {
          throw new TypeError(bichainErr);
        }
        return Async2(function(rej, res) {
          var cancel = unit;
          var innerCancel = unit;
          function setInnerCancel(mapFn) {
            return function(x) {
              var m = mapFn(x);
              if (!isSameType(Async2, m)) {
                throw new TypeError(bichainErr);
              }
              innerCancel = m.fork(rej, res);
            };
          }
          cancel = fork(setInnerCancel(l), setInnerCancel(r));
          return once(function() {
            return innerCancel(cancel());
          });
        });
      }
      return obj = {
        fork,
        toPromise,
        inspect,
        toString: inspect,
        type: type3,
        swap,
        race,
        coalesce,
        ap,
        of: of2,
        alt: alt("alt"),
        bimap: bimap("bimap"),
        map: map3("map"),
        chain: chain("chain"),
        bichain
      }, obj[fl.of] = of2, obj[fl.alt] = alt(fl.alt), obj[fl.bimap] = bimap(fl.bimap), obj[fl.map] = map3(fl.map), obj[fl.chain] = chain(fl.chain), obj["@@type"] = _type, obj.constructor = Async2, obj;
    }
    Async2.of = _of2;
    Async2.type = type3;
    Async2[fl.of] = _of2;
    Async2["@@type"] = _type;
    Async2.Rejected = Rejected;
    Async2.Resolved = _of2;
    Async2.fromPromise = fromPromise;
    Async2.fromNode = fromNode;
    Async2.all = all;
    Async2.rejectAfter = rejectAfter;
    Async2.resolveAfter = resolveAfter;
    Async2["@@implements"] = _implements(
      ["alt", "ap", "bimap", "chain", "map", "of"]
    );
    module.exports = Async2;
  }
});

// node_modules/crocks/Const/index.js
var require_Const = __commonJS({
  "node_modules/crocks/Const/index.js"(exports, module) {
    var VERSION = 3;
    var _equals2 = require_equals();
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _type = require_types().type("Const");
    var typeFn = require_types().typeFn;
    var fl = require_flNames();
    var isFunction = require_isFunction();
    var isMonoid = require_isMonoid();
    var isSameType = require_isSameType();
    var isSemigroup = require_isSemigroup();
    var typeOrName = function(m) {
      return isFunction(m.type) ? m.type() : m.name;
    };
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var empties = {
      Array: function() {
        return [];
      },
      String: function() {
        return "";
      }
    };
    var getEmpty = function(T) {
      return T[fl.empty] || T.empty || empties[T.name];
    };
    var validMonoid = function(T) {
      return isMonoid(T) || T.name === "String" || T.name === "Array";
    };
    function _Const(T) {
      if (!isFunction(T)) {
        throw new TypeError("Const: TypeRep required for construction");
      }
      var type3 = constant(_type(typeOrName(T)));
      var typeString = typeFn("Const", VERSION, typeOrName(T));
      function empty(method) {
        return function() {
          if (!validMonoid(T)) {
            throw new TypeError(type3() + "." + method + ": Must be fixed to a Monoid");
          }
          return Const(getEmpty(T)());
        };
      }
      function of2(method) {
        return function() {
          if (!validMonoid(T)) {
            throw new TypeError(type3() + "." + method + ": Must be fixed to a Monoid");
          }
          return Const(getEmpty(T)());
        };
      }
      function Const(value) {
        var obj;
        if (!isSameType(T, value)) {
          throw new TypeError(type3() + ": " + typeOrName(T) + " required");
        }
        var inspect = constant("" + type3() + _inspect(value));
        var valueOf = constant(value);
        var equals3 = function(m) {
          return isSameType(Const, m) && _equals2(value, m.valueOf());
        };
        function concat(method) {
          return function(m) {
            if (!isSemigroup(value)) {
              throw new TypeError(type3() + "." + method + ": Must be fixed to a Semigroup");
            }
            if (!isSameType(Const, m)) {
              throw new TypeError(type3() + "." + method + ": " + type3() + " required");
            }
            return Const(value.concat(m.valueOf()));
          };
        }
        function map3(method) {
          return function(fn) {
            if (!isFunction(fn)) {
              throw new TypeError(type3() + "." + method + ": Function required");
            }
            return Const(value);
          };
        }
        function ap(m) {
          if (!isSemigroup(value)) {
            throw new TypeError(type3() + ".ap: Must be fixed to a Semigroup");
          }
          if (!isSameType(Const, m)) {
            throw new TypeError(type3() + ".ap: " + type3() + " required");
          }
          return Const(value.concat(m.valueOf()));
        }
        return obj = {
          inspect,
          toString: inspect,
          valueOf,
          type: type3,
          ap,
          equals: equals3,
          concat: concat("concat"),
          empty: empty("empty"),
          map: map3("map"),
          of: of2("of")
        }, obj[fl.concat] = concat(fl.concat), obj[fl.empty] = empty(fl.empty), obj[fl.equals] = equals3, obj[fl.map] = map3(fl.map), obj[fl.of] = of2(fl.of), obj["@@type"] = typeString, obj.constructor = Const, obj;
      }
      Const.empty = empty("empty");
      Const.of = of2("of");
      Const.type = type3;
      Const[fl.empty] = empty(fl.empty);
      Const[fl.of] = of2(fl.of);
      Const["@@type"] = typeString;
      Const["@@implements"] = _implements(
        ["ap", "concat", "empty", "equals", "map", "of"]
      );
      return Const;
    }
    module.exports = _Const;
  }
});

// node_modules/crocks/core/defineUnion.js
var require_defineUnion = __commonJS({
  "node_modules/crocks/core/defineUnion.js"(exports, module) {
    var curry = require_curry();
    var isArray = require_isArray();
    var isEmpty = require_isEmpty();
    var isFunction = require_isFunction();
    var isObject = require_isObject();
    var isString = require_isString();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var isDefinition = function(x) {
      return isString(x) && x.length;
    };
    function caseOf(defs) {
      return function(cases, m) {
        var tag = m.tag;
        var def = defs[tag()];
        var args = def.reduce(
          function(xs, x) {
            return xs.concat([m[x].value()]);
          },
          []
        );
        return cases[tag()].apply(null, args);
      };
    }
    var includes = function(defs) {
      return function(m) {
        return !!m && isFunction(m.tag) && Object.keys(defs).indexOf(m.tag()) !== -1;
      };
    };
    function construction(def, tag) {
      return function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return def.reduce(function(obj, key, index) {
          obj[key] = { value: constant(args[index]) };
          return obj;
        }, { tag: constant(tag) });
      };
    }
    function defineUnion(defs) {
      if (!isObject(defs) || isEmpty(defs)) {
        throw new TypeError("defineUnion: Argument must be an Object containing definition lists");
      }
      return Object.keys(defs).reduce(function(obj, tag) {
        var def = defs[tag];
        if (!isArray(def) || !def.reduce(function(x, y) {
          return x && isDefinition(y);
        }, true)) {
          throw new TypeError("defineUnion: Definitions must be a list of non-empty string identifiers");
        }
        obj[tag] = construction(def, tag);
        return obj;
      }, { caseOf: curry(caseOf(defs)), includes: curry(includes(defs)) });
    }
    module.exports = defineUnion;
  }
});

// node_modules/crocks/core/innerConcat.js
var require_innerConcat = __commonJS({
  "node_modules/crocks/core/innerConcat.js"(exports, module) {
    var isSameType = require_isSameType();
    var isSemigroup = require_isSemigroup();
    function innerConcat(method, m) {
      return function(left) {
        if (!isSemigroup(left)) {
          throw new TypeError(method + ": Both containers must contain Semigroups of the same type");
        }
        return m.map(function(right) {
          if (!isSameType(left, right)) {
            throw new TypeError(method + ": Both containers must contain Semigroups of the same type");
          }
          return left.concat(right);
        });
      };
    }
    module.exports = innerConcat;
  }
});

// node_modules/crocks/Either/index.js
var require_Either = __commonJS({
  "node_modules/crocks/Either/index.js"(exports, module) {
    var VERSION = 4;
    var _defineUnion = require_defineUnion();
    var _equals2 = require_equals();
    var _implements = require_implements();
    var _innerConcat = require_innerConcat();
    var _inspect = require_inspect();
    var type3 = require_types().type("Either");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var apOrFunc = require_apOrFunc();
    var compose2 = require_compose();
    var isArray = require_isArray();
    var isApplicative = require_isApplicative();
    var isApply = require_isApply();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var _either = _defineUnion({ Left: ["a"], Right: ["b"] });
    var Left = _either.Left;
    var Right = _either.Right;
    Either.Left = compose2(Either, Left);
    Either.Right = compose2(Either, Right);
    var _of2 = Either.Right;
    function runSequence(x) {
      if (!(isApply(x) || isArray(x))) {
        throw new TypeError("Either.sequence: Must wrap an Apply");
      }
      return x.map(_of2);
    }
    function Either(u) {
      var obj;
      if (!arguments.length) {
        throw new TypeError("Either: Must wrap something, try using Left or Right constructors");
      }
      var x = !_either.includes(u) ? Right(u) : u;
      var equals3 = function(m) {
        return isSameType(Either, m) && either(
          function(x2) {
            return m.either(function(y) {
              return _equals2(y, x2);
            }, constant(false));
          },
          function(x2) {
            return m.either(constant(false), function(y) {
              return _equals2(y, x2);
            });
          }
        );
      };
      var of2 = _of2;
      var inspect = function() {
        return either(
          function(l) {
            return "Left" + _inspect(l);
          },
          function(r) {
            return "Right" + _inspect(r);
          }
        );
      };
      function either(f, g) {
        if (!isFunction(f) || !isFunction(g)) {
          throw new TypeError("Either.either: Requires both left and right functions");
        }
        return _either.caseOf({
          Left: f,
          Right: g
        }, x);
      }
      function concat(method) {
        return function(m) {
          if (!isSameType(Either, m)) {
            throw new TypeError("Either." + method + ": Either of Semigroup required");
          }
          return either(
            Either.Left,
            _innerConcat("Either." + method, m)
          );
        };
      }
      function swap(f, g) {
        if (!isFunction(f) || !isFunction(g)) {
          throw new TypeError("Either.swap: Requires both left and right functions");
        }
        return either(
          compose2(Either.Right, f),
          compose2(Either.Left, g)
        );
      }
      function coalesce(f, g) {
        if (!isFunction(f) || !isFunction(g)) {
          throw new TypeError("Either.coalesce: Requires both left and right functions");
        }
        return Either.Right(either(f, g));
      }
      function bichain(l, r) {
        var bichainErr = "Either.bichain: Both arguments must be Either returning functions";
        if (!(isFunction(l) && isFunction(r))) {
          throw new TypeError(bichainErr);
        }
        var m = either(l, r);
        if (!isSameType(Either, m)) {
          throw new TypeError(bichainErr);
        }
        return m;
      }
      function map3(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Either." + method + ": Function required");
          }
          return either(Either.Left, compose2(Either.Right, fn));
        };
      }
      function bimap(method) {
        return function(f, g) {
          if (!isFunction(f) || !isFunction(g)) {
            throw new TypeError("Either." + method + ": Requires both left and right functions");
          }
          return either(
            compose2(Either.Left, f),
            compose2(Either.Right, g)
          );
        };
      }
      function alt(method) {
        return function(m) {
          if (!isSameType(Either, m)) {
            throw new TypeError("Either." + method + ": Either required");
          }
          return either(
            constant(m),
            Either.Right
          );
        };
      }
      function ap(m) {
        if (!either(constant(true), isFunction)) {
          throw new TypeError("Either.ap: Wrapped value must be a function");
        } else if (!either(constant(true), constant(isSameType(Either, m)))) {
          throw new TypeError("Either.ap: Either required");
        }
        return either(
          Either.Left,
          function(fn) {
            return m.map(fn);
          }
        );
      }
      function chain(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Either." + method + ": Function required");
          }
          var m = either(Either.Left, fn);
          if (!isSameType(Either, m)) {
            throw new TypeError("Either." + method + ": Function must return an Either");
          }
          return m;
        };
      }
      function sequence(f) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "Either.sequence: Applicative TypeRep or Apply returning function required"
          );
        }
        var af = apOrFunc(f);
        return either(
          compose2(af, Either.Left),
          runSequence
        );
      }
      function traverse(f, fn) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "Either.traverse: Applicative TypeRep or Apply returning function required for first argument"
          );
        }
        if (!isFunction(fn)) {
          throw new TypeError(
            "Either.traverse: Apply returning function required for second argument"
          );
        }
        var af = apOrFunc(f);
        var m = either(compose2(af, Either.Left), fn);
        if (!(isApply(m) || isArray(m))) {
          throw new TypeError(
            "Either.traverse: Both functions must return an Apply of the same type"
          );
        }
        return either(
          constant(m),
          constant(m.map(_of2))
        );
      }
      return obj = {
        inspect,
        toString: inspect,
        either,
        type: type3,
        swap,
        coalesce,
        bichain,
        equals: equals3,
        ap,
        of: of2,
        sequence,
        traverse,
        alt: alt("alt"),
        bimap: bimap("bimap"),
        concat: concat("concat"),
        chain: chain("chain"),
        map: map3("map")
      }, obj[fl.of] = of2, obj[fl.equals] = equals3, obj[fl.alt] = alt(fl.alt), obj[fl.bimap] = bimap(fl.bimap), obj[fl.concat] = concat(fl.concat), obj[fl.map] = map3(fl.map), obj[fl.chain] = chain(fl.chain), obj["@@type"] = _type, obj.constructor = Either, obj;
    }
    Either.of = _of2;
    Either.type = type3;
    Either[fl.of] = _of2;
    Either["@@type"] = _type;
    Either["@@implements"] = _implements(
      ["alt", "ap", "bimap", "chain", "concat", "equals", "map", "of", "traverse"]
    );
    module.exports = Either;
  }
});

// node_modules/crocks/Equiv/index.js
var require_Equiv = __commonJS({
  "node_modules/crocks/Equiv/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var type3 = require_types().type("Equiv");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var _empty = function() {
      return Equiv(function() {
        return true;
      });
    };
    function Equiv(compare) {
      var obj;
      if (!isFunction(compare)) {
        throw new TypeError("Equiv: Comparison function required");
      }
      var compareWith = curry(
        function(x, y) {
          return !!compare(x, y);
        }
      );
      var inspect = function() {
        return "Equiv" + _inspect(compare);
      };
      var empty = _empty;
      var valueOf = function() {
        return compareWith;
      };
      function contramap(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Equiv." + method + ": Function required");
          }
          return Equiv(
            function(x, y) {
              return compareWith(fn(x), fn(y));
            }
          );
        };
      }
      function concat(method) {
        return function(m) {
          if (!isSameType(Equiv, m)) {
            throw new TypeError("Equiv." + method + ": Equiv required");
          }
          return Equiv(
            function(x, y) {
              return compareWith(x, y) && m.compareWith(x, y);
            }
          );
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        type: type3,
        compareWith,
        valueOf,
        empty,
        concat: concat("concat"),
        contramap: contramap("contramap")
      }, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj[fl.contramap] = contramap(fl.contramap), obj["@@type"] = _type, obj.constructor = Equiv, obj;
    }
    Equiv.empty = _empty;
    Equiv.type = type3;
    Equiv[fl.empty] = _empty;
    Equiv["@@type"] = _type;
    Equiv["@@implements"] = _implements(
      ["concat", "contramap", "empty"]
    );
    module.exports = Equiv;
  }
});

// node_modules/crocks/Identity/index.js
var require_Identity = __commonJS({
  "node_modules/crocks/Identity/index.js"(exports, module) {
    var VERSION = 3;
    var _equals2 = require_equals();
    var _implements = require_implements();
    var _innerConcat = require_innerConcat();
    var _inspect = require_inspect();
    var type3 = require_types().type("Identity");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isArray = require_isArray();
    var isApply = require_isApply();
    var isApplicative = require_isApplicative();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var _of2 = Identity2;
    function Identity2(x) {
      var obj;
      if (!arguments.length) {
        throw new TypeError("Identity: Must wrap something");
      }
      var valueOf = function() {
        return x;
      };
      var of2 = _of2;
      var equals3 = function(m) {
        return isSameType(Identity2, m) && _equals2(x, m.valueOf());
      };
      var inspect = function() {
        return "Identity" + _inspect(x);
      };
      function concat(method) {
        return function(m) {
          if (!isSameType(Identity2, m)) {
            throw new TypeError("Identity." + method + ": Identity of Semigroup required");
          }
          return _innerConcat("Identity." + method, m)(x);
        };
      }
      function map3(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Identity." + method + ": Function required");
          }
          return Identity2(fn(x));
        };
      }
      function ap(m) {
        if (!isFunction(x)) {
          throw new TypeError("Identity.ap: Wrapped value must be a function");
        } else if (!isSameType(Identity2, m)) {
          throw new TypeError("Identity.ap: Identity required");
        }
        return m.map(x);
      }
      function chain(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Identity." + method + ": Function required");
          }
          var m = fn(x);
          if (!isSameType(Identity2, m)) {
            throw new TypeError("Identity." + method + ": Function must return an Identity");
          }
          return m;
        };
      }
      function sequence(f) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "Identity.sequence: Applicative TypeRep or Apply returning function required"
          );
        }
        if (!(isApply(x) || isArray(x))) {
          throw new TypeError("Identity.sequence: Must wrap an Apply");
        }
        return x.map(_of2);
      }
      function traverse(f, fn) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "Identity.traverse: Applicative TypeRep or Apply returning function required for first argument"
          );
        }
        if (!isFunction(fn)) {
          throw new TypeError(
            "Identity.traverse: Apply returning functions required for second argument"
          );
        }
        var m = fn(x);
        if (!(isApply(m) || isArray(m))) {
          throw new TypeError(
            "Identity.traverse: Both functions must return an Apply of the same type"
          );
        }
        return m.map(_of2);
      }
      return obj = {
        inspect,
        toString: inspect,
        valueOf,
        type: type3,
        equals: equals3,
        ap,
        of: of2,
        sequence,
        traverse,
        concat: concat("concat"),
        map: map3("map"),
        chain: chain("chain")
      }, obj[fl.of] = of2, obj[fl.equals] = equals3, obj[fl.concat] = concat(fl.concat), obj[fl.map] = map3(fl.map), obj[fl.chain] = chain(fl.chain), obj["@@type"] = _type, obj.constructor = Identity2, obj;
    }
    Identity2.of = _of2;
    Identity2.type = type3;
    Identity2[fl.of] = _of2;
    Identity2["@@type"] = _type;
    Identity2["@@implements"] = _implements(
      ["ap", "chain", "concat", "equals", "map", "of", "traverse"]
    );
    module.exports = Identity2;
  }
});

// node_modules/crocks/IO/index.js
var require_IO = __commonJS({
  "node_modules/crocks/IO/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var type3 = require_types().type("IO");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var compose2 = require_compose();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var _of2 = function(x) {
      return IO(function() {
        return x;
      });
    };
    function IO(run) {
      var obj;
      if (!isFunction(run)) {
        throw new TypeError("IO: Must wrap a function");
      }
      var of2 = _of2;
      var inspect = function() {
        return "IO" + _inspect(run);
      };
      function map3(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("IO." + method + ": Function required");
          }
          return IO(compose2(fn, run));
        };
      }
      function ap(m) {
        if (!isSameType(IO, m)) {
          throw new TypeError("IO.ap: IO required");
        }
        return IO(function() {
          var fn = run();
          if (!isFunction(fn)) {
            throw new TypeError("IO.ap: Wrapped value must be a function");
          }
          return m.map(fn).run();
        });
      }
      function chain(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("IO." + method + ": Function required");
          }
          return IO(function() {
            var m = fn(run());
            if (!isSameType(IO, m)) {
              throw new TypeError("IO." + method + ": Function must return an IO");
            }
            return m.run();
          });
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        run,
        type: type3,
        ap,
        of: of2,
        map: map3("map"),
        chain: chain("chain")
      }, obj[fl.of] = of2, obj[fl.map] = map3(fl.map), obj[fl.chain] = chain(fl.chain), obj["@@type"] = _type, obj.constructor = IO, obj;
    }
    IO.of = _of2;
    IO.type = type3;
    IO[fl.of] = _of2;
    IO["@@type"] = _type;
    IO["@@implements"] = _implements(
      ["ap", "chain", "map", "of"]
    );
    module.exports = IO;
  }
});

// node_modules/crocks/core/Maybe.js
var require_Maybe = __commonJS({
  "node_modules/crocks/core/Maybe.js"(exports, module) {
    var VERSION = 4;
    var _defineUnion = require_defineUnion();
    var _equals2 = require_equals();
    var _implements = require_implements();
    var _innerConcat = require_innerConcat();
    var _inspect = require_inspect();
    var type3 = require_types().type("Maybe");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var apOrFunc = require_apOrFunc();
    var compose2 = require_compose();
    var isApplicative = require_isApplicative();
    var isApply = require_isApply();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var identity = function(x) {
      return x;
    };
    var _maybe = _defineUnion({ Nothing: [], Just: ["a"] });
    var Nothing = _maybe.Nothing;
    var Just = _maybe.Just;
    Maybe.Nothing = compose2(Maybe, Nothing);
    Maybe.Just = compose2(Maybe, Just);
    var _of2 = compose2(Maybe, Just);
    var _zero = compose2(Maybe, Nothing);
    function runSequence(x) {
      if (!(isApply(x) || isArray(x))) {
        throw new TypeError(
          "Maybe.sequence: Must wrap an Apply"
        );
      }
      return x.map(_of2);
    }
    function Maybe(u) {
      var obj;
      if (!arguments.length) {
        throw new TypeError("Maybe: Must wrap something, try using Nothing or Just constructors");
      }
      var x = !_maybe.includes(u) ? Just(u) : u;
      var of2 = _of2;
      var zero = _zero;
      var option = function(n) {
        return either(constant(n), identity);
      };
      var equals3 = function(m) {
        return isSameType(Maybe, m) && either(
          constant(m.either(constant(true), constant(false))),
          function(x2) {
            return m.either(constant(false), function(y) {
              return _equals2(y, x2);
            });
          }
        );
      };
      var inspect = function() {
        return either(
          constant("Nothing"),
          function(x2) {
            return "Just" + _inspect(x2);
          }
        );
      };
      function either(f, g) {
        if (!isFunction(f) || !isFunction(g)) {
          throw new TypeError("Maybe.either: Requires both left and right functions");
        }
        return _maybe.caseOf({
          Nothing: f,
          Just: g
        }, x);
      }
      function concat(method) {
        return function(m) {
          if (!isSameType(Maybe, m)) {
            throw new TypeError("Maybe." + method + ": Maybe of Semigroup required");
          }
          return either(
            Maybe.Nothing,
            _innerConcat("Maybe." + method, m)
          );
        };
      }
      function coalesce(f, g) {
        if (!isFunction(f) || !isFunction(g)) {
          throw new TypeError("Maybe.coalesce: Requires both left and right functions");
        }
        return Maybe.Just(either(f, g));
      }
      function bichain(l, r) {
        var bichainErr = "Maybe.bichain: Both arguments must be Maybe returning functions";
        if (!(isFunction(l) && isFunction(r))) {
          throw new TypeError(bichainErr);
        }
        var m = either(l, r);
        if (!isSameType(Maybe, m)) {
          throw new TypeError(bichainErr);
        }
        return m;
      }
      function map3(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Maybe." + method + ": Function required");
          }
          return either(
            Maybe.Nothing,
            compose2(Maybe.Just, fn)
          );
        };
      }
      function alt(method) {
        return function(m) {
          if (!isSameType(Maybe, m)) {
            throw new TypeError("Maybe." + method + ": Maybe required");
          }
          return either(
            constant(m),
            Maybe.Just
          );
        };
      }
      function ap(m) {
        var fn = option(constant(void 0));
        if (!isFunction(fn)) {
          throw new TypeError("Maybe.ap: Wrapped value must be a function");
        } else if (!isSameType(Maybe, m)) {
          throw new TypeError("Maybe.ap: Maybe required");
        }
        return either(
          Maybe.Nothing,
          m.map
        );
      }
      function chain(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Maybe." + method + ": Function required");
          }
          var m = either(Maybe.Nothing, fn);
          if (!isSameType(Maybe, m)) {
            throw new TypeError("Maybe." + method + ": Function must return a Maybe");
          }
          return m;
        };
      }
      function sequence(f) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "Maybe.sequence: Applicative TypeRep or Apply returning function required"
          );
        }
        var af = apOrFunc(f);
        return either(
          compose2(af, Maybe.Nothing),
          runSequence
        );
      }
      function traverse(f, fn) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "Maybe.traverse: Applicative TypeRep or Apply returning function required for first argument"
          );
        }
        if (!isFunction(fn)) {
          throw new TypeError(
            "Maybe.traverse: Apply returning function required for second argument"
          );
        }
        var af = apOrFunc(f);
        var m = either(compose2(af, Maybe.Nothing), fn);
        if (!(isApply(m) || isArray(m))) {
          throw new TypeError(
            "Maybe.traverse: Both functions must return an Apply of the same type"
          );
        }
        return either(
          constant(m),
          constant(m.map(_of2))
        );
      }
      return obj = {
        inspect,
        toString: inspect,
        either,
        option,
        type: type3,
        equals: equals3,
        bichain,
        coalesce,
        zero,
        ap,
        of: of2,
        sequence,
        traverse,
        alt: alt("alt"),
        chain: chain("chain"),
        concat: concat("concat"),
        map: map3("map")
      }, obj[fl.zero] = zero, obj[fl.of] = of2, obj[fl.equals] = equals3, obj[fl.alt] = alt(fl.alt), obj[fl.concat] = concat(fl.concat), obj[fl.map] = map3(fl.map), obj[fl.chain] = chain(fl.chain), obj["@@type"] = _type, obj.constructor = Maybe, obj;
    }
    Maybe.of = _of2;
    Maybe.zero = _zero;
    Maybe.type = type3;
    Maybe[fl.of] = _of2;
    Maybe[fl.zero] = _zero;
    Maybe["@@type"] = _type;
    Maybe["@@implements"] = _implements(
      ["alt", "ap", "chain", "concat", "equals", "map", "of", "traverse", "zero"]
    );
    module.exports = Maybe;
  }
});

// node_modules/crocks/core/List.js
var require_List = __commonJS({
  "node_modules/crocks/core/List.js"(exports, module) {
    var VERSION = 4;
    var _equals2 = require_equals();
    var _implements = require_implements();
    var _inspect = require_inspect();
    var type3 = require_types().type("List");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var array = require_array();
    var apOrFunc = require_apOrFunc();
    var isApplicative = require_isApplicative();
    var isApply = require_isApply();
    var isArray = require_isArray();
    var isEmpty = require_isEmpty();
    var isFunction = require_isFunction();
    var isPredOrFunc = require_isPredOrFunc();
    var isSameType = require_isSameType();
    var isSemigroup = require_isSemigroup();
    var predOrFunc = require_predOrFunc();
    var not = function(fn) {
      return function(x) {
        return !fn(x);
      };
    };
    var _prepend = function(x) {
      return function(m) {
        return x.concat(m);
      };
    };
    var ref = require_Maybe();
    var Nothing = ref.Nothing;
    var Just = ref.Just;
    var _of2 = function(x) {
      return List([x]);
    };
    var _empty = function() {
      return List([]);
    };
    function fromArray(xs) {
      if (!isArray(xs)) {
        throw new TypeError("List.fromArray: Array required");
      }
      return xs.reduce(function(res, x) {
        return res.concat(List.of(x));
      }, List.empty());
    }
    function applyTraverse(x, y) {
      if (isArray(x)) {
        return array.ap(x, array.map(function(v) {
          return _prepend(List.of(v));
        }, y));
      }
      return y.map(function(v) {
        return _prepend(List.of(v));
      }).ap(x);
    }
    function runSequence(acc, x) {
      if (!((isApply(acc) || isArray(acc)) && isSameType(acc, x))) {
        throw new TypeError(
          "List.sequence: Must wrap Applys of the same type"
        );
      }
      return applyTraverse(acc, x);
    }
    function runTraverse(f) {
      return function(acc, x) {
        var m = f(x);
        if (!((isApply(acc) || isArray(acc)) && isSameType(acc, m))) {
          throw new TypeError("List.traverse: Both functions must return an Apply of the same type");
        }
        return applyTraverse(acc, m);
      };
    }
    function List(x) {
      var obj;
      if (!arguments.length) {
        throw new TypeError("List: List must wrap something");
      }
      var xs = isArray(x) ? x.slice() : [x];
      function flatMap(method, fn) {
        return function(y, x2) {
          var m = fn(x2);
          if (!isSameType(List, m)) {
            throw new TypeError("List." + method + ": Function must return a List");
          }
          return y.concat(m.valueOf());
        };
      }
      var of2 = _of2;
      var valueOf = function() {
        return xs.slice();
      };
      var toArray = valueOf;
      var empty = _empty;
      var inspect = function() {
        return "List" + _inspect(xs);
      };
      var head2 = function() {
        return xs.length ? Just(xs[0]) : Nothing();
      };
      var tail2 = function() {
        return xs.length && xs.length > 1 ? Just(List(xs.slice(1))) : Nothing();
      };
      var cons = function(x2) {
        return List([x2].concat(xs));
      };
      var equals3 = function(m) {
        return isSameType(List, m) && _equals2(xs, m.valueOf());
      };
      function concat(method) {
        return function(m) {
          if (!isSameType(List, m)) {
            throw new TypeError("List." + method + ": List required");
          }
          return List(xs.concat(m.valueOf()));
        };
      }
      function reduce2(method) {
        return function(fn, i) {
          if (!isFunction(fn)) {
            throw new TypeError("List." + method + ": Function required for first argument");
          }
          return xs.reduce(fn, i);
        };
      }
      function reduceRight(fn, i) {
        if (!isFunction(fn)) {
          throw new TypeError("List.reduceRight: Function required for first argument");
        }
        return xs.reduceRight(fn, i);
      }
      function fold() {
        if (isEmpty(xs)) {
          throw new TypeError("List.fold: List must contain at least one Semigroup");
        }
        var head3 = xs[0];
        if (!isSemigroup(head3)) {
          throw new TypeError("List.fold: List must contain Semigroups of the same type");
        }
        return xs.reduce(function(x2, y) {
          if (!isSameType(x2, y)) {
            throw new TypeError("List.fold: List must contain Semigroups of the same type");
          }
          return x2.concat(y);
        });
      }
      function foldMap(fn) {
        if (!isFunction(fn)) {
          throw new TypeError(
            "List.foldMap: Semigroup returning function required"
          );
        }
        if (isEmpty(xs)) {
          throw new TypeError(
            "List.foldMap: List must not be empty"
          );
        }
        var head3 = fn(xs[0]);
        if (!isSemigroup(head3)) {
          throw new TypeError(
            "List.foldMap: Provided function must return Semigroups of the same type"
          );
        }
        return xs.length !== 1 ? xs.slice(1).reduce(function(semi, x2) {
          var val = fn(x2);
          if (!(isSameType(semi, val) && isSemigroup(val))) {
            throw new TypeError(
              "List.foldMap: Provided function must return Semigroups of the same type"
            );
          }
          return semi.concat(val);
        }, head3) : head3;
      }
      function filter2(method) {
        return function(pred) {
          if (!isPredOrFunc(pred)) {
            throw new TypeError("List." + method + ": Pred or predicate function required");
          }
          return List(
            xs.reduce(
              function(x2, y) {
                return predOrFunc(pred, y) ? x2.concat([y]) : x2;
              },
              []
            )
          );
        };
      }
      function reject3(pred) {
        if (!isPredOrFunc(pred)) {
          throw new TypeError("List.reject: Pred or predicate function required");
        }
        var fn = not(function(x2) {
          return predOrFunc(pred, x2);
        });
        return List(
          xs.reduce(
            function(x2, y) {
              return fn(y) ? x2.concat([y]) : x2;
            },
            []
          )
        );
      }
      function map3(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("List." + method + ": Function required");
          }
          return List(xs.map(function(x2) {
            return fn(x2);
          }));
        };
      }
      function ap(m) {
        if (!isSameType(List, m)) {
          throw new TypeError("List.ap: List required");
        }
        var ar = m.valueOf();
        return List(
          xs.reduce(function(acc, fn) {
            if (!isFunction(fn)) {
              throw new TypeError("List.ap: Wrapped values must all be functions");
            }
            return acc.concat(ar.map(function(x2) {
              return fn(x2);
            }));
          }, [])
        );
      }
      function chain(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("List." + method + ": Function required");
          }
          return List(xs.reduce(flatMap(method, fn), []));
        };
      }
      function sequence(f) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "List.sequence: Applicative TypeRep or Apply returning function required"
          );
        }
        var af = apOrFunc(f);
        return reduceRight(
          runSequence,
          af(List.empty())
        );
      }
      function traverse(f, fn) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "List.traverse: Applicative TypeRep or Apply returning function required for first argument"
          );
        }
        if (!isFunction(fn)) {
          throw new TypeError(
            "List.traverse: Apply returning functions required for second argument"
          );
        }
        var af = apOrFunc(f);
        return reduceRight(
          runTraverse(fn),
          af(List.empty())
        );
      }
      return obj = {
        inspect,
        toString: inspect,
        valueOf,
        toArray,
        head: head2,
        tail: tail2,
        cons,
        type: type3,
        equals: equals3,
        empty,
        reduceRight,
        fold,
        foldMap,
        reject: reject3,
        ap,
        of: of2,
        sequence,
        traverse,
        concat: concat("concat"),
        map: map3("map"),
        chain: chain("chain"),
        reduce: reduce2("reduce"),
        filter: filter2("filter")
      }, obj[fl.of] = of2, obj[fl.equals] = equals3, obj[fl.concat] = concat(fl.concat), obj[fl.empty] = empty, obj[fl.map] = map3(fl.map), obj[fl.chain] = chain(fl.chain), obj[fl.reduce] = reduce2(fl.reduce), obj[fl.filter] = filter2(fl.filter), obj["@@type"] = _type, obj.constructor = List, obj;
    }
    List.of = _of2;
    List.empty = _empty;
    List.type = type3;
    List[fl.of] = _of2;
    List[fl.empty] = _empty;
    List["@@type"] = _type;
    List.fromArray = fromArray;
    List["@@implements"] = _implements(
      ["ap", "chain", "concat", "empty", "equals", "map", "of", "reduce", "traverse"]
    );
    module.exports = List;
  }
});

// node_modules/crocks/List/index.js
var require_List2 = __commonJS({
  "node_modules/crocks/List/index.js"(exports, module) {
    module.exports = require_List();
  }
});

// node_modules/crocks/Maybe/index.js
var require_Maybe2 = __commonJS({
  "node_modules/crocks/Maybe/index.js"(exports, module) {
    module.exports = require_Maybe();
  }
});

// node_modules/crocks/core/Pair.js
var require_Pair = __commonJS({
  "node_modules/crocks/core/Pair.js"(exports, module) {
    var VERSION = 4;
    var _equals2 = require_equals();
    var _implements = require_implements();
    var _inspect = require_inspect();
    var type3 = require_types().type("Pair");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isApplicative = require_isApplicative();
    var isApply = require_isApply();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var isSemigroup = require_isSemigroup();
    function Pair(l, r) {
      var obj;
      if (arguments.length < 2) {
        throw new TypeError("Pair: Must provide a first and second value");
      }
      var fst = function() {
        return l;
      };
      var snd = function() {
        return r;
      };
      var inspect = function() {
        return "Pair(" + _inspect(l) + "," + _inspect(r) + " )";
      };
      var toArray = function() {
        return [l, r];
      };
      function merge(fn) {
        if (!isFunction(fn)) {
          throw new TypeError("Pair.merge: Binary function required");
        }
        return fn(fst(), snd());
      }
      function equals3(m) {
        return isSameType(Pair, m) && _equals2(m.fst(), fst()) && _equals2(m.snd(), snd());
      }
      function concat(method) {
        return function(m) {
          if (!isSameType(Pair, m)) {
            throw new TypeError("Pair." + method + ": Pair required");
          }
          var lf = fst();
          var ls = snd();
          var rf = m.fst();
          var rs = m.snd();
          if (!(isSemigroup(lf) && isSemigroup(ls))) {
            throw new TypeError("Pair." + method + ": Both Pairs must contain Semigroups of the same type");
          }
          if (!(isSameType(lf, rf) && isSameType(ls, rs))) {
            throw new TypeError("Pair." + method + ": Both Pairs must contain Semigroups of the same type");
          }
          return Pair(
            lf.concat(rf),
            ls.concat(rs)
          );
        };
      }
      function swap(f, g) {
        if (!isFunction(f) || !isFunction(g)) {
          throw new TypeError("Pair.swap: Requires both left and right functions");
        }
        return Pair(g(r), f(l));
      }
      function map3(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Pair." + method + ": Function required");
          }
          return Pair(l, fn(r));
        };
      }
      function bimap(method) {
        return function(f, g) {
          if (!isFunction(f) || !isFunction(g)) {
            throw new TypeError("Pair." + method + ": Function required for both arguments");
          }
          return Pair(f(l), g(r));
        };
      }
      function ap(m) {
        if (!isSameType(Pair, m)) {
          throw new TypeError("Pair.ap: Pair required");
        }
        var fn = snd();
        if (!isFunction(fn)) {
          throw new TypeError("Pair.ap: Function required for second value");
        }
        var l2 = fst();
        var r2 = m.fst();
        if (!(isSemigroup(l2) && isSameType(l2, r2))) {
          throw new TypeError("Pair.ap: Semigroups of the same type is required for first values");
        }
        return Pair(l2.concat(r2), fn(m.snd()));
      }
      function chain(method) {
        return function(fn) {
          var l2 = fst();
          if (!isFunction(fn)) {
            throw new TypeError("Pair." + method + ": Function required");
          }
          if (!isSemigroup(l2)) {
            throw new TypeError("Pair." + method + ": Semigroups of the same type required for first values");
          }
          var m = fn(snd());
          if (!isSameType(Pair, m)) {
            throw new TypeError("Pair." + method + ": Function must return a Pair");
          }
          var r2 = m.fst();
          if (!isSameType(l2, r2)) {
            throw new TypeError("Pair." + method + ": Semigroups of the same type required for first values");
          }
          return Pair(
            l2.concat(r2),
            m.snd()
          );
        };
      }
      function sequence(f) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "Pair.sequence: Applicative TypeRep or Apply returning function required"
          );
        }
        if (!(isApply(r) || isArray(r))) {
          throw new TypeError(
            "Pair.sequence: Must wrap an Apply in the second"
          );
        }
        return r.map(function(v) {
          return Pair(l, v);
        });
      }
      function traverse(f, fn) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "Pair.traverse: Applicative TypeRep or Apply returning function required for first argument"
          );
        }
        if (!isFunction(fn)) {
          throw new TypeError(
            "Pair.traverse: Apply returning function required for second argument"
          );
        }
        var m = fn(r);
        if (!(isApply(m) || isArray(m))) {
          throw new TypeError(
            "Pair.traverse: Both functions must return an Apply of the same type"
          );
        }
        return m.map(function(v) {
          return Pair(l, v);
        });
      }
      function extend(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Pair." + method + ": Function required");
          }
          return Pair(l, fn(Pair(l, r)));
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        fst,
        snd,
        toArray,
        type: type3,
        merge,
        equals: equals3,
        swap,
        ap,
        sequence,
        traverse,
        concat: concat("concat"),
        map: map3("map"),
        bimap: bimap("bimap"),
        chain: chain("chain"),
        extend: extend("extend")
      }, obj[fl.equals] = equals3, obj[fl.concat] = concat(fl.concat), obj[fl.map] = map3(fl.map), obj[fl.bimap] = bimap(fl.bimap), obj[fl.chain] = chain(fl.chain), obj[fl.extend] = extend(fl.extend), obj["@@type"] = _type, obj.constructor = Pair, obj;
    }
    Pair.type = type3;
    Pair["@@type"] = _type;
    Pair["@@implements"] = _implements(
      ["ap", "bimap", "chain", "concat", "extend", "equals", "map", "traverse"]
    );
    module.exports = Pair;
  }
});

// node_modules/crocks/Pair/index.js
var require_Pair2 = __commonJS({
  "node_modules/crocks/Pair/index.js"(exports, module) {
    module.exports = require_Pair();
  }
});

// node_modules/crocks/core/Pred.js
var require_Pred = __commonJS({
  "node_modules/crocks/core/Pred.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var type3 = require_types().type("Pred");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var compose2 = require_compose();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var _empty = function() {
      return Pred(function() {
        return true;
      });
    };
    function Pred(pred) {
      var obj;
      if (!isFunction(pred)) {
        throw new TypeError("Pred: Predicate function required");
      }
      var runWith = function(x) {
        return !!pred(x);
      };
      var inspect = function() {
        return "Pred" + _inspect(runWith);
      };
      var empty = _empty;
      var valueOf = function() {
        return runWith;
      };
      function concat(method) {
        return function(m) {
          if (!isSameType(Pred, m)) {
            throw new TypeError("Pred." + method + ": Pred required");
          }
          return Pred(function(x) {
            return !!runWith(x) && !!m.runWith(x);
          });
        };
      }
      function contramap(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Pred." + method + ": Function required");
          }
          return Pred(compose2(runWith, fn));
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        runWith,
        type: type3,
        valueOf,
        empty,
        concat: concat("concat"),
        contramap: contramap("contramap")
      }, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj[fl.contramap] = contramap(fl.contramap), obj["@@type"] = _type, obj.constructor = Pred, obj;
    }
    Pred.empty = _empty;
    Pred.type = type3;
    Pred[fl.empty] = _empty;
    Pred["@@type"] = _type;
    Pred["@@implements"] = _implements(
      ["concat", "contramap", "empty"]
    );
    module.exports = Pred;
  }
});

// node_modules/crocks/Pred/index.js
var require_Pred2 = __commonJS({
  "node_modules/crocks/Pred/index.js"(exports, module) {
    module.exports = require_Pred();
  }
});

// node_modules/crocks/Reader/index.js
var require_Reader = __commonJS({
  "node_modules/crocks/Reader/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var type3 = require_types().type("Reader");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var compose2 = require_compose();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var _of2 = function(x) {
      return Reader(function() {
        return x;
      });
    };
    function ask2(fn) {
      if (!arguments.length) {
        return Reader(function(x) {
          return x;
        });
      }
      if (isFunction(fn)) {
        return Reader(fn);
      }
      throw new TypeError("Reader.ask: No argument or function required");
    }
    function Reader(runWith) {
      var obj;
      if (!arguments.length || !isFunction(runWith)) {
        throw new TypeError("Reader: Must wrap a function");
      }
      var of2 = _of2;
      var inspect = function() {
        return "Reader" + _inspect(runWith);
      };
      function map3(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Reader." + method + ": Function required");
          }
          return Reader(compose2(fn, runWith));
        };
      }
      function ap(m) {
        if (!isSameType(Reader, m)) {
          throw new TypeError("Reader.ap: Reader required");
        }
        return Reader(function(e) {
          var fn = runWith(e);
          if (!isFunction(fn)) {
            throw new TypeError("Reader.ap: Wrapped function must return a function");
          }
          return m.map(fn).runWith(e);
        });
      }
      function chain(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Reader." + method + ": Function required");
          }
          return Reader(function(e) {
            var m = fn(runWith(e));
            if (!isSameType(Reader, m)) {
              throw new TypeError("Reader." + method + ": Function must return a Reader");
            }
            return m.runWith(e);
          });
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        runWith,
        type: type3,
        ap,
        of: of2,
        map: map3("map"),
        chain: chain("chain")
      }, obj[fl.of] = of2, obj[fl.map] = map3(fl.map), obj[fl.chain] = chain(fl.chain), obj["@@type"] = _type, obj.constructor = Reader, obj;
    }
    Reader.of = _of2;
    Reader.ask = ask2;
    Reader.type = type3;
    Reader[fl.of] = _of2;
    Reader["@@type"] = _type;
    Reader["@@implements"] = _implements(
      ["ap", "chain", "map", "of"]
    );
    module.exports = Reader;
  }
});

// node_modules/crocks/Reader/ReaderT.js
var require_ReaderT = __commonJS({
  "node_modules/crocks/Reader/ReaderT.js"(exports, module) {
    var VERSION = 1;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _type = require_types().type("Reader")();
    var _typeString = require_types().typeFn(_type, VERSION);
    var fl = require_flNames();
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isMonad = require_isMonad();
    var isSameType = require_isSameType();
    function _ReaderT(Monad) {
      if (!isMonad(Monad)) {
        throw new TypeError("ReaderT: Monad required for construction");
      }
      var type3 = function() {
        return _type + "( " + Monad.type() + " )";
      };
      var typeString = _typeString + "( " + Monad["@@type"] + " )";
      var of2 = function(x) {
        return ReaderT2(function() {
          return Monad.of(x);
        });
      };
      function ask2(fn) {
        if (!arguments.length) {
          return ReaderT2(Monad.of);
        }
        if (isFunction(fn)) {
          return ReaderT2(Monad.of).map(fn);
        }
        throw new TypeError(type3() + ".ask: No argument or function required");
      }
      function lift2(m) {
        if (!isSameType(Monad, m)) {
          throw new TypeError(type3() + ".lift: " + Monad.type() + " instance required");
        }
        return ReaderT2(function() {
          return m;
        });
      }
      function liftFn(fn, x) {
        if (!isFunction(fn)) {
          throw new TypeError(type3() + ".liftFn: " + Monad.type() + " returning function required");
        }
        return ReaderT2(function() {
          var m = fn(x);
          if (!isSameType(Monad, m)) {
            throw new TypeError(type3() + ".liftFn: " + Monad.type() + " returning function required");
          }
          return m;
        });
      }
      function ReaderT2(wrapped) {
        var obj;
        if (!isFunction(wrapped)) {
          throw new TypeError(type3() + ": " + Monad.type() + " returning function required");
        }
        var inspect = function() {
          return "" + type3() + _inspect(wrapped);
        };
        function runWith(x) {
          var result = wrapped(x);
          if (!isSameType(Monad, result)) {
            throw new TypeError(type3() + ": " + Monad.type() + " must be returned by wrapped function");
          }
          return result;
        }
        function map3(fn) {
          if (!isFunction(fn)) {
            throw new TypeError(type3() + ".map: Function required");
          }
          return ReaderT2(function(e) {
            return runWith(e).map(fn);
          });
        }
        function ap(m) {
          if (!isSameType(ReaderT2, m)) {
            throw new TypeError(type3() + ".ap: " + type3() + " required");
          }
          return ReaderT2(function(e) {
            return runWith(e).ap(m.runWith(e));
          });
        }
        function chain(fn) {
          if (!isFunction(fn)) {
            throw new TypeError(type3() + ".chain: " + type3() + " returning function required");
          }
          return ReaderT2(
            function(e) {
              return runWith(e).chain(function(inner) {
                var m = fn(inner);
                if (!isSameType(ReaderT2, m)) {
                  throw new TypeError(type3() + ".chain: Function must return a " + type3());
                }
                return m.runWith(e);
              });
            }
          );
        }
        return obj = {
          inspect,
          toString: inspect,
          type: type3,
          runWith,
          of: of2,
          map: map3,
          ap,
          chain
        }, obj[fl.of] = of2, obj[fl.map] = map3, obj[fl.chain] = chain, obj["@@type"] = typeString, obj.constructor = ReaderT2, obj;
      }
      ReaderT2.type = type3;
      ReaderT2.of = of2;
      ReaderT2.ask = ask2;
      ReaderT2.lift = lift2;
      ReaderT2.liftFn = curry(liftFn);
      ReaderT2[fl.of] = of2;
      ReaderT2["@@type"] = typeString;
      ReaderT2["@@implements"] = _implements(
        ["ap", "chain", "map", "of"]
      );
      return ReaderT2;
    }
    module.exports = _ReaderT;
  }
});

// node_modules/crocks/Result/index.js
var require_Result = __commonJS({
  "node_modules/crocks/Result/index.js"(exports, module) {
    var VERSION = 4;
    var _defineUnion = require_defineUnion();
    var _equals2 = require_equals();
    var _implements = require_implements();
    var _innerConcat = require_innerConcat();
    var _inspect = require_inspect();
    var type3 = require_types().type("Result");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var apOrFunc = require_apOrFunc();
    var compose2 = require_compose();
    var isApplicative = require_isApplicative();
    var isApply = require_isApply();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var isSemigroup = require_isSemigroup();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var _result = _defineUnion({ Err: ["a"], Ok: ["b"] });
    Result.Err = compose2(Result, _result.Err);
    Result.Ok = compose2(Result, _result.Ok);
    var _of2 = Result.Ok;
    var concatApErr = function(m) {
      return function(x) {
        return Result.Err(m.either(
          function(y) {
            return isSemigroup(x) && isSameType(y, x) ? x.concat(y) : x;
          },
          function() {
            return x;
          }
        ));
      };
    };
    var concatAltErr = function(r) {
      return function(l) {
        return Result.Err(isSemigroup(r) && isSameType(l, r) ? l.concat(r) : r);
      };
    };
    function runSequence(x) {
      if (!(isApply(x) || isArray(x))) {
        throw new TypeError(
          "Result.sequence: Must wrap an Apply"
        );
      }
      return x.map(_of2);
    }
    function Result(u) {
      var obj;
      if (!arguments.length) {
        throw new TypeError("Result: Must wrap something, try using Err or Ok constructors");
      }
      var x = !_result.includes(u) ? _result.Ok(u) : u;
      var equals3 = function(m) {
        return isSameType(Result, m) && either(
          function(x2) {
            return m.either(function(y) {
              return _equals2(y, x2);
            }, constant(false));
          },
          function(x2) {
            return m.either(constant(false), function(y) {
              return _equals2(y, x2);
            });
          }
        );
      };
      var of2 = _of2;
      var inspect = function() {
        return either(
          function(l) {
            return "Err" + _inspect(l);
          },
          function(r) {
            return "Ok" + _inspect(r);
          }
        );
      };
      function either(f, g) {
        if (!isFunction(f) || !isFunction(g)) {
          throw new TypeError("Result.either: Requires both invalid and valid functions");
        }
        return _result.caseOf({
          Err: f,
          Ok: g
        }, x);
      }
      function concat(method) {
        return function(m) {
          if (!isSameType(Result, m)) {
            throw new TypeError("Result." + method + ": Result of Semigroup required");
          }
          return either(
            Result.Err,
            _innerConcat("Result." + method, m)
          );
        };
      }
      function swap(f, g) {
        if (!isFunction(f) || !isFunction(g)) {
          throw new TypeError("Result.swap: Requires both left and right functions");
        }
        return either(
          compose2(Result.Ok, f),
          compose2(Result.Err, g)
        );
      }
      function coalesce(f, g) {
        if (!isFunction(f) || !isFunction(g)) {
          throw new TypeError("Result.coalesce: Requires both left and right functions");
        }
        return Result.Ok(either(f, g));
      }
      function bichain(l, r) {
        var bichainErr = "Result.bichain: Both arguments must be Result returning functions";
        if (!(isFunction(l) && isFunction(r))) {
          throw new TypeError(bichainErr);
        }
        var m = either(l, r);
        if (!isSameType(Result, m)) {
          throw new TypeError(bichainErr);
        }
        return m;
      }
      function map3(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Result." + method + ": Function required");
          }
          return either(
            Result.Err,
            compose2(Result.Ok, fn)
          );
        };
      }
      function bimap(method) {
        return function(f, g) {
          if (!isFunction(f) || !isFunction(g)) {
            throw new TypeError("Result." + method + ": Requires both left and right functions");
          }
          return either(
            compose2(Result.Err, f),
            compose2(Result.Ok, g)
          );
        };
      }
      function alt(method) {
        return function(m) {
          if (!isSameType(Result, m)) {
            throw new TypeError("Result." + method + ": Result required");
          }
          return m.either(
            function(r) {
              return either(concatAltErr(r), Result.Ok);
            },
            function(r) {
              return either(function() {
                return Result.Ok(r);
              }, Result.Ok);
            }
          );
        };
      }
      function ap(m) {
        if (!isSameType(Result, m)) {
          throw new TypeError("Result.ap: Result required");
        }
        return either(
          concatApErr(m),
          function(fn) {
            if (!isFunction(fn)) {
              throw new TypeError("Result.ap: Wrapped value must be a function");
            }
            return m.either(Result.Err, function() {
              return m.map(fn);
            });
          }
        );
      }
      function chain(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Result." + method + ": Result returning function required");
          }
          var m = either(Result.Err, fn);
          if (!isSameType(Result, m)) {
            throw new TypeError("Result." + method + ": Function must return a Result");
          }
          return m;
        };
      }
      function sequence(f) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "Result.sequence: Applicative TypeRep or Apply returning function required"
          );
        }
        var af = apOrFunc(f);
        return either(
          compose2(af, Result.Err),
          runSequence
        );
      }
      function traverse(f, fn) {
        if (!(isApplicative(f) || isFunction(f))) {
          throw new TypeError(
            "Result.traverse: Applicative TypeRep of Apply returning function required for first argument"
          );
        }
        if (!isFunction(fn)) {
          throw new TypeError(
            "Result.traverse: Apply returning functions required for both arguments"
          );
        }
        var af = apOrFunc(f);
        var m = either(compose2(af, Result.Err), fn);
        if (!(isApply(m) || isArray(m))) {
          throw new TypeError("Result.traverse: Both functions must return an Apply of the same type");
        }
        return either(
          constant(m),
          constant(m.map(_of2))
        );
      }
      return obj = {
        inspect,
        toString: inspect,
        equals: equals3,
        type: type3,
        either,
        swap,
        coalesce,
        bichain,
        ap,
        of: of2,
        sequence,
        traverse,
        alt: alt("alt"),
        bimap: bimap("bimap"),
        concat: concat("concat"),
        map: map3("map"),
        chain: chain("chain")
      }, obj[fl.of] = of2, obj[fl.equals] = equals3, obj[fl.alt] = alt(fl.alt), obj[fl.bimap] = bimap(fl.bimap), obj[fl.concat] = concat(fl.concat), obj[fl.map] = map3(fl.map), obj[fl.chain] = chain(fl.chain), obj["@@type"] = _type, obj.constructor = Result, obj;
    }
    Result.of = _of2;
    Result.type = type3;
    Result[fl.of] = _of2;
    Result["@@type"] = _type;
    Result["@@implements"] = _implements(
      ["alt", "ap", "bimap", "chain", "concat", "equals", "map", "of", "traverse"]
    );
    module.exports = Result;
  }
});

// node_modules/crocks/Star/index.js
var require_Star = __commonJS({
  "node_modules/crocks/Star/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _type = require_types().type("Star");
    var __type = require_types().typeFn(_type(), VERSION);
    var fl = require_flNames();
    var array = require_array();
    var isFunction = require_isFunction();
    var isMonad = require_isMonad();
    var isSameType = require_isSameType();
    var Pair = require_Pair();
    var merge = function(fn, m) {
      return m.merge(fn);
    };
    var sequence = function(af, m) {
      return array.sequence(af, m);
    };
    function _Star(Monad) {
      if (!isMonad(Monad)) {
        throw new TypeError("Star: Monad required for construction");
      }
      var _id = function() {
        return Star(Monad.of);
      };
      var innerType = Monad.type();
      var innerFullType = Monad["@@type"];
      var outerType = _type() + "( " + innerType + " )";
      var typeString = __type + "( " + innerFullType + " )";
      var type3 = function() {
        return outerType;
      };
      function Star(runWith) {
        var obj;
        if (!isFunction(runWith)) {
          throw new TypeError(outerType + ": Function in the form (a -> m b) required");
        }
        var inspect = function() {
          return "" + outerType + _inspect(runWith);
        };
        var id = _id;
        function compose2(method) {
          return function(s) {
            if (!isSameType(Star, s)) {
              throw new TypeError(outerType + "." + method + ": " + outerType + " required");
            }
            return Star(function(x) {
              var m = runWith(x);
              if (!isSameType(Monad, m)) {
                throw new TypeError(outerType + "." + method + ": Computations must return a type of " + innerType);
              }
              return m.chain(function(val) {
                var inner = s.runWith(val);
                if (!isSameType(m, inner)) {
                  throw new TypeError(outerType + "." + method + ": Both computations must return a type of " + innerType);
                }
                return inner;
              });
            });
          };
        }
        function map3(method) {
          return function(fn) {
            if (!isFunction(fn)) {
              throw new TypeError(outerType + "." + method + ": Function required");
            }
            return Star(function(x) {
              var m = runWith(x);
              if (!isSameType(Monad, m)) {
                throw new TypeError(outerType + "." + method + ": Computations must return a type of " + innerType);
              }
              return m.map(fn);
            });
          };
        }
        function contramap(method) {
          return function(fn) {
            if (!isFunction(fn)) {
              throw new TypeError(outerType + "." + method + ": Function required");
            }
            return Star(function(x) {
              return runWith(fn(x));
            });
          };
        }
        function promap(method) {
          return function(l, r) {
            if (!isFunction(l) || !isFunction(r)) {
              throw new TypeError(outerType + "." + method + ": Functions required for both arguments");
            }
            return Star(function(x) {
              var m = runWith(l(x));
              if (!isSameType(Monad, m)) {
                throw new TypeError(outerType + "." + method + ": Computation must return a type of " + innerType);
              }
              return m.map(r);
            });
          };
        }
        function first() {
          return Star(function(x) {
            if (!isSameType(Pair, x)) {
              throw TypeError(outerType + ".first: Pair required for computation input");
            }
            var m = runWith(x.fst());
            if (!isSameType(Monad, m)) {
              throw new TypeError(outerType + ".first: Computation must return a type of " + innerType);
            }
            return m.map(function(l) {
              return Pair(l, x.snd());
            });
          });
        }
        function second() {
          return Star(function(x) {
            if (!isSameType(Pair, x)) {
              throw TypeError(outerType + ".second: Pair required for computation input");
            }
            var m = runWith(x.snd());
            if (!isSameType(Monad, m)) {
              throw new TypeError(outerType + ".second: Computation must return a type of " + innerType);
            }
            return m.map(function(r) {
              return Pair(x.fst(), r);
            });
          });
        }
        function both() {
          return Star(function(x) {
            if (!isSameType(Pair, x)) {
              throw TypeError(outerType + ".both: Pair required for computation input");
            }
            var p = x.bimap(runWith, runWith);
            var m = p.fst();
            if (!isSameType(Monad, m)) {
              throw new TypeError(outerType + ".both: Computation must return a type of " + innerType);
            }
            return sequence(m.of, merge(function(x2, y) {
              return [x2, y];
            }, p)).map(function(x2) {
              return Pair(x2[0], x2[1]);
            });
          });
        }
        return obj = {
          inspect,
          toString: inspect,
          type: type3,
          runWith,
          id,
          first,
          second,
          both,
          compose: compose2("compose"),
          contramap: contramap("contramap"),
          map: map3("map"),
          promap: promap("promap")
        }, obj[fl.id] = id, obj[fl.compose] = compose2(fl.compose), obj[fl.contramap] = contramap(fl.contramap), obj[fl.map] = map3(fl.map), obj[fl.promap] = promap(fl.promap), obj["@@type"] = typeString, obj.constructor = Star, obj;
      }
      Star.id = _id;
      Star.type = type3;
      Star[fl.id] = _id;
      Star["@@type"] = typeString;
      Star["@@implements"] = _implements(
        ["compose", "contramap", "id", "map", "promap"]
      );
      return Star;
    }
    module.exports = _Star;
  }
});

// node_modules/crocks/core/Unit.js
var require_Unit = __commonJS({
  "node_modules/crocks/core/Unit.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var type3 = require_types().type("Unit");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var _of2 = Unit;
    var _empty = Unit;
    function Unit() {
      var obj;
      var equals3 = function(m) {
        return isSameType(Unit, m);
      };
      var inspect = function() {
        return "()";
      };
      var valueOf = function() {
        return void 0;
      };
      var of2 = _of2;
      var empty = _empty;
      function concat(method) {
        return function(m) {
          if (!isSameType(Unit, m)) {
            throw new TypeError("Unit." + method + ": Unit required");
          }
          return Unit();
        };
      }
      function map3(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Unit." + method + ": Function required");
          }
          return Unit();
        };
      }
      function ap(m) {
        if (!isSameType(Unit, m)) {
          throw new TypeError("Unit.ap: Unit required");
        }
        return Unit();
      }
      function chain(method) {
        return function(fn) {
          if (!isFunction(fn)) {
            throw new TypeError("Unit." + method + ": Function required");
          }
          return Unit();
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        valueOf,
        type: type3,
        equals: equals3,
        empty,
        ap,
        of: of2,
        concat: concat("concat"),
        map: map3("map"),
        chain: chain("chain")
      }, obj[fl.of] = of2, obj[fl.empty] = empty, obj[fl.equals] = equals3, obj[fl.concat] = concat(fl.concat), obj[fl.map] = map3(fl.map), obj[fl.chain] = chain(fl.chain), obj["@@type"] = _type, obj.constructor = Unit, obj;
    }
    Unit.of = _of2;
    Unit.empty = _empty;
    Unit.type = type3;
    Unit[fl.of] = _of2;
    Unit[fl.empty] = _empty;
    Unit["@@type"] = _type;
    Unit["@@implements"] = _implements(
      ["ap", "chain", "concat", "empty", "equals", "map", "of"]
    );
    module.exports = Unit;
  }
});

// node_modules/crocks/State/index.js
var require_State = __commonJS({
  "node_modules/crocks/State/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var type3 = require_types().type("State");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var Pair = require_Pair();
    var Unit = require_Unit();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var _of2 = function(x) {
      return State(function(s) {
        return Pair(x, s);
      });
    };
    function get(fn) {
      if (!arguments.length) {
        return State(function(s) {
          return Pair(s, s);
        });
      }
      if (isFunction(fn)) {
        return State(function(s) {
          return Pair(fn(s), s);
        });
      }
      throw new TypeError("State.get: No arguments or function required");
    }
    function modify(fn) {
      if (!isFunction(fn)) {
        throw new TypeError("State.modify: Function Required");
      }
      return State(function(s) {
        return Pair(Unit(), fn(s));
      });
    }
    function State(fn) {
      var obj;
      if (!isFunction(fn)) {
        throw new TypeError("State: Must wrap a function in the form (s -> Pair a s)");
      }
      var of2 = _of2;
      var inspect = function() {
        return "State" + _inspect(fn);
      };
      function runWith(state) {
        var params = [], len = arguments.length - 1;
        while (len-- > 0)
          params[len] = arguments[len + 1];
        var func = params[0];
        if (func === void 0)
          func = "runWith";
        var m = fn(state);
        if (!isSameType(Pair, m)) {
          throw new TypeError("State." + func + ": Must wrap a function in the form (s -> Pair a s)");
        }
        return m;
      }
      function execWith(s) {
        var pair = runWith(s, "execWith");
        return pair.snd();
      }
      function evalWith(s) {
        var pair = runWith(s, "evalWith");
        return pair.fst();
      }
      function map3(method) {
        return function(fn2) {
          if (!isFunction(fn2)) {
            throw new TypeError("State." + method + ": Function required");
          }
          return State(function(s) {
            var m = runWith(s, method);
            return Pair(fn2(m.fst()), m.snd());
          });
        };
      }
      function ap(m) {
        if (!isSameType(State, m)) {
          throw new TypeError("State.ap: State required");
        }
        return State(function(s) {
          var pair = runWith(s, "ap");
          var fn2 = pair.fst();
          if (!isFunction(fn2)) {
            throw new TypeError("State.ap: Source value must be a function");
          }
          return m.map(fn2).runWith(pair.snd());
        });
      }
      function chain(method) {
        return function(fn2) {
          if (!isFunction(fn2)) {
            throw new TypeError("State." + method + ": State returning function required");
          }
          return State(function(s) {
            var pair = runWith(s, method);
            var m = fn2(pair.fst());
            if (!isSameType(State, m)) {
              throw new TypeError("State." + method + ": Function must return another State");
            }
            return m.runWith(pair.snd());
          });
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        runWith,
        execWith,
        evalWith,
        type: type3,
        ap,
        of: of2,
        map: map3("map"),
        chain: chain("chain")
      }, obj[fl.of] = of2, obj[fl.map] = map3(fl.map), obj[fl.chain] = chain(fl.chain), obj["@@type"] = _type, obj.constructor = State, obj;
    }
    State.of = _of2;
    State.get = get;
    State.modify = modify;
    State.put = function(x) {
      return modify(function() {
        return x;
      });
    };
    State.type = type3;
    State[fl.of] = _of2;
    State["@@type"] = _type;
    State["@@implements"] = _implements(
      ["ap", "chain", "map", "of"]
    );
    module.exports = State;
  }
});

// node_modules/crocks/Tuple/index.js
var require_Tuple = __commonJS({
  "node_modules/crocks/Tuple/index.js"(exports, module) {
    var VERSION = 1;
    var _implements = require_implements();
    var _equals2 = require_equals();
    var _inspect = require_inspect();
    var _type = require_types().type("Tuple");
    var typeFn = require_types().typeFn;
    var fl = require_flNames();
    var isFunction = require_isFunction();
    var isInteger = require_isInteger();
    var isSameType = require_isSameType();
    var isSemigroup = require_isSemigroup();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    function _Tuple(n) {
      if (!(isInteger(n) && n >= 1)) {
        throw new TypeError("Tuple: First argument must be an integer");
      }
      var tupleLength = constant(n);
      var type3 = constant(_type(n));
      var typeString = typeFn("Tuple", VERSION, n);
      var withProps = function(fn) {
        fn.type = type3;
        fn.tupleLength = tupleLength;
        fn["@@type"] = typeString;
        fn["@@implements"] = _implements(["map", "concat", "equals"]);
        return fn;
      };
      var withLength = function(n2, fn) {
        return Object.defineProperty(fn, "length", {
          value: n2
        });
      };
      switch (n) {
        case 1:
          return withProps(function(a) {
            return Tuple(n, arguments);
          });
        case 2:
          return withProps(function(a, b) {
            return Tuple(n, arguments);
          });
        case 3:
          return withProps(function(a, b, c) {
            return Tuple(n, arguments);
          });
        case 4:
          return withProps(function(a, b, c, d) {
            return Tuple(n, arguments);
          });
        case 5:
          return withProps(function(a, b, c, d, e) {
            return Tuple(n, arguments);
          });
        case 6:
          return withProps(function(a, b, c, d, e, f) {
            return Tuple(n, arguments);
          });
        case 7:
          return withProps(function(a, b, c, d, e, f, g) {
            return Tuple(n, arguments);
          });
        case 8:
          return withProps(function(a, b, c, d, e, f, g, h) {
            return Tuple(n, arguments);
          });
        case 9:
          return withProps(function(a, b, c, d, e, f, g, h, i) {
            return Tuple(n, arguments);
          });
        case 10:
          return withProps(function(a, b, c, d, e, f, g, h, i, j) {
            return Tuple(n, arguments);
          });
        default:
          return withLength(n, withProps(function() {
            var parts = [], len = arguments.length;
            while (len--)
              parts[len] = arguments[len];
            return Tuple(n, parts);
          }));
      }
      function Tuple(n2, args) {
        var obj;
        var parts = [].slice.call(args);
        if (n2 !== parts.length) {
          throw new TypeError(
            n2 + "-Tuple: Expected " + n2 + " values, but got " + parts.length
          );
        }
        var inspect = function() {
          return n2 + "-Tuple(" + parts.map(_inspect).join(",") + " )";
        };
        function map3(method) {
          return function(fn) {
            if (!isFunction(fn)) {
              throw new TypeError(n2 + "-Tuple." + method + ": Function required");
            }
            return Tuple(
              n2,
              parts.slice(0, parts.length - 1).concat(fn(parts[parts.length - 1]))
            );
          };
        }
        var equals3 = function(m) {
          return isSameType({ type: type3 }, m) && _equals2(parts, m.toArray());
        };
        function concat(method) {
          return function(t) {
            if (!isSameType({ type: type3 }, t)) {
              throw new TypeError(n2 + "-Tuple." + method + ": Tuple of the same length required");
            }
            var a = t.toArray();
            return Tuple(n2, parts.map(function(v, i, o) {
              if (!(isSemigroup(a[i]) && isSemigroup(o[i]))) {
                throw new TypeError(
                  n2 + "-Tuple." + method + ": Both Tuples must contain Semigroups of the same type"
                );
              }
              if (!isSameType(a[i], o[i])) {
                throw new TypeError(
                  n2 + "-Tuple." + method + ": Both Tuples must contain Semigroups of the same type"
                );
              }
              return o[i].concat(a[i]);
            }));
          };
        }
        function merge(fn) {
          if (!isFunction(fn)) {
            throw new TypeError(n2 + "-Tuple.merge: Function required");
          }
          return fn.apply(void 0, parts);
        }
        function mapAll() {
          var args2 = [], len = arguments.length;
          while (len--)
            args2[len] = arguments[len];
          if (args2.length !== parts.length) {
            throw new TypeError(
              n2 + "-Tuple.mapAll: Requires " + parts.length + " functions"
            );
          }
          return Tuple(
            n2,
            parts.map(function(v, i) {
              if (!isFunction(args2[i])) {
                throw new TypeError(
                  n2 + "-Tuple.mapAll: Functions required for all arguments"
                );
              }
              return args2[i](v);
            })
          );
        }
        function project(index) {
          if (!isInteger(index) || index < 1 || index > n2) {
            throw new TypeError(
              n2 + "-Tuple.project: Index should be an integer between 1 and " + n2
            );
          }
          return parts[index - 1];
        }
        function toArray() {
          return parts.slice();
        }
        return obj = {
          inspect,
          toString: inspect,
          merge,
          project,
          mapAll,
          toArray,
          tupleLength,
          type: type3,
          equals: equals3,
          map: map3("map"),
          concat: concat("concat")
        }, obj[fl.map] = map3(fl.map), obj[fl.concat] = concat(fl.concat), obj[fl.equals] = equals3, obj["@@type"] = typeString, obj.constructor = Tuple, obj;
      }
    }
    module.exports = _Tuple;
  }
});

// node_modules/crocks/Unit/index.js
var require_Unit2 = __commonJS({
  "node_modules/crocks/Unit/index.js"(exports, module) {
    module.exports = require_Unit();
  }
});

// node_modules/crocks/Writer/index.js
var require_Writer = __commonJS({
  "node_modules/crocks/Writer/index.js"(exports, module) {
    var VERSION = 2;
    var _equals2 = require_equals();
    var _implements = require_implements();
    var _inspect = require_inspect();
    var __type = require_types().type("Writer")();
    var _typeString = require_types().typeFn(__type, VERSION);
    var fl = require_flNames();
    var Pair = require_Pair();
    var isFunction = require_isFunction();
    var isMonoid = require_isMonoid();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    function _Writer(Monoid) {
      if (!isMonoid(Monoid)) {
        throw new TypeError("Writer: Monoid required for construction");
      }
      var _of2 = function(x) {
        return Writer(Monoid.empty().valueOf(), x);
      };
      var _type = constant(__type + "( " + Monoid.type() + " )");
      var typeString = _typeString + "( " + Monoid["@@type"] + " )";
      function Writer(entry, val) {
        var obj;
        if (arguments.length !== 2) {
          throw new TypeError("Writer: Log entry and a value required");
        }
        var type3 = _type;
        var of2 = _of2;
        var equals3 = function(m) {
          return isSameType(Writer, m) && _equals2(m.valueOf(), val);
        };
        var valueOf = constant(val);
        var log = constant(Monoid(entry));
        var inspect = constant("Writer(" + _inspect(log()) + _inspect(valueOf()) + " )");
        var read = function() {
          return Pair(log(), val);
        };
        function map3(method) {
          return function(fn) {
            if (!isFunction(fn)) {
              throw new TypeError("Writer." + method + ": Function required");
            }
            return Writer(log().valueOf(), fn(valueOf()));
          };
        }
        function ap(m) {
          if (!isFunction(val)) {
            throw new TypeError("Writer.ap: Wrapped value must be a function");
          }
          if (!isSameType(Writer, m)) {
            throw new TypeError("Writer.ap: Writer required");
          }
          return Writer(
            log().concat(m.log()).valueOf(),
            val(m.valueOf())
          );
        }
        function chain(method) {
          return function(fn) {
            if (!isFunction(fn)) {
              throw new TypeError("Writer." + method + ": Function required");
            }
            var w = fn(valueOf());
            if (!isSameType(Writer, w)) {
              throw new TypeError("Writer." + method + ": Function must return a Writer");
            }
            return Writer(log().concat(w.log()).valueOf(), w.valueOf());
          };
        }
        return obj = {
          inspect,
          toString: inspect,
          read,
          valueOf,
          log,
          type: type3,
          equals: equals3,
          ap,
          of: of2,
          chain: chain("chain"),
          map: map3("map")
        }, obj[fl.of] = of2, obj[fl.equals] = equals3, obj[fl.map] = map3(fl.map), obj[fl.chain] = chain(fl.chain), obj["@@type"] = typeString, obj.constructor = Writer, obj;
      }
      Writer.of = _of2;
      Writer.type = _type;
      Writer[fl.of] = _of2;
      Writer["@@type"] = typeString;
      Writer["@@implements"] = _implements(
        ["ap", "chain", "equals", "map", "of"]
      );
      return Writer;
    }
    module.exports = _Writer;
  }
});

// node_modules/crocks/core/object.js
var require_object = __commonJS({
  "node_modules/crocks/core/object.js"(exports, module) {
    function rejectUnit(obj) {
      return function(acc, key) {
        var value = obj[key];
        if (value !== void 0) {
          acc[key] = value;
        }
        return acc;
      };
    }
    function assign(x, m) {
      var result = Object.keys(m).reduce(rejectUnit(m), {});
      return Object.keys(x).reduce(rejectUnit(x), result);
    }
    function filter2(f, m) {
      return Object.keys(m).reduce(function(acc, key) {
        if (f(m[key])) {
          acc[key] = m[key];
        }
        return acc;
      }, {});
    }
    function map3(f, m) {
      return Object.keys(m).reduce(function(acc, key) {
        acc[key] = f(m[key]);
        return acc;
      }, {});
    }
    function set(key, val, m) {
      var obj;
      return assign((obj = {}, obj[key] = val, obj), m);
    }
    function unset(key, m) {
      return Object.keys(m).reduce(function(acc, k) {
        if (m[k] !== void 0 && k !== key) {
          acc[k] = m[k];
        }
        return acc;
      }, {});
    }
    module.exports = {
      assign,
      filter: filter2,
      map: map3,
      set,
      unset
    };
  }
});

// node_modules/crocks/helpers/assign.js
var require_assign = __commonJS({
  "node_modules/crocks/helpers/assign.js"(exports, module) {
    var curry = require_curry();
    var isObject = require_isObject();
    var object = require_object();
    function assign(x, m) {
      if (!(isObject(x) && isObject(m))) {
        throw new TypeError("assign: Objects required for both arguments");
      }
      return object.assign(x, m);
    }
    module.exports = curry(assign);
  }
});

// node_modules/crocks/helpers/setProp.js
var require_setProp = __commonJS({
  "node_modules/crocks/helpers/setProp.js"(exports, module) {
    var curry = require_curry();
    var isArray = require_isArray();
    var isInteger = require_isInteger();
    var isObject = require_isObject();
    var isString = require_isString();
    var array = require_array();
    var object = require_object();
    function fn(name) {
      function setProp2(key, val, x) {
        if (isObject(x)) {
          if (isString(key)) {
            return object.set(key, val, x);
          }
          throw new TypeError(
            name + ": String required for first argument when third argument is an Object"
          );
        }
        if (isArray(x)) {
          if (isInteger(key) && key >= 0) {
            return array.set(key, val, x);
          }
          throw new TypeError(
            name + ": Positive Integer required for first argument when third argument is an Array"
          );
        }
        throw new TypeError(
          name + ": Object or Array required for third argument"
        );
      }
      return curry(setProp2);
    }
    var setProp = fn("setProp");
    setProp.origFn = fn;
    module.exports = setProp;
  }
});

// node_modules/crocks/helpers/assoc.js
var require_assoc = __commonJS({
  "node_modules/crocks/helpers/assoc.js"(exports, module) {
    var setProp = require_setProp();
    module.exports = setProp.origFn("assoc");
  }
});

// node_modules/crocks/core/curryN.js
var require_curryN = __commonJS({
  "node_modules/crocks/core/curryN.js"(exports, module) {
    function curryN3(n, fn) {
      return function() {
        var xs = [], len = arguments.length;
        while (len--)
          xs[len] = arguments[len];
        var args = xs.length ? xs : [void 0];
        var remaining = Math.floor(n) - args.length;
        return remaining > 0 ? curryN3(remaining, Function.bind.apply(fn, [null].concat(args))) : fn.apply(null, args.slice(0, n));
      };
    }
    module.exports = curryN3;
  }
});

// node_modules/crocks/helpers/binary.js
var require_binary = __commonJS({
  "node_modules/crocks/helpers/binary.js"(exports, module) {
    var curryN3 = require_curryN();
    var isFunction = require_isFunction();
    function binary(fn) {
      if (!isFunction(fn)) {
        throw new TypeError("binary: Function required");
      }
      return curryN3(2, fn);
    }
    module.exports = binary;
  }
});

// node_modules/crocks/helpers/compose.js
var require_compose3 = __commonJS({
  "node_modules/crocks/helpers/compose.js"(exports, module) {
    var isFunction = require_isFunction();
    var err = "compose: Functions required";
    function applyPipe(f, g) {
      if (!isFunction(g)) {
        throw new TypeError(err);
      }
      return function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return g.call(null, f.apply(null, args));
      };
    }
    function compose2() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      if (!arguments.length) {
        throw new TypeError(err);
      }
      var fns = args.slice().reverse();
      var head2 = fns[0];
      if (!isFunction(head2)) {
        throw new TypeError(err);
      }
      var tail2 = fns.slice(1).concat(function(x) {
        return x;
      });
      return tail2.reduce(applyPipe, head2);
    }
    module.exports = compose2;
  }
});

// node_modules/crocks/helpers/composeK.js
var require_composeK = __commonJS({
  "node_modules/crocks/helpers/composeK.js"(exports, module) {
    var isChain = require_isChain();
    var isFunction = require_isFunction();
    var err = "composeK: Chain returning functions of the same type required";
    function composeK() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      if (!arguments.length) {
        throw new TypeError(err);
      }
      var fns = args.slice().reverse();
      var head2 = fns[0];
      if (!isFunction(head2)) {
        throw new TypeError(err);
      }
      if (fns.length === 1) {
        return head2;
      }
      var tail2 = fns.slice(1).reduce(function(comp, fn) {
        if (!isFunction(fn)) {
          throw new TypeError(err);
        }
        return function(m) {
          if (!isChain(m)) {
            throw new TypeError(err);
          }
          return comp(m).chain(fn);
        };
      }, function(x) {
        return x;
      });
      return function() {
        return tail2(head2.apply(null, arguments));
      };
    }
    module.exports = composeK;
  }
});

// node_modules/crocks/helpers/composeP.js
var require_composeP = __commonJS({
  "node_modules/crocks/helpers/composeP.js"(exports, module) {
    var isFunction = require_isFunction();
    var isPromise = require_isPromise();
    var err = "composeP: Promise returning functions required";
    function applyPipe(f, g) {
      if (!isFunction(g)) {
        throw new TypeError(err);
      }
      return function() {
        var p = f.apply(null, arguments);
        if (!isPromise(p)) {
          throw new TypeError(err);
        }
        return p.then(g);
      };
    }
    function composeP() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      if (!arguments.length) {
        throw new TypeError(err);
      }
      var fns = args.reverse();
      var head2 = fns[0];
      if (!isFunction(head2)) {
        throw new TypeError(err);
      }
      var tail2 = fns.slice(1).concat(function(x) {
        return x;
      });
      return tail2.reduce(applyPipe, head2);
    }
    module.exports = composeP;
  }
});

// node_modules/crocks/helpers/composeS.js
var require_composeS = __commonJS({
  "node_modules/crocks/helpers/composeS.js"(exports, module) {
    var isSameType = require_isSameType();
    var isSemigroupoid = require_isSemigroupoid();
    var err = "composeS: Semigroupoids of the same type required";
    function composeS() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      if (!arguments.length) {
        throw new TypeError(err);
      }
      var ms = args.slice().reverse();
      var head2 = ms[0];
      if (!isSemigroupoid(head2)) {
        throw new TypeError(err);
      }
      if (ms.length === 1) {
        return head2;
      }
      return ms.slice().reduce(function(comp, m) {
        if (!isSameType(comp, m)) {
          throw new TypeError(err);
        }
        return comp.compose(m);
      });
    }
    module.exports = composeS;
  }
});

// node_modules/crocks/helpers/curry.js
var require_curry2 = __commonJS({
  "node_modules/crocks/helpers/curry.js"(exports, module) {
    var _curry = require_curry();
    var isFunction = require_isFunction();
    function curry(fn) {
      if (!isFunction(fn)) {
        throw new TypeError("curry: Function required");
      }
      return _curry(fn);
    }
    module.exports = curry;
  }
});

// node_modules/crocks/helpers/defaultProps.js
var require_defaultProps = __commonJS({
  "node_modules/crocks/helpers/defaultProps.js"(exports, module) {
    var curry = require_curry();
    var isObject = require_isObject();
    var object = require_object();
    function defaultProps(x, m) {
      if (!isObject(x) || !isObject(m)) {
        throw new TypeError("defaultProps: Objects required for both arguments");
      }
      return object.assign(m, x);
    }
    module.exports = curry(defaultProps);
  }
});

// node_modules/crocks/helpers/defaultTo.js
var require_defaultTo = __commonJS({
  "node_modules/crocks/helpers/defaultTo.js"(exports, module) {
    var curry = require_curry();
    var isNil3 = require_isNil();
    function defaultTo(def, val) {
      return isNil3(val) ? def : val;
    }
    module.exports = curry(defaultTo);
  }
});

// node_modules/crocks/helpers/unsetProp.js
var require_unsetProp = __commonJS({
  "node_modules/crocks/helpers/unsetProp.js"(exports, module) {
    var curry = require_curry();
    var isArray = require_isArray();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isObject = require_isObject();
    var isString = require_isString();
    var array = require_array();
    var object = require_object();
    function fn(name) {
      function unsetProp2(key, obj) {
        if (!(isObject(obj) || isArray(obj))) {
          return obj;
        }
        if (!(isString(key) && !isEmpty(key) || isInteger(key) && key >= 0)) {
          throw new TypeError(
            name + ": Non-empty String required or Positive Integer required for first argument"
          );
        }
        if (isObject(obj)) {
          if (isString(key) && !isEmpty(key)) {
            return object.unset(key, obj);
          }
        }
        if (isArray(obj)) {
          if (isInteger(key) && key >= 0) {
            return array.unset(key, obj);
          }
        }
        return obj;
      }
      return curry(unsetProp2);
    }
    var unsetProp = fn("unsetProp");
    unsetProp.origFn = fn;
    module.exports = unsetProp;
  }
});

// node_modules/crocks/helpers/dissoc.js
var require_dissoc = __commonJS({
  "node_modules/crocks/helpers/dissoc.js"(exports, module) {
    var unsetProp = require_unsetProp();
    module.exports = unsetProp.origFn("dissoc");
  }
});

// node_modules/crocks/helpers/fromPairs.js
var require_fromPairs = __commonJS({
  "node_modules/crocks/helpers/fromPairs.js"(exports, module) {
    var Pair = require_types().proxy("Pair");
    var isFoldable = require_isFoldable();
    var isSameType = require_isSameType();
    var isString = require_isString();
    function foldPairs(acc, pair) {
      var obj;
      if (!isSameType(Pair, pair)) {
        throw new TypeError("fromPairs: Foldable of Pairs required for argument");
      }
      var key = pair.fst();
      var value = pair.snd();
      if (!isString(key)) {
        throw new TypeError("fromPairs: String required for fst of every Pair");
      }
      return value !== void 0 ? Object.assign(acc, (obj = {}, obj[key] = value, obj)) : acc;
    }
    function fromPairs(xs) {
      if (!isFoldable(xs)) {
        throw new TypeError("fromPairs: Foldable of Pairs required for argument");
      }
      return xs.reduce(foldPairs, {});
    }
    module.exports = fromPairs;
  }
});

// node_modules/crocks/helpers/getPathOr.js
var require_getPathOr = __commonJS({
  "node_modules/crocks/helpers/getPathOr.js"(exports, module) {
    var curry = require_curry();
    var isArray = require_isArray();
    var isDefined = require_isDefined();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isNil3 = require_isNil();
    var isString = require_isString();
    var errFn = function(name) {
      return name + ": Array of Non-empty Strings or Integers required for second argument";
    };
    function fn(name) {
      function getPathOr2(def, keys4, target) {
        if (!isArray(keys4)) {
          throw new TypeError(errFn(name));
        }
        if (isNil3(target)) {
          return def;
        }
        var value = target;
        for (var i = 0; i < keys4.length; i++) {
          var key = keys4[i];
          if (!(isString(key) && !isEmpty(key) || isInteger(key))) {
            throw new TypeError(errFn(name));
          }
          if (isNil3(value)) {
            return def;
          }
          value = value[key];
          if (!isDefined(value)) {
            return def;
          }
        }
        return value;
      }
      return curry(getPathOr2);
    }
    var getPathOr = fn("getPathOr");
    getPathOr.origFn = fn;
    module.exports = getPathOr;
  }
});

// node_modules/crocks/helpers/liftA2.js
var require_liftA2 = __commonJS({
  "node_modules/crocks/helpers/liftA2.js"(exports, module) {
    var array = require_array();
    var curry = require_curry();
    var isApply = require_isApply();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var map3 = array.map;
    var ap = array.ap;
    function liftA2(fn, x, y) {
      if (!isFunction(fn)) {
        throw new TypeError("liftA2: Function required for first argument");
      }
      if (!((isApply(x) || isArray(x)) && isSameType(x, y))) {
        throw new TypeError("liftA2: Applys of same type required for last two arguments");
      }
      if (isArray(x)) {
        return ap(y, map3(fn, x));
      }
      return x.map(fn).ap(y);
    }
    module.exports = curry(liftA2);
  }
});

// node_modules/crocks/helpers/liftA3.js
var require_liftA3 = __commonJS({
  "node_modules/crocks/helpers/liftA3.js"(exports, module) {
    var array = require_array();
    var curry = require_curry();
    var isApply = require_isApply();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var map3 = array.map;
    var ap = array.ap;
    function liftA3(fn, x, y, z) {
      if (!isFunction(fn)) {
        throw new TypeError("liftA3: Function required for first argument");
      } else if (!((isApply(x) || isArray(x)) && isSameType(x, y) && isSameType(x, z))) {
        throw new TypeError("liftA3: Applys of same type required for last three arguments");
      }
      if (isArray(x)) {
        return ap(z, ap(y, map3(fn, x)));
      }
      return x.map(fn).ap(y).ap(z);
    }
    module.exports = curry(liftA3);
  }
});

// node_modules/crocks/helpers/liftN.js
var require_liftN = __commonJS({
  "node_modules/crocks/helpers/liftN.js"(exports, module) {
    var array = require_array();
    var curry = require_curry();
    var curryN3 = require_curryN();
    var isApply = require_isApply();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    var isFunctor = require_isFunctor();
    var isInteger = require_isInteger();
    var isSameType = require_isSameType();
    var ap = array.ap;
    var applyAp = function(x, y) {
      if (!(isSameType(x, y) && (isArray(y) || isApply(y)))) {
        throw new TypeError("liftN: Applys of same type are required");
      }
      if (isArray(x)) {
        return ap(y, x);
      }
      return x.ap(y);
    };
    function liftN(n, fn) {
      if (!isInteger(n)) {
        throw new TypeError("liftN: Integer required for first argument");
      }
      if (!isFunction(fn)) {
        throw new TypeError("liftN: Function required for second argument");
      }
      return curryN3(n, function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        if (!isFunctor(args[0])) {
          throw new TypeError("liftN: Applys of same type are required");
        }
        return args.slice(1, n).reduce(
          applyAp,
          args[0].map(function(x) {
            return curryN3(n, fn)(x);
          })
        );
      });
    }
    module.exports = curry(liftN);
  }
});

// node_modules/crocks/helpers/getPropOr.js
var require_getPropOr = __commonJS({
  "node_modules/crocks/helpers/getPropOr.js"(exports, module) {
    var curry = require_curry();
    var isDefined = require_isDefined();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isNil3 = require_isNil();
    var isString = require_isString();
    function fn(name) {
      function getPropOr2(def, key, target) {
        if (!(isString(key) && !isEmpty(key) || isInteger(key))) {
          throw new TypeError(name + ": Non-empty String or Integer required for second argument");
        }
        if (isNil3(target)) {
          return def;
        }
        var value = target[key];
        return isDefined(value) ? value : def;
      }
      return curry(getPropOr2);
    }
    var getPropOr = fn("getPropOr");
    getPropOr.origFn = fn;
    module.exports = getPropOr;
  }
});

// node_modules/crocks/helpers/mapProps.js
var require_mapProps = __commonJS({
  "node_modules/crocks/helpers/mapProps.js"(exports, module) {
    var curry = require_curry();
    var isObject = require_isObject();
    var isFunction = require_isFunction();
    var isNil3 = require_isNil();
    var applyMap = function(fns, obj) {
      return function(acc, key) {
        var obj$1, obj$2, obj$3;
        if (isNil3(fns[key])) {
          return Object.assign({}, acc, (obj$1 = {}, obj$1[key] = obj[key], obj$1));
        }
        if (isObject(fns[key])) {
          return Object.assign({}, acc, (obj$2 = {}, obj$2[key] = isObject(obj[key]) ? mapProps(fns[key], obj[key]) : obj[key], obj$2));
        }
        if (!isFunction(fns[key])) {
          throw new TypeError("mapProps: Object of functions required for first argument");
        }
        return Object.assign({}, acc, (obj$3 = {}, obj$3[key] = fns[key](obj[key]), obj$3));
      };
    };
    function mapProps(fns, obj) {
      if (!(isObject(fns) && isObject(obj))) {
        throw new TypeError("mapProps: Objects required for both arguments");
      }
      return Object.keys(obj).reduce(applyMap(fns, obj), {});
    }
    module.exports = curry(mapProps);
  }
});

// node_modules/crocks/helpers/mapReduce.js
var require_mapReduce = __commonJS({
  "node_modules/crocks/helpers/mapReduce.js"(exports, module) {
    var curry = require_curry();
    var isFoldable = require_isFoldable();
    var isFunction = require_isFunction();
    function mapReduce(mapFn, reduceFn, empty, xs) {
      if (!isFunction(mapFn)) {
        throw new TypeError("mapReduce: Unary mapping function required for first argument");
      }
      if (!isFunction(reduceFn)) {
        throw new TypeError("mapReduce: Binary reduction function required for second argument");
      }
      if (!isFoldable(xs)) {
        throw new TypeError("mapReduce: Foldable required for fourth argument");
      }
      return xs.reduce(
        function(acc, x) {
          return reduceFn(acc, mapFn(x));
        },
        empty
      );
    }
    module.exports = curry(mapReduce);
  }
});

// node_modules/crocks/core/mconcatMap.js
var require_mconcatMap = __commonJS({
  "node_modules/crocks/core/mconcatMap.js"(exports, module) {
    var compose2 = require_compose();
    var foldWith = function(m) {
      return function(x, y) {
        return x.concat(m(y));
      };
    };
    function mconcatMap(M, f, xs) {
      return xs.reduce(foldWith(compose2(M, f)), M.empty());
    }
    module.exports = mconcatMap;
  }
});

// node_modules/crocks/helpers/mconcat.js
var require_mconcat = __commonJS({
  "node_modules/crocks/helpers/mconcat.js"(exports, module) {
    var curry = require_curry();
    var isFoldable = require_isFoldable();
    var isMonoid = require_isMonoid();
    var mconcatMap = require_mconcatMap();
    var identity = function(x) {
      return x;
    };
    function mconcat(m, xs) {
      if (!isMonoid(m)) {
        throw new TypeError(
          "mconcat: Monoid required for first argument"
        );
      }
      if (!isFoldable(xs)) {
        throw new TypeError(
          "mconcat: Foldable required for second argument"
        );
      }
      return mconcatMap(m, identity, xs);
    }
    module.exports = curry(mconcat);
  }
});

// node_modules/crocks/helpers/mconcatMap.js
var require_mconcatMap2 = __commonJS({
  "node_modules/crocks/helpers/mconcatMap.js"(exports, module) {
    var _mconcatMap = require_mconcatMap();
    var curry = require_curry();
    var isFoldable = require_isFoldable();
    var isFunction = require_isFunction();
    var isMonoid = require_isMonoid();
    function mconcatMap(m, f, xs) {
      if (!isMonoid(m)) {
        throw new TypeError(
          "mconcatMap: Monoid required for first argument"
        );
      }
      if (!isFunction(f)) {
        throw new TypeError(
          "mconcatMap: Function required for second argument"
        );
      }
      if (!isFoldable(xs)) {
        throw new TypeError(
          "mconcatMap: Foldable required for third argument"
        );
      }
      return _mconcatMap(m, f, xs);
    }
    module.exports = curry(mconcatMap);
  }
});

// node_modules/crocks/helpers/mreduce.js
var require_mreduce = __commonJS({
  "node_modules/crocks/helpers/mreduce.js"(exports, module) {
    var curry = require_curry();
    var isFoldable = require_isFoldable();
    var isMonoid = require_isMonoid();
    var mconcatMap = require_mconcatMap();
    var identity = function(x) {
      return x;
    };
    function mreduce(m, xs) {
      if (!isMonoid(m)) {
        throw new TypeError(
          "mreduce: Monoid required for first argument"
        );
      }
      if (!isFoldable(xs)) {
        throw new TypeError(
          "mreduce: Foldable required for second argument"
        );
      }
      return mconcatMap(m, identity, xs).valueOf();
    }
    module.exports = curry(mreduce);
  }
});

// node_modules/crocks/helpers/mreduceMap.js
var require_mreduceMap = __commonJS({
  "node_modules/crocks/helpers/mreduceMap.js"(exports, module) {
    var curry = require_curry();
    var isFoldable = require_isFoldable();
    var isFunction = require_isFunction();
    var isMonoid = require_isMonoid();
    var mconcatMap = require_mconcatMap();
    function mreduceMap(m, f, xs) {
      if (!isMonoid(m)) {
        throw new TypeError(
          "mreduceMap: Monoid required for first argument"
        );
      }
      if (!isFunction(f)) {
        throw new TypeError(
          "mreduceMap: Function required for second argument"
        );
      }
      if (!isFoldable(xs)) {
        throw new TypeError(
          "mreduceMap: Foldable required for third argument"
        );
      }
      return mconcatMap(m, f, xs).valueOf();
    }
    module.exports = curry(mreduceMap);
  }
});

// node_modules/crocks/helpers/nAry.js
var require_nAry = __commonJS({
  "node_modules/crocks/helpers/nAry.js"(exports, module) {
    var curry = require_curry();
    var curryN3 = require_curryN();
    var isFunction = require_isFunction();
    var isNumber = require_isNumber();
    function nAry(num, fn) {
      if (!isNumber(num)) {
        throw new TypeError("nAry: Number required for first argument");
      }
      if (!isFunction(fn)) {
        throw new TypeError("nAry: Function required for second argument");
      }
      return curryN3(num, fn);
    }
    module.exports = curry(nAry);
  }
});

// node_modules/crocks/helpers/objOf.js
var require_objOf = __commonJS({
  "node_modules/crocks/helpers/objOf.js"(exports, module) {
    var curry = require_curry();
    var isString = require_isString();
    function objOf(key, value) {
      var obj;
      if (!(key && isString(key))) {
        throw new TypeError("objOf: Non-empty String required for first argument");
      }
      return obj = {}, obj[key] = value, obj;
    }
    module.exports = curry(objOf);
  }
});

// node_modules/crocks/helpers/omit.js
var require_omit = __commonJS({
  "node_modules/crocks/helpers/omit.js"(exports, module) {
    var curry = require_curry();
    var isFoldable = require_isFoldable();
    var isObject = require_isObject();
    function omitKeys(keys4, obj) {
      return function(acc, key) {
        var obj$1;
        return keys4.indexOf(key) === -1 && obj[key] !== void 0 ? Object.assign(acc, (obj$1 = {}, obj$1[key] = obj[key], obj$1)) : acc;
      };
    }
    function omit(keys4, obj) {
      if (!isFoldable(keys4)) {
        throw new TypeError("omit: Foldable required for first argument");
      } else if (!isObject(obj)) {
        throw new TypeError("omit: Object required for second argument");
      }
      return Object.keys(obj).reduce(omitKeys(keys4, obj), {});
    }
    module.exports = curry(omit);
  }
});

// node_modules/crocks/helpers/once.js
var require_once2 = __commonJS({
  "node_modules/crocks/helpers/once.js"(exports, module) {
    var isFunction = require_isFunction();
    var _once = require_once();
    function once(fn) {
      if (!isFunction(fn)) {
        throw new TypeError("once: Function required");
      }
      return _once(fn);
    }
    module.exports = once;
  }
});

// node_modules/crocks/helpers/partial.js
var require_partial = __commonJS({
  "node_modules/crocks/helpers/partial.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function partial() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var fn = args[0];
      var xs = args.slice(1);
      if (!isFunction(fn)) {
        throw new TypeError("partial: Function required for first argument");
      }
      return curry(
        Function.bind.apply(fn, [null].concat(xs))
      );
    }
    module.exports = partial;
  }
});

// node_modules/crocks/helpers/pick.js
var require_pick = __commonJS({
  "node_modules/crocks/helpers/pick.js"(exports, module) {
    var curry = require_curry();
    var isFoldable = require_isFoldable();
    var isObject = require_isObject();
    var isString = require_isString();
    function pickKeys(obj) {
      return function(acc, key) {
        var obj$1;
        if (!isString(key)) {
          throw new TypeError("pick: Foldable of Strings is required for first argument");
        }
        return key && obj[key] !== void 0 ? Object.assign(acc, (obj$1 = {}, obj$1[key] = obj[key], obj$1)) : acc;
      };
    }
    function pick(keys4, obj) {
      if (!isFoldable(keys4)) {
        throw new TypeError("pick: Foldable required for first argument");
      } else if (!isObject(obj)) {
        throw new TypeError("pick: Object required for second argument");
      }
      return keys4.reduce(pickKeys(obj), {});
    }
    module.exports = curry(pick);
  }
});

// node_modules/crocks/helpers/pipe.js
var require_pipe = __commonJS({
  "node_modules/crocks/helpers/pipe.js"(exports, module) {
    var isFunction = require_isFunction();
    var err = "pipe: Functions required";
    function applyPipe(f, g) {
      if (!isFunction(g)) {
        throw new TypeError(err);
      }
      return function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        return g.call(null, f.apply(null, args));
      };
    }
    function pipe2() {
      var fns = [], len = arguments.length;
      while (len--)
        fns[len] = arguments[len];
      if (!arguments.length) {
        throw new TypeError(err);
      }
      var head2 = fns[0];
      if (!isFunction(head2)) {
        throw new TypeError(err);
      }
      var tail2 = fns.slice(1).concat(function(x) {
        return x;
      });
      return tail2.reduce(applyPipe, head2);
    }
    module.exports = pipe2;
  }
});

// node_modules/crocks/helpers/pipeK.js
var require_pipeK = __commonJS({
  "node_modules/crocks/helpers/pipeK.js"(exports, module) {
    var isChain = require_isChain();
    var isFunction = require_isFunction();
    var err = "pipeK: Chain returning functions of the same type required";
    function pipeK(head2) {
      var fns = [], len = arguments.length - 1;
      while (len-- > 0)
        fns[len] = arguments[len + 1];
      if (!(arguments.length && isFunction(head2))) {
        throw new TypeError(err);
      }
      if (arguments.length === 1) {
        return head2;
      }
      var tail2 = fns.reduce(function(comp, fn) {
        if (!isFunction(fn)) {
          throw new TypeError(err);
        }
        return function(m) {
          if (!isChain(m)) {
            throw new TypeError(err);
          }
          return comp(m).chain(fn);
        };
      }, function(x) {
        return x;
      });
      return function() {
        return tail2(head2.apply(null, arguments));
      };
    }
    module.exports = pipeK;
  }
});

// node_modules/crocks/helpers/pipeP.js
var require_pipeP = __commonJS({
  "node_modules/crocks/helpers/pipeP.js"(exports, module) {
    var isFunction = require_isFunction();
    var isPromise = require_isPromise();
    var err = "pipeP: Promise returning functions required";
    function applyPipe(f, g) {
      if (!isFunction(g)) {
        throw new TypeError(err);
      }
      return function() {
        var p = f.apply(null, arguments);
        if (!isPromise(p)) {
          throw new TypeError(err);
        }
        return p.then(g);
      };
    }
    function pipeP() {
      var fns = [], len = arguments.length;
      while (len--)
        fns[len] = arguments[len];
      if (!arguments.length) {
        throw new TypeError(err);
      }
      var head2 = fns[0];
      if (!isFunction(head2)) {
        throw new TypeError(err);
      }
      var tail2 = fns.slice(1).concat(function(x) {
        return x;
      });
      return tail2.reduce(applyPipe, head2);
    }
    module.exports = pipeP;
  }
});

// node_modules/crocks/helpers/pipeS.js
var require_pipeS = __commonJS({
  "node_modules/crocks/helpers/pipeS.js"(exports, module) {
    var isSameType = require_isSameType();
    var isSemigroupoid = require_isSemigroupoid();
    var err = "pipeS: Semigroupoids of the same type required";
    function pipeS() {
      var ms = [], len = arguments.length;
      while (len--)
        ms[len] = arguments[len];
      if (!arguments.length) {
        throw new TypeError(err);
      }
      var head2 = ms[0];
      if (!isSemigroupoid(head2)) {
        throw new TypeError(err);
      }
      if (ms.length === 1) {
        return head2;
      }
      return ms.slice().reduce(function(comp, m) {
        if (!isSameType(comp, m)) {
          throw new TypeError(err);
        }
        return comp.compose(m);
      });
    }
    module.exports = pipeS;
  }
});

// node_modules/crocks/helpers/propOr.js
var require_propOr = __commonJS({
  "node_modules/crocks/helpers/propOr.js"(exports, module) {
    var getPropOr = require_getPropOr();
    module.exports = getPropOr.origFn("propOr");
  }
});

// node_modules/crocks/helpers/propPathOr.js
var require_propPathOr = __commonJS({
  "node_modules/crocks/helpers/propPathOr.js"(exports, module) {
    var getPathOr = require_getPathOr();
    module.exports = getPathOr.origFn("propPathOr");
  }
});

// node_modules/crocks/helpers/setPath.js
var require_setPath = __commonJS({
  "node_modules/crocks/helpers/setPath.js"(exports, module) {
    var array = require_array();
    var curry = require_curry();
    var isArray = require_isArray();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isObject = require_isObject();
    var isString = require_isString();
    var object = require_object();
    var isValid2 = function(x) {
      return isObject(x) || isArray(x);
    };
    var pathErr = "setPath: Non-empty Array of non-empty Strings and/or Positive Integers required for first argument";
    function setPath(path3, val, obj) {
      if (!isArray(path3) || isEmpty(path3)) {
        throw new TypeError(pathErr);
      }
      if (!isValid2(obj)) {
        throw new TypeError(
          "setPath: Object or Array required for third argument"
        );
      }
      var key = path3[0];
      var newVal = val;
      if (!(isString(key) && !isEmpty(key) || isInteger(key) && key >= 0)) {
        throw new TypeError(pathErr);
      }
      if (path3.length > 1) {
        var next = !isValid2(obj[key]) ? isInteger(path3[1]) ? [] : {} : obj[key];
        newVal = setPath(path3.slice(1), val, next);
      }
      if (isObject(obj)) {
        if (isString(key)) {
          return object.set(key, newVal, obj);
        }
        throw new TypeError(
          "setPath: Non-empty String required in path when referencing an Object"
        );
      }
      if (isInteger(key)) {
        return array.set(key, newVal, obj);
      }
      throw new TypeError(
        "setPath: Positive Integers required in path when referencing an Array"
      );
    }
    module.exports = curry(setPath);
  }
});

// node_modules/crocks/helpers/tap.js
var require_tap = __commonJS({
  "node_modules/crocks/helpers/tap.js"(exports, module) {
    var curry = require_curry();
    var compose2 = require_compose();
    var isFunction = require_isFunction();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    function tap(fn, x) {
      if (!isFunction(fn)) {
        throw new TypeError(
          "tap: Function required for first argument"
        );
      }
      return compose2(constant(x), fn)(x);
    }
    module.exports = curry(tap);
  }
});

// node_modules/crocks/helpers/unary.js
var require_unary = __commonJS({
  "node_modules/crocks/helpers/unary.js"(exports, module) {
    var isFunction = require_isFunction();
    function unary(fn) {
      if (!isFunction(fn)) {
        throw new TypeError("unary: Function required");
      }
      return function(x) {
        return fn(x);
      };
    }
    module.exports = unary;
  }
});

// node_modules/crocks/helpers/unit.js
var require_unit2 = __commonJS({
  "node_modules/crocks/helpers/unit.js"(exports, module) {
    module.exports = require_unit();
  }
});

// node_modules/crocks/helpers/unsetPath.js
var require_unsetPath = __commonJS({
  "node_modules/crocks/helpers/unsetPath.js"(exports, module) {
    var curry = require_curry();
    var isArray = require_isArray();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isObject = require_isObject();
    var isString = require_isString();
    var array = require_array();
    var object = require_object();
    var pathError = "unsetPath: Non-empty Array of non-empty Strings and/or Positive Integers required for first argument";
    function unsetPath(path3, obj) {
      if (!isArray(path3) || isEmpty(path3)) {
        throw new TypeError(pathError);
      }
      if (!(isObject(obj) || isArray(obj))) {
        return obj;
      }
      var key = path3[0];
      if (!(isString(key) && !isEmpty(key) || isInteger(key) && key >= 0)) {
        throw new TypeError(pathError);
      }
      if (path3.length === 1) {
        if (isArray(obj) && isInteger(key)) {
          return array.unset(key, obj);
        }
        if (isObject(obj) && isString(key)) {
          return object.unset(key, obj);
        }
        return obj;
      }
      var next = obj[key];
      if (!(isObject(next) || isArray(next))) {
        return obj;
      }
      if (isArray(obj)) {
        return array.set(key, unsetPath(path3.slice(1), next), obj);
      }
      return object.set(key, unsetPath(path3.slice(1), next), obj);
    }
    module.exports = curry(unsetPath);
  }
});

// node_modules/crocks/helpers/index.js
var require_helpers = __commonJS({
  "node_modules/crocks/helpers/index.js"(exports, module) {
    module.exports = {
      assign: require_assign(),
      assoc: require_assoc(),
      binary: require_binary(),
      compose: require_compose3(),
      composeK: require_composeK(),
      composeP: require_composeP(),
      composeS: require_composeS(),
      curry: require_curry2(),
      defaultProps: require_defaultProps(),
      defaultTo: require_defaultTo(),
      dissoc: require_dissoc(),
      fromPairs: require_fromPairs(),
      getPathOr: require_getPathOr(),
      liftA2: require_liftA2(),
      liftA3: require_liftA3(),
      liftN: require_liftN(),
      getPropOr: require_getPropOr(),
      mapProps: require_mapProps(),
      mapReduce: require_mapReduce(),
      mconcat: require_mconcat(),
      mconcatMap: require_mconcatMap2(),
      mreduce: require_mreduce(),
      mreduceMap: require_mreduceMap(),
      nAry: require_nAry(),
      objOf: require_objOf(),
      omit: require_omit(),
      once: require_once2(),
      partial: require_partial(),
      pick: require_pick(),
      pipe: require_pipe(),
      pipeK: require_pipeK(),
      pipeP: require_pipeP(),
      pipeS: require_pipeS(),
      propOr: require_propOr(),
      propPathOr: require_propPathOr(),
      setPath: require_setPath(),
      setProp: require_setProp(),
      tap: require_tap(),
      unary: require_unary(),
      unit: require_unit2(),
      unsetPath: require_unsetPath(),
      unsetProp: require_unsetProp()
    };
  }
});

// node_modules/crocks/Pair/branch.js
var require_branch = __commonJS({
  "node_modules/crocks/Pair/branch.js"(exports, module) {
    var Pair = require_Pair();
    function branch(x) {
      return Pair(x, x);
    }
    module.exports = branch;
  }
});

// node_modules/crocks/Pair/fanout.js
var require_fanout = __commonJS({
  "node_modules/crocks/Pair/fanout.js"(exports, module) {
    var Pair = require_Pair();
    var curry = require_curry();
    var isContravariant = require_isContravariant();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var isSemigroupoid = require_isSemigroupoid();
    var valid = function(x, y) {
      return isSameType(x, y) && isSemigroupoid(x) && isContravariant(x) && isFunction(x.first) && isFunction(x.second);
    };
    function fanout(fst, snd) {
      if (isFunction(fst) && isFunction(snd)) {
        return function(x) {
          return Pair(fst(x), snd(x));
        };
      }
      if (valid(fst, snd)) {
        return fst.first().compose(snd.second()).contramap(function(x) {
          return Pair(x, x);
        });
      }
      throw new TypeError(
        "fanout: Arrows, Functions or Stars of the same type required for both arguments"
      );
    }
    module.exports = curry(fanout);
  }
});

// node_modules/crocks/Maybe/find.js
var require_find = __commonJS({
  "node_modules/crocks/Maybe/find.js"(exports, module) {
    var Pred = require_types().proxy("Pred");
    var curry = require_curry();
    var predOrFunc = require_predOrFunc();
    var isFunction = require_isFunction();
    var isFoldable = require_isFoldable();
    var isSameType = require_isSameType();
    var ref = require_Maybe2();
    var Just = ref.Just;
    var Nothing = ref.Nothing;
    var accumulator = function(fn) {
      return function(acc, cur) {
        return !acc.found && predOrFunc(fn, cur) ? { found: true, value: cur } : acc;
      };
    };
    function find3(fn, foldable) {
      if (!isFunction(fn) && !isSameType(Pred, fn)) {
        throw new TypeError("find: First argument must be a Pred or predicate");
      }
      if (!isFoldable(foldable)) {
        throw new TypeError("find: Second argument must be a Foldable");
      }
      var result = foldable.reduce(accumulator(fn), { found: false });
      return result.found ? Just(result.value) : Nothing();
    }
    module.exports = curry(find3);
  }
});

// node_modules/crocks/Maybe/getPath.js
var require_getPath = __commonJS({
  "node_modules/crocks/Maybe/getPath.js"(exports, module) {
    var ref = require_Maybe();
    var Nothing = ref.Nothing;
    var Just = ref.Just;
    var curry = require_curry();
    var isArray = require_isArray();
    var isDefined = require_isDefined();
    var isEmpty = require_isEmpty();
    var isInteger = require_isInteger();
    var isNil3 = require_isNil();
    var isString = require_isString();
    function fn(name) {
      function getPath2(keys4, target) {
        if (!isArray(keys4)) {
          throw new TypeError(name + ": Array of Non-empty Strings or Integers required for first argument");
        }
        if (isNil3(target)) {
          return Nothing();
        }
        var value = target;
        for (var i = 0; i < keys4.length; i++) {
          var key = keys4[i];
          if (!(isString(key) && !isEmpty(key) || isInteger(key))) {
            throw new TypeError(name + ": Array of Non-empty Strings or Integers required for first argument");
          }
          if (isNil3(value)) {
            return Nothing();
          }
          value = value[key];
          if (!isDefined(value)) {
            return Nothing();
          }
        }
        return Just(value);
      }
      return curry(getPath2);
    }
    var getPath = fn("getPath");
    getPath.origFn = fn;
    module.exports = getPath;
  }
});

// node_modules/crocks/Maybe/getProp.js
var require_getProp = __commonJS({
  "node_modules/crocks/Maybe/getProp.js"(exports, module) {
    var curry = require_curry();
    var isDefined = require_isDefined();
    var isEmpty = require_isEmpty();
    var isNil3 = require_isNil();
    var isInteger = require_isInteger();
    var isString = require_isString();
    var ref = require_Maybe();
    var Nothing = ref.Nothing;
    var Just = ref.Just;
    function fn(name) {
      function getProp2(key, target) {
        if (!(isString(key) && !isEmpty(key) || isInteger(key))) {
          throw new TypeError(name + ": Non-empty String or Integer required for first argument");
        }
        if (isNil3(target)) {
          return Nothing();
        }
        var value = target[key];
        return isDefined(value) ? Just(value) : Nothing();
      }
      return curry(getProp2);
    }
    var getProp = fn("getProp");
    getProp.origFn = fn;
    module.exports = getProp;
  }
});

// node_modules/crocks/Maybe/prop.js
var require_prop = __commonJS({
  "node_modules/crocks/Maybe/prop.js"(exports, module) {
    var getProp = require_getProp();
    module.exports = getProp.origFn("prop");
  }
});

// node_modules/crocks/Maybe/propPath.js
var require_propPath = __commonJS({
  "node_modules/crocks/Maybe/propPath.js"(exports, module) {
    var getPath = require_getPath();
    module.exports = getPath.origFn("propPath");
  }
});

// node_modules/crocks/Maybe/safe.js
var require_safe = __commonJS({
  "node_modules/crocks/Maybe/safe.js"(exports, module) {
    var ref = require_Maybe();
    var Nothing = ref.Nothing;
    var Just = ref.Just;
    var predOrFunc = require_predOrFunc();
    var curry = require_curry();
    var isPredOrFunc = require_isPredOrFunc();
    function safe(pred, x) {
      if (!isPredOrFunc(pred)) {
        throw new TypeError("safe: Pred or predicate function required for first argument");
      }
      return predOrFunc(pred, x) ? Just(x) : Nothing();
    }
    module.exports = curry(safe);
  }
});

// node_modules/crocks/Maybe/safeAfter.js
var require_safeAfter = __commonJS({
  "node_modules/crocks/Maybe/safeAfter.js"(exports, module) {
    var ref = require_Maybe();
    var Just = ref.Just;
    var Nothing = ref.Nothing;
    var curry = require_curry();
    var isPredOrFunc = require_isPredOrFunc();
    var isFunction = require_isFunction();
    var predOrFunc = require_predOrFunc();
    function safeAfter(pred, fn) {
      if (!isPredOrFunc(pred)) {
        throw new TypeError("safeAfter: Pred or predicate function required for first argument");
      }
      if (!isFunction(fn)) {
        throw new TypeError("safeAfter: Function required for second argument");
      }
      return function(x) {
        var result = fn(x);
        return predOrFunc(pred, result) ? Just(result) : Nothing();
      };
    }
    module.exports = curry(safeAfter);
  }
});

// node_modules/crocks/Maybe/safeLift.js
var require_safeLift = __commonJS({
  "node_modules/crocks/Maybe/safeLift.js"(exports, module) {
    var compose2 = require_compose();
    var curry = require_curry();
    var isPredOrFunc = require_isPredOrFunc();
    var isFunction = require_isFunction();
    var safe = require_safe();
    var map3 = function(fn) {
      return function(m) {
        return m.map(fn);
      };
    };
    function safeLift(pred, fn) {
      if (!isPredOrFunc(pred)) {
        throw new TypeError("safeLift: Pred or predicate function required for first argument");
      } else if (!isFunction(fn)) {
        throw new TypeError("safeLift: Function required for second argument");
      }
      return compose2(map3(fn), safe(pred));
    }
    module.exports = curry(safeLift);
  }
});

// node_modules/crocks/Pair/toPairs.js
var require_toPairs = __commonJS({
  "node_modules/crocks/Pair/toPairs.js"(exports, module) {
    var List = require_List();
    var Pair = require_Pair();
    var isObject = require_isObject();
    function toPairs(obj) {
      if (!isObject(obj)) {
        throw new TypeError("toPairs: Object required for argument");
      }
      return Object.keys(obj).reduce(
        function(acc, key) {
          return obj[key] !== void 0 ? acc.concat(List.of(Pair(key, obj[key]))) : acc;
        },
        List.empty()
      );
    }
    module.exports = toPairs;
  }
});

// node_modules/crocks/Result/tryCatch.js
var require_tryCatch = __commonJS({
  "node_modules/crocks/Result/tryCatch.js"(exports, module) {
    var ref = require_Result();
    var Err = ref.Err;
    var Ok = ref.Ok;
    var curry = require_curry();
    var isFunction = require_isFunction();
    function tryCatch(fn) {
      if (!isFunction(fn)) {
        throw new TypeError("tryCatch: Function required for first argument");
      }
      var safe = function() {
        try {
          return Ok(fn.apply(this, arguments));
        } catch (e) {
          return Err(e);
        }
      };
      Object.defineProperty(safe, "length", { value: fn.length });
      return safe;
    }
    module.exports = curry(tryCatch);
  }
});

// node_modules/crocks/All/index.js
var require_All = __commonJS({
  "node_modules/crocks/All/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _equals2 = require_equals();
    var type3 = require_types().type("All");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isFunction = require_isFunction();
    var isNil3 = require_isNil();
    var isSameType = require_isSameType();
    var _empty = function() {
      return All(true);
    };
    function All(b) {
      var obj;
      var x = isNil3(b) ? _empty().valueOf() : b;
      if (!arguments.length || isFunction(x)) {
        throw new TypeError("All: Non-function value required");
      }
      var valueOf = function() {
        return !!x;
      };
      var empty = _empty;
      var equals3 = function(m) {
        return isSameType(All, m) && _equals2(x, m.valueOf());
      };
      var inspect = function() {
        return "All" + _inspect(valueOf());
      };
      function concat(method) {
        return function(m) {
          if (!isSameType(All, m)) {
            throw new TypeError("All." + method + ": All required");
          }
          return All(m.valueOf() && valueOf());
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        equals: equals3,
        valueOf,
        type: type3,
        empty
      }, obj["@@type"] = _type, obj.concat = concat("concat"), obj[fl.equals] = equals3, obj[fl.concat] = concat(fl.concat), obj[fl.empty] = empty, obj.constructor = All, obj;
    }
    All["@@implements"] = _implements(
      ["equals", "concat", "empty"]
    );
    All.empty = _empty;
    All.type = type3;
    All[fl.empty] = _empty;
    All["@@type"] = _type;
    module.exports = All;
  }
});

// node_modules/crocks/Any/index.js
var require_Any = __commonJS({
  "node_modules/crocks/Any/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _equals2 = require_equals();
    var type3 = require_types().type("Any");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isFunction = require_isFunction();
    var isNil3 = require_isNil();
    var isSameType = require_isSameType();
    var _empty = function() {
      return Any(false);
    };
    function Any(b) {
      var obj;
      var x = isNil3(b) ? _empty().valueOf() : b;
      if (!arguments.length || isFunction(x)) {
        throw new TypeError("Any: Non-function value required");
      }
      var valueOf = function() {
        return !!x;
      };
      var empty = _empty;
      var inspect = function() {
        return "Any" + _inspect(valueOf());
      };
      var equals3 = function(m) {
        return isSameType(Any, m) && _equals2(x, m.valueOf());
      };
      function concat(method) {
        return function(m) {
          if (!isSameType(Any, m)) {
            throw new TypeError("Any." + method + ": Any required");
          }
          return Any(m.valueOf() || valueOf());
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        equals: equals3,
        valueOf,
        type: type3,
        empty
      }, obj["@@type"] = _type, obj.concat = concat("concat"), obj[fl.equals] = equals3, obj[fl.concat] = concat(fl.concat), obj[fl.empty] = empty, obj.constructor = Any, obj;
    }
    Any["@@implements"] = _implements(
      ["equals", "concat", "empty"]
    );
    Any.empty = _empty;
    Any.type = type3;
    Any[fl.empty] = _empty;
    Any["@@type"] = _type;
    module.exports = Any;
  }
});

// node_modules/crocks/Assign/index.js
var require_Assign = __commonJS({
  "node_modules/crocks/Assign/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _object = require_object();
    var _equals2 = require_equals();
    var type3 = require_types().type("Assign");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isNil3 = require_isNil();
    var isObject = require_isObject();
    var isSameType = require_isSameType();
    var _empty = function() {
      return Assign({});
    };
    function Assign(o) {
      var obj;
      var x = isNil3(o) ? _empty().valueOf() : o;
      if (!arguments.length || !isObject(x)) {
        throw new TypeError("Assign: Object required");
      }
      var valueOf = function() {
        return x;
      };
      var empty = _empty;
      var inspect = function() {
        return "Assign" + _inspect(valueOf());
      };
      var equals3 = function(m) {
        return isSameType(Assign, m) && _equals2(x, m.valueOf());
      };
      function concat(method) {
        return function(m) {
          if (!isSameType(Assign, m)) {
            throw new TypeError("Assign." + method + ": Assign required");
          }
          return Assign(_object.assign(m.valueOf(), x));
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        equals: equals3,
        valueOf,
        type: type3,
        empty,
        concat: concat("concat")
      }, obj[fl.equals] = equals3, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj["@@type"] = _type, obj.constructor = Assign, obj;
    }
    Assign["@@implements"] = _implements(
      ["equals", "concat", "empty"]
    );
    Assign.empty = _empty;
    Assign.type = type3;
    Assign[fl.empty] = _empty;
    Assign["@@type"] = _type;
    module.exports = Assign;
  }
});

// node_modules/crocks/Endo/index.js
var require_Endo = __commonJS({
  "node_modules/crocks/Endo/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var type3 = require_types().type("Endo");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var compose2 = require_compose();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var _empty = function() {
      return Endo(function(x) {
        return x;
      });
    };
    function Endo(runWith) {
      var obj;
      if (!isFunction(runWith)) {
        throw new TypeError("Endo: Function value required");
      }
      var valueOf = function() {
        return runWith;
      };
      var empty = _empty;
      var inspect = function() {
        return "Endo" + _inspect(valueOf());
      };
      function concat(method) {
        return function(m) {
          if (!isSameType(Endo, m)) {
            throw new TypeError("Endo." + method + ": Endo required");
          }
          return Endo(compose2(m.valueOf(), valueOf()));
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        valueOf,
        type: type3,
        empty,
        runWith,
        concat: concat("concat")
      }, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj["@@type"] = _type, obj.constructor = Endo, obj;
    }
    Endo["@@implements"] = _implements(
      ["concat", "empty"]
    );
    Endo.empty = _empty;
    Endo.type = type3;
    Endo[fl.empty] = _empty;
    Endo["@@type"] = _type;
    module.exports = Endo;
  }
});

// node_modules/crocks/First/index.js
var require_First = __commonJS({
  "node_modules/crocks/First/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _equals2 = require_equals();
    var type3 = require_types().type("First");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isSameType = require_isSameType();
    var Maybe = require_Maybe();
    var _empty = function() {
      return First(Maybe.Nothing());
    };
    function First(x) {
      var obj;
      if (!arguments.length) {
        throw new TypeError("First: Requires one argument");
      }
      var maybe = !isSameType(Maybe, x) ? Maybe.of(x) : x.map(function(x2) {
        return x2;
      });
      var empty = _empty;
      var inspect = function() {
        return "First(" + _inspect(maybe) + " )";
      };
      var equals3 = function(m) {
        return isSameType(First, m) && _equals2(maybe, m.valueOf());
      };
      var valueOf = function() {
        return maybe;
      };
      var option = maybe.option;
      function concat(method) {
        return function(m) {
          if (!isSameType(First, m)) {
            throw new TypeError("First." + method + ": First required");
          }
          var n = m.valueOf().map(function(x2) {
            return x2;
          });
          return First(
            maybe.either(function() {
              return n;
            }, Maybe.Just)
          );
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        equals: equals3,
        empty,
        option,
        type: type3,
        valueOf,
        concat: concat("concat")
      }, obj[fl.equals] = equals3, obj[fl.empty] = _empty, obj[fl.concat] = concat(fl.concat), obj["@@type"] = _type, obj.constructor = First, obj;
    }
    First["@@implements"] = _implements(
      ["equals", "concat", "empty"]
    );
    First.empty = _empty;
    First.type = type3;
    First[fl.empty] = _empty;
    First["@@type"] = _type;
    module.exports = First;
  }
});

// node_modules/crocks/Last/index.js
var require_Last = __commonJS({
  "node_modules/crocks/Last/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _equals2 = require_equals();
    var type3 = require_types().type("Last");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isSameType = require_isSameType();
    var Maybe = require_Maybe();
    var _empty = function() {
      return Last(Maybe.Nothing());
    };
    function Last(x) {
      var obj;
      if (!arguments.length) {
        throw new TypeError("Last: Requires one argument");
      }
      var maybe = !isSameType(Maybe, x) ? Maybe.of(x) : x.map(function(x2) {
        return x2;
      });
      var valueOf = function() {
        return maybe;
      };
      var empty = _empty;
      var inspect = function() {
        return "Last(" + _inspect(maybe) + " )";
      };
      var equals3 = function(m) {
        return isSameType(Last, m) && _equals2(maybe, m.valueOf());
      };
      var option = maybe.option;
      function concat(method) {
        return function(m) {
          if (!isSameType(Last, m)) {
            throw new TypeError("Last." + method + ": Last required");
          }
          var n = m.valueOf().map(function(x2) {
            return x2;
          });
          return Last(
            maybe.either(
              function() {
                return n;
              },
              function() {
                return n.either(function() {
                  return maybe;
                }, function() {
                  return n;
                });
              }
            )
          );
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        equals: equals3,
        empty,
        option,
        type: type3,
        valueOf,
        concat: concat("concat")
      }, obj[fl.equals] = equals3, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj["@@type"] = _type, obj.constructor = Last, obj;
    }
    Last["@@implements"] = _implements(
      ["equals", "concat", "empty"]
    );
    Last.empty = _empty;
    Last.type = type3;
    Last[fl.empty] = _empty;
    Last["@@type"] = _type;
    module.exports = Last;
  }
});

// node_modules/crocks/Max/index.js
var require_Max = __commonJS({
  "node_modules/crocks/Max/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _equals2 = require_equals();
    var type3 = require_types().type("Max");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isNil3 = require_isNil();
    var isNumber = require_isNumber();
    var isSameType = require_isSameType();
    var _empty = function() {
      return Max(-Infinity);
    };
    function Max(n) {
      var obj;
      var x = isNil3(n) ? _empty().valueOf() : n;
      if (!arguments.length || !isNumber(x)) {
        throw new TypeError("Max: Numeric value required");
      }
      var valueOf = function() {
        return x;
      };
      var empty = _empty;
      var inspect = function() {
        return "Max" + _inspect(valueOf());
      };
      var equals3 = function(m) {
        return isSameType(Max, m) && _equals2(x, m.valueOf());
      };
      function concat(method) {
        return function(m) {
          if (!isSameType(Max, m)) {
            throw new TypeError("Max." + method + ": Max requried");
          }
          return Max(Math.max(x, m.valueOf()));
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        equals: equals3,
        valueOf,
        type: type3,
        empty,
        concat: concat("concat")
      }, obj[fl.equals] = equals3, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj["@@type"] = _type, obj.constructor = Max, obj;
    }
    Max["@@implements"] = _implements(
      ["equals", "concat", "empty"]
    );
    Max.empty = _empty;
    Max.type = type3;
    Max[fl.empty] = _empty;
    Max["@@type"] = _type;
    module.exports = Max;
  }
});

// node_modules/crocks/Min/index.js
var require_Min = __commonJS({
  "node_modules/crocks/Min/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _equals2 = require_equals();
    var type3 = require_types().type("Min");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isNil3 = require_isNil();
    var isNumber = require_isNumber();
    var isSameType = require_isSameType();
    var _empty = function() {
      return Min(Infinity);
    };
    function Min(n) {
      var obj;
      var x = isNil3(n) ? _empty().valueOf() : n;
      if (!arguments.length || !isNumber(x)) {
        throw new TypeError("Min: Numeric value required");
      }
      var valueOf = function() {
        return x;
      };
      var empty = _empty;
      var inspect = function() {
        return "Min" + _inspect(valueOf());
      };
      var equals3 = function(m) {
        return isSameType(Min, m) && _equals2(x, m.valueOf());
      };
      function concat(method) {
        return function(m) {
          if (!isSameType(Min, m)) {
            throw new TypeError("Min." + method + ": Min required");
          }
          return Min(Math.min(x, m.valueOf()));
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        equals: equals3,
        valueOf,
        type: type3,
        empty,
        concat: concat("concat")
      }, obj[fl.equals] = equals3, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj["@@type"] = _type, obj.constructor = Min, obj;
    }
    Min["@@implements"] = _implements(
      ["equals", "concat", "empty"]
    );
    Min.empty = _empty;
    Min.type = type3;
    Min[fl.empty] = _empty;
    Min["@@type"] = _type;
    module.exports = Min;
  }
});

// node_modules/crocks/Prod/index.js
var require_Prod = __commonJS({
  "node_modules/crocks/Prod/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _equals2 = require_equals();
    var type3 = require_types().type("Prod");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isNil3 = require_isNil();
    var isNumber = require_isNumber();
    var isSameType = require_isSameType();
    var _empty = function() {
      return Prod(1);
    };
    function Prod(n) {
      var obj;
      var x = isNil3(n) ? _empty().valueOf() : n;
      if (!arguments.length || !isNumber(x)) {
        throw new TypeError("Prod: Numeric value required");
      }
      var valueOf = function() {
        return x;
      };
      var empty = _empty;
      var inspect = function() {
        return "Prod" + _inspect(valueOf());
      };
      var equals3 = function(m) {
        return isSameType(Prod, m) && _equals2(x, m.valueOf());
      };
      function concat(method) {
        return function(m) {
          if (!isSameType(Prod, m)) {
            throw new TypeError("Prod." + method + ": Prod required");
          }
          return Prod(x * m.valueOf());
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        equals: equals3,
        valueOf,
        type: type3,
        empty,
        concat: concat("concat")
      }, obj[fl.equals] = equals3, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj["@@type"] = _type, obj.constructor = Prod, obj;
    }
    Prod["@@implements"] = _implements(
      ["equals", "concat", "empty"]
    );
    Prod.empty = _empty;
    Prod.type = type3;
    Prod[fl.empty] = _empty;
    Prod["@@type"] = _type;
    module.exports = Prod;
  }
});

// node_modules/crocks/Sum/index.js
var require_Sum = __commonJS({
  "node_modules/crocks/Sum/index.js"(exports, module) {
    var VERSION = 2;
    var _implements = require_implements();
    var _inspect = require_inspect();
    var _equals2 = require_equals();
    var type3 = require_types().type("Sum");
    var _type = require_types().typeFn(type3(), VERSION);
    var fl = require_flNames();
    var isNil3 = require_isNil();
    var isNumber = require_isNumber();
    var isSameType = require_isSameType();
    var _empty = function() {
      return Sum(0);
    };
    function Sum(n) {
      var obj;
      var x = isNil3(n) ? _empty().valueOf() : n;
      if (!arguments.length || !isNumber(x)) {
        throw new TypeError("Sum: Numeric value required");
      }
      var valueOf = function() {
        return x;
      };
      var empty = _empty;
      var inspect = function() {
        return "Sum" + _inspect(valueOf());
      };
      var equals3 = function(m) {
        return isSameType(Sum, m) && _equals2(x, m.valueOf());
      };
      function concat(method) {
        return function(m) {
          if (!isSameType(Sum, m)) {
            throw new TypeError("Sum." + method + ": Sum required");
          }
          return Sum(x + m.valueOf());
        };
      }
      return obj = {
        inspect,
        toString: inspect,
        valueOf,
        equals: equals3,
        type: type3,
        empty,
        concat: concat("concat")
      }, obj[fl.equals] = equals3, obj[fl.empty] = empty, obj[fl.concat] = concat(fl.concat), obj["@@type"] = _type, obj.constructor = Sum, obj;
    }
    Sum["@@implements"] = _implements(
      ["equals", "concat", "empty"]
    );
    Sum.empty = _empty;
    Sum.type = type3;
    Sum[fl.empty] = _empty;
    Sum["@@type"] = _type;
    module.exports = Sum;
  }
});

// node_modules/crocks/pointfree/alt.js
var require_alt = __commonJS({
  "node_modules/crocks/pointfree/alt.js"(exports, module) {
    var curry = require_curry();
    var fl = require_flNames();
    var isAlt = require_isAlt();
    var isSameType = require_isSameType();
    function alt(m, x) {
      if (!(isAlt(m) && isSameType(m, x))) {
        throw new TypeError(
          "alt: Both arguments must be Alts of the same type"
        );
      }
      return (x[fl.alt] || x.alt).call(x, m);
    }
    module.exports = curry(alt);
  }
});

// node_modules/crocks/pointfree/ap.js
var require_ap = __commonJS({
  "node_modules/crocks/pointfree/ap.js"(exports, module) {
    var array = require_array();
    var curry = require_curry();
    var isApplicative = require_isApplicative();
    var isArray = require_isArray();
    var isSameType = require_isSameType();
    function ap(m, x) {
      if (!((isApplicative(m) || isArray(m)) && isSameType(m, x))) {
        throw new TypeError("ap: Both arguments must be Applys of the same type");
      }
      if (isArray(x)) {
        return array.ap(m, x);
      }
      return x.ap(m);
    }
    module.exports = curry(ap);
  }
});

// node_modules/crocks/pointfree/bimap.js
var require_bimap = __commonJS({
  "node_modules/crocks/pointfree/bimap.js"(exports, module) {
    var curry = require_curry();
    var isBifunctor = require_isBifunctor();
    var isFunction = require_isFunction();
    var fl = require_flNames();
    function bimap(f, g, m) {
      if (!(isFunction(f) && isFunction(g))) {
        throw new TypeError(
          "bimap: Functions required for first two arguments"
        );
      }
      if (!isBifunctor(m)) {
        throw new TypeError(
          "bimap: Bifunctor required for third argument"
        );
      }
      return (m[fl.bimap] || m.bimap).call(m, f, g);
    }
    module.exports = curry(bimap);
  }
});

// node_modules/crocks/pointfree/bichain.js
var require_bichain = __commonJS({
  "node_modules/crocks/pointfree/bichain.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function bichain(f, g, m) {
      if (!isFunction(f) || !isFunction(g)) {
        throw new TypeError("bichain: First two arguments must be Sum Type returning functions");
      }
      if (m && isFunction(m.bichain)) {
        return m.bichain.call(m, f, g);
      }
      throw new TypeError(
        "bichain: Third argument must be a Sum Type"
      );
    }
    module.exports = curry(bichain);
  }
});

// node_modules/crocks/pointfree/both.js
var require_both = __commonJS({
  "node_modules/crocks/pointfree/both.js"(exports, module) {
    var Pair = require_types().proxy("Pair");
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    function both(m) {
      if (isFunction(m)) {
        return function(x) {
          if (!isSameType(Pair, x)) {
            throw new TypeError("both: Pair required as input");
          }
          return x.bimap(m, m);
        };
      }
      if (m && isFunction(m.both)) {
        return m.both();
      }
      throw new TypeError("both: Strong Function or Profunctor required");
    }
    module.exports = both;
  }
});

// node_modules/crocks/pointfree/chain.js
var require_chain = __commonJS({
  "node_modules/crocks/pointfree/chain.js"(exports, module) {
    var _chain = require_array().chain;
    var curry = require_curry();
    var isArray = require_isArray();
    var isChain = require_isChain();
    var isFunction = require_isFunction();
    var fl = require_flNames();
    function chain(fn, m) {
      if (!isFunction(fn)) {
        throw new TypeError("chain: Chain returning function required for first argument");
      }
      if (!(isChain(m) || isArray(m))) {
        throw new TypeError("chain: Chain of the same type required for second argument");
      }
      if (isArray(m)) {
        return _chain(fn, m);
      }
      return (m[fl.chain] || m.chain).call(m, fn);
    }
    module.exports = curry(chain);
  }
});

// node_modules/crocks/pointfree/coalesce.js
var require_coalesce = __commonJS({
  "node_modules/crocks/pointfree/coalesce.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function coalesce(f, g, m) {
      if (!(isFunction(f) && isFunction(g))) {
        throw new TypeError(
          "coalesce: Functions required for first two arguments"
        );
      }
      if (m && isFunction(m.coalesce)) {
        return m.coalesce(f, g);
      }
      throw new TypeError(
        "coalesce: Sum Type required for third argument"
      );
    }
    module.exports = curry(coalesce);
  }
});

// node_modules/crocks/pointfree/compareWith.js
var require_compareWith = __commonJS({
  "node_modules/crocks/pointfree/compareWith.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function compareWith(x, y, m) {
      if (!(m && isFunction(m.compareWith))) {
        throw new TypeError("compareWith: Equiv required for third argument");
      }
      return m.compareWith(x, y);
    }
    module.exports = curry(compareWith);
  }
});

// node_modules/crocks/pointfree/concat.js
var require_concat = __commonJS({
  "node_modules/crocks/pointfree/concat.js"(exports, module) {
    var curry = require_curry();
    var isSameType = require_isSameType();
    var isSemigroup = require_isSemigroup();
    var fl = require_flNames();
    function concat(x, m) {
      if (!(isSemigroup(m) && isSameType(x, m))) {
        throw new TypeError(
          "concat: Semigroups of the same type required for both arguments"
        );
      }
      return (m[fl.concat] || m.concat).call(m, x);
    }
    module.exports = curry(concat);
  }
});

// node_modules/crocks/pointfree/cons.js
var require_cons = __commonJS({
  "node_modules/crocks/pointfree/cons.js"(exports, module) {
    var curry = require_curry();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    function cons(x, m) {
      if (m && isFunction(m.cons)) {
        return m.cons(x);
      } else if (isArray(m)) {
        return [x].concat(m);
      }
      throw new TypeError("cons: List or Array required for second argument");
    }
    module.exports = curry(cons);
  }
});

// node_modules/crocks/pointfree/contramap.js
var require_contramap = __commonJS({
  "node_modules/crocks/pointfree/contramap.js"(exports, module) {
    var compose2 = require_compose();
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isContravariant = require_isContravariant();
    var fl = require_flNames();
    function contramap(fn, m) {
      if (!isFunction(fn)) {
        throw new TypeError(
          "contramap: Function required for first argument"
        );
      }
      if (isFunction(m)) {
        return compose2(m, fn);
      }
      if (isContravariant(m)) {
        return (m[fl.contramap] || m.contramap).call(m, fn);
      }
      throw new TypeError(
        "contramap: Function or Contavariant Functor of the same type required for second argument"
      );
    }
    module.exports = curry(contramap);
  }
});

// node_modules/crocks/pointfree/either.js
var require_either = __commonJS({
  "node_modules/crocks/pointfree/either.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function either(lf, rf, m) {
      if (!(isFunction(lf) && isFunction(rf))) {
        throw new TypeError(
          "either: First two arguments must be functions"
        );
      }
      if (!(m && isFunction(m.either))) {
        throw new TypeError(
          "either: Last argument must be a Sum Type"
        );
      }
      return m.either(lf, rf);
    }
    module.exports = curry(either);
  }
});

// node_modules/crocks/pointfree/empty.js
var require_empty = __commonJS({
  "node_modules/crocks/pointfree/empty.js"(exports, module) {
    var hasAlg = require_hasAlg();
    var isSameType = require_isSameType();
    var fl = require_flNames();
    function empty(m) {
      if (m && hasAlg("empty", m)) {
        return (m[fl.empty] || m.empty).call(m);
      }
      if (m && hasAlg("empty", m.constructor)) {
        return (m.constructor[fl.empty] || m.constructor.empty).call(m);
      }
      if (isSameType([], m)) {
        return [];
      }
      if (isSameType("", m)) {
        return "";
      }
      if (isSameType({}, m)) {
        return {};
      }
      throw new TypeError("empty: Monoid, Array, String or Object required");
    }
    module.exports = empty;
  }
});

// node_modules/crocks/pointfree/equals.js
var require_equals2 = __commonJS({
  "node_modules/crocks/pointfree/equals.js"(exports, module) {
    var _equals2 = require_equals();
    var curry = require_curry();
    function equals3(x, y) {
      return _equals2(x, y);
    }
    module.exports = curry(equals3);
  }
});

// node_modules/crocks/pointfree/extend.js
var require_extend = __commonJS({
  "node_modules/crocks/pointfree/extend.js"(exports, module) {
    var curry = require_curry();
    var fl = require_flNames();
    var isExtend = require_isExtend();
    var isFunction = require_isFunction();
    function extend(fn, m) {
      if (!isFunction(fn)) {
        throw new TypeError("extend: Function required for first argument");
      }
      if (!isExtend(m)) {
        throw new TypeError("extend: Extend required for second argument");
      }
      return (m[fl.extend] || m.extend).call(m, fn);
    }
    module.exports = curry(extend);
  }
});

// node_modules/crocks/pointfree/filter.js
var require_filter = __commonJS({
  "node_modules/crocks/pointfree/filter.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isPredOrFunc = require_isPredOrFunc();
    var isObject = require_isObject();
    var object = require_object();
    var predOrFunc = require_predOrFunc();
    function filter2(pred, m) {
      if (!isPredOrFunc(pred)) {
        throw new TypeError("filter: Pred or predicate function required for first argument");
      }
      var fn = function(x) {
        return predOrFunc(pred, x);
      };
      if (m && isFunction(m.filter)) {
        return m.filter(fn);
      }
      if (m && isObject(m)) {
        return object.filter(fn, m);
      }
      throw new TypeError("filter: Filterable or Object required for second argument");
    }
    module.exports = curry(filter2);
  }
});

// node_modules/crocks/pointfree/first.js
var require_first = __commonJS({
  "node_modules/crocks/pointfree/first.js"(exports, module) {
    var Pair = require_types().proxy("Pair");
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var identity = function(x) {
      return x;
    };
    function first(m) {
      if (isFunction(m)) {
        return function(x) {
          if (!isSameType(Pair, x)) {
            throw new TypeError("first: Pair required as input");
          }
          return x.bimap(m, identity);
        };
      }
      if (m && isFunction(m.first)) {
        return m.first();
      }
      throw new TypeError("first: Arrow, Function or Star required");
    }
    module.exports = first;
  }
});

// node_modules/crocks/pointfree/fold.js
var require_fold = __commonJS({
  "node_modules/crocks/pointfree/fold.js"(exports, module) {
    var _array = require_array();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    function fold(m) {
      if (isArray(m)) {
        return _array.fold(m);
      }
      if (m && isFunction(m.fold)) {
        return m.fold();
      }
      throw new TypeError("fold: Non-empty Foldable with at least one Semigroup is required");
    }
    module.exports = fold;
  }
});

// node_modules/crocks/pointfree/foldMap.js
var require_foldMap = __commonJS({
  "node_modules/crocks/pointfree/foldMap.js"(exports, module) {
    var _array = require_array();
    var curry = require_curry();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    function foldMap(fn, m) {
      if (!isFunction(fn)) {
        throw new TypeError(
          "foldMap: Function returning Semigroups of the same type required for first argument"
        );
      }
      if (isArray(m)) {
        return _array.foldMap(fn, m);
      }
      if (m && isFunction(m.foldMap)) {
        return m.foldMap(fn);
      }
      throw new TypeError(
        "foldMap: Non-empty Foldable with at least one Semigroup required for second argument"
      );
    }
    module.exports = curry(foldMap);
  }
});

// node_modules/crocks/core/cloneIterable.js
var require_cloneIterable = __commonJS({
  "node_modules/crocks/core/cloneIterable.js"(exports, module) {
    function cloneIterable(source) {
      var copy = Object.create(Object.getPrototypeOf(source));
      Object.assign(copy, source);
      var symbols = Object.getOwnPropertySymbols(source);
      symbols.forEach(function(symbol) {
        copy[symbol] = source[symbol];
      });
      return copy;
    }
    module.exports = cloneIterable;
  }
});

// node_modules/crocks/pointfree/head.js
var require_head = __commonJS({
  "node_modules/crocks/pointfree/head.js"(exports, module) {
    var cloneIterable = require_cloneIterable();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    var isIterable = require_isIterable();
    var isString = require_isString();
    var ref = require_Maybe();
    var Nothing = ref.Nothing;
    var Just = ref.Just;
    function head2(m) {
      if (m && isFunction(m.head)) {
        return m.head();
      }
      if (isArray(m) || isString(m)) {
        return !m.length ? Nothing() : Just(m[0]);
      }
      if (isIterable(m)) {
        var cloned = cloneIterable(m);
        var iterator = cloned[Symbol.iterator]();
        var head3 = iterator.next();
        return head3.done ? Nothing() : Just(head3.value);
      }
      throw new TypeError("head: List or iterable required");
    }
    module.exports = head2;
  }
});

// node_modules/crocks/pointfree/init.js
var require_init = __commonJS({
  "node_modules/crocks/pointfree/init.js"(exports, module) {
    var isFunction = require_isFunction();
    var isNil3 = require_isNil();
    var ref = require_Maybe();
    var Nothing = ref.Nothing;
    var Just = ref.Just;
    function init(m) {
      if (!isNil3(m)) {
        if (isFunction(m.init)) {
          return m.init();
        }
        if (isFunction(m.slice)) {
          return m.length < 2 ? Nothing() : Just(m.slice(0, -1));
        }
      }
      throw new TypeError("init: Argument must be an Array, String, or List");
    }
    module.exports = init;
  }
});

// node_modules/crocks/pointfree/last.js
var require_last = __commonJS({
  "node_modules/crocks/pointfree/last.js"(exports, module) {
    var cloneIterable = require_cloneIterable();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    var isIterable = require_isIterable();
    var isString = require_isString();
    var ref = require_Maybe();
    var Nothing = ref.Nothing;
    var Just = ref.Just;
    function last(m) {
      if (m && isFunction(m.last)) {
        return m.last();
      }
      if (isArray(m) || isString(m)) {
        return !m.length ? Nothing() : Just(m[m.length - 1]);
      }
      if (isIterable(m)) {
        var cloned = cloneIterable(m);
        var iterator = cloned[Symbol.iterator]();
        var curr = iterator.next();
        if (curr.done) {
          return Nothing();
        }
        var val;
        while (!curr.done) {
          val = curr.value;
          curr = iterator.next();
        }
        return Just(val);
      }
      throw new TypeError("last: Argument must be a List, String, or Iterable");
    }
    module.exports = last;
  }
});

// node_modules/crocks/pointfree/map.js
var require_map = __commonJS({
  "node_modules/crocks/pointfree/map.js"(exports, module) {
    var compose2 = require_compose();
    var curry = require_curry();
    var isArray = require_isArray();
    var isObject = require_isObject();
    var isFunction = require_isFunction();
    var isFunctor = require_isFunctor();
    var array = require_array();
    var object = require_object();
    var fl = require_flNames();
    function map3(fn, m) {
      if (!isFunction(fn)) {
        throw new TypeError("map: Function required for first argument");
      }
      if (isFunction(m)) {
        return compose2(fn, m);
      }
      if (isArray(m)) {
        return array.map(fn, m);
      }
      if (m && isFunctor(m)) {
        return (m[fl.map] || m.map).call(m, fn);
      }
      if (isObject(m)) {
        return object.map(fn, m);
      }
      throw new TypeError("map: Object, Function or Functor of the same type required for second argument");
    }
    module.exports = curry(map3);
  }
});

// node_modules/crocks/pointfree/merge.js
var require_merge = __commonJS({
  "node_modules/crocks/pointfree/merge.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function merge(fn, m) {
      if (!isFunction(fn)) {
        throw new TypeError("merge: Function required for first argument");
      }
      if (!(m && isFunction(m.merge))) {
        throw new TypeError("merge: Pair or Tuple required for second argument");
      }
      return m.merge(fn);
    }
    module.exports = curry(merge);
  }
});

// node_modules/crocks/pointfree/option.js
var require_option = __commonJS({
  "node_modules/crocks/pointfree/option.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function option(x, m) {
      if (!(m && isFunction(m.option))) {
        throw new TypeError("option: Last argument must be a Maybe, First or Last");
      }
      return m.option(x);
    }
    module.exports = curry(option);
  }
});

// node_modules/crocks/pointfree/promap.js
var require_promap = __commonJS({
  "node_modules/crocks/pointfree/promap.js"(exports, module) {
    var compose2 = require_compose();
    var curry = require_curry();
    var fl = require_flNames();
    var isFunction = require_isFunction();
    var isProfunctor = require_isProfunctor();
    function promap(l, r, m) {
      if (!(isFunction(l) && isFunction(r))) {
        throw new TypeError(
          "promap: Functions required for first two arguments"
        );
      }
      if (isFunction(m)) {
        return compose2(compose2(r, m), l);
      }
      if (isProfunctor(m)) {
        return (m[fl.promap] || m.promap).call(m, l, r);
      }
      throw new TypeError(
        "promap: Function or Profunctor required for third argument"
      );
    }
    module.exports = curry(promap);
  }
});

// node_modules/crocks/pointfree/reduce.js
var require_reduce = __commonJS({
  "node_modules/crocks/pointfree/reduce.js"(exports, module) {
    var curry = require_curry();
    var isFoldable = require_isFoldable();
    var isFunction = require_isFunction();
    var fl = require_flNames();
    function reduce2(fn, init, m) {
      if (!isFunction(fn)) {
        throw new TypeError(
          "reduce: Function required for first argument"
        );
      }
      if (!isFoldable(m)) {
        throw new TypeError(
          "reduce: Foldable required for third argument"
        );
      }
      return (m[fl.reduce] || m.reduce).call(m, fn, init);
    }
    module.exports = curry(reduce2);
  }
});

// node_modules/crocks/pointfree/reduceRight.js
var require_reduceRight = __commonJS({
  "node_modules/crocks/pointfree/reduceRight.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function reduceRight(fn, init, m) {
      if (!isFunction(fn)) {
        throw new TypeError("reduceRight: Function required for first argument");
      } else if (!(m && isFunction(m.reduceRight))) {
        throw new TypeError("reduceRight: Right Foldable required for third argument");
      }
      return m.reduceRight(fn, init);
    }
    module.exports = curry(reduceRight);
  }
});

// node_modules/crocks/pointfree/reject.js
var require_reject = __commonJS({
  "node_modules/crocks/pointfree/reject.js"(exports, module) {
    var curry = require_curry();
    var isArray = require_isArray();
    var isPredOrFunc = require_isPredOrFunc();
    var isFunction = require_isFunction();
    var isObject = require_isObject();
    var object = require_object();
    var predOrFunc = require_predOrFunc();
    var not = function(fn) {
      return function(x) {
        return !fn(x);
      };
    };
    function reject3(pred, m) {
      if (!isPredOrFunc(pred)) {
        throw new TypeError(
          "reject: Pred or predicate function required for first argument"
        );
      }
      var fn = function(x) {
        return predOrFunc(pred, x);
      };
      if (m && isFunction(m.reject)) {
        return m.reject(fn);
      }
      if (isArray(m)) {
        return m.filter(not(fn));
      }
      if (isObject(m)) {
        return object.filter(not(fn), m);
      }
      throw new TypeError("reject: Foldable or Object required for second argument");
    }
    module.exports = curry(reject3);
  }
});

// node_modules/crocks/pointfree/run.js
var require_run = __commonJS({
  "node_modules/crocks/pointfree/run.js"(exports, module) {
    var isFunction = require_isFunction();
    function run(m) {
      if (!(m && isFunction(m.run))) {
        throw new TypeError("run: IO required");
      }
      return m.run();
    }
    module.exports = run;
  }
});

// node_modules/crocks/pointfree/runWith.js
var require_runWith = __commonJS({
  "node_modules/crocks/pointfree/runWith.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function runWith(x, m) {
      if (!(m && isFunction(m.runWith))) {
        throw new TypeError("runWith: Arrow, Endo, Pred, Reader, Star or State required for second argument");
      }
      return m.runWith(x);
    }
    module.exports = curry(runWith);
  }
});

// node_modules/crocks/pointfree/second.js
var require_second = __commonJS({
  "node_modules/crocks/pointfree/second.js"(exports, module) {
    var Pair = require_types().proxy("Pair");
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var identity = function(x) {
      return x;
    };
    function second(m) {
      if (isFunction(m)) {
        return function(x) {
          if (!isSameType(Pair, x)) {
            throw new TypeError("second: Pair required as input");
          }
          return x.bimap(identity, m);
        };
      }
      if (m && isFunction(m.second)) {
        return m.second();
      }
      throw new TypeError("second: Strong Function or Profunctor required");
    }
    module.exports = second;
  }
});

// node_modules/crocks/pointfree/sequence.js
var require_sequence = __commonJS({
  "node_modules/crocks/pointfree/sequence.js"(exports, module) {
    var array = require_array();
    var curry = require_curry();
    var isArray = require_isArray();
    var isApplicative = require_isApplicative();
    var isFunction = require_isFunction();
    function sequence(af, m) {
      if (!(isApplicative(af) || isFunction(af))) {
        throw new TypeError(
          "sequence: Applicative TypeRep or Apply returning function required for first argument"
        );
      }
      if (m && isFunction(m.sequence)) {
        return m.sequence(af);
      }
      if (isArray(m)) {
        return array.sequence(af, m);
      }
      throw new TypeError("sequence: Traversable or Array required for second argument");
    }
    module.exports = curry(sequence);
  }
});

// node_modules/crocks/pointfree/swap.js
var require_swap = __commonJS({
  "node_modules/crocks/pointfree/swap.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function swap(f, g, m) {
      if (!(isFunction(f) && isFunction(g))) {
        throw new TypeError(
          "swap: Function required for first two arguments"
        );
      }
      if (m && isFunction(m.swap)) {
        return m.swap(f, g);
      }
      throw new TypeError(
        "swap: Async, Either, Pair or Result required for third arguments"
      );
    }
    module.exports = curry(swap);
  }
});

// node_modules/crocks/pointfree/tail.js
var require_tail = __commonJS({
  "node_modules/crocks/pointfree/tail.js"(exports, module) {
    var isFunction = require_isFunction();
    var isNil3 = require_isNil();
    var ref = require_Maybe();
    var Nothing = ref.Nothing;
    var Just = ref.Just;
    function tail2(m) {
      if (!isNil3(m)) {
        if (isFunction(m.tail)) {
          return m.tail();
        }
        if (isFunction(m.slice)) {
          return m.length < 2 ? Nothing() : Just(m.slice(1));
        }
      }
      throw new TypeError("tail: Array, String or List required");
    }
    module.exports = tail2;
  }
});

// node_modules/crocks/pointfree/traverse.js
var require_traverse = __commonJS({
  "node_modules/crocks/pointfree/traverse.js"(exports, module) {
    var array = require_array();
    var curry = require_curry();
    var isApplicative = require_isApplicative();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    function traverse(af, fn, m) {
      if (!(isApplicative(af) || isFunction(af))) {
        throw new TypeError(
          "traverse: Applicative TypeRep or Apply returning function required for first argument"
        );
      }
      if (!isFunction(fn)) {
        throw new TypeError(
          "traverse: Apply returning function required for second argument"
        );
      }
      if (m && isFunction(m.traverse)) {
        return m.traverse(af, fn);
      }
      if (isArray(m)) {
        return array.traverse(af, fn, m);
      }
      throw new TypeError("traverse: Traversable or Array required for third argument");
    }
    module.exports = curry(traverse);
  }
});

// node_modules/crocks/pointfree/valueOf.js
var require_valueOf = __commonJS({
  "node_modules/crocks/pointfree/valueOf.js"(exports, module) {
    var isNil3 = require_isNil();
    function valueOf(m) {
      if (isNil3(m)) {
        return m;
      }
      return m.valueOf();
    }
    module.exports = valueOf;
  }
});

// node_modules/crocks/pointfree/index.js
var require_pointfree = __commonJS({
  "node_modules/crocks/pointfree/index.js"(exports, module) {
    module.exports = {
      alt: require_alt(),
      ap: require_ap(),
      bimap: require_bimap(),
      bichain: require_bichain(),
      both: require_both(),
      chain: require_chain(),
      coalesce: require_coalesce(),
      compareWith: require_compareWith(),
      concat: require_concat(),
      cons: require_cons(),
      contramap: require_contramap(),
      either: require_either(),
      empty: require_empty(),
      equals: require_equals2(),
      extend: require_extend(),
      filter: require_filter(),
      first: require_first(),
      fold: require_fold(),
      foldMap: require_foldMap(),
      head: require_head(),
      init: require_init(),
      last: require_last(),
      map: require_map(),
      merge: require_merge(),
      option: require_option(),
      promap: require_promap(),
      reduce: require_reduce(),
      reduceRight: require_reduceRight(),
      reject: require_reject(),
      run: require_run(),
      runWith: require_runWith(),
      second: require_second(),
      sequence: require_sequence(),
      swap: require_swap(),
      tail: require_tail(),
      traverse: require_traverse(),
      valueOf: require_valueOf()
    };
  }
});

// node_modules/crocks/State/evalWith.js
var require_evalWith = __commonJS({
  "node_modules/crocks/State/evalWith.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function evalWith(x, m) {
      if (!(m && isFunction(m.evalWith))) {
        throw new TypeError("evalWith: State required for second argument");
      }
      return m.evalWith(x);
    }
    module.exports = curry(evalWith);
  }
});

// node_modules/crocks/State/execWith.js
var require_execWith = __commonJS({
  "node_modules/crocks/State/execWith.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function execWith(x, m) {
      if (!(m && isFunction(m.execWith))) {
        throw new TypeError("execWith: State required for second argument");
      }
      return m.execWith(x);
    }
    module.exports = curry(execWith);
  }
});

// node_modules/crocks/Pair/fst.js
var require_fst = __commonJS({
  "node_modules/crocks/Pair/fst.js"(exports, module) {
    var isFunction = require_isFunction();
    function fst(m) {
      if (!(m && isFunction(m.fst))) {
        throw new TypeError("fst: Pair required");
      }
      return m.fst();
    }
    module.exports = fst;
  }
});

// node_modules/crocks/Writer/log.js
var require_log = __commonJS({
  "node_modules/crocks/Writer/log.js"(exports, module) {
    var isFunction = require_isFunction();
    function log(m) {
      if (!(m && isFunction(m.log))) {
        throw new TypeError("log: Writer required");
      }
      return m.log();
    }
    module.exports = log;
  }
});

// node_modules/crocks/Tuple/nmap.js
var require_nmap = __commonJS({
  "node_modules/crocks/Tuple/nmap.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isInteger = require_isInteger();
    var isSameType = require_isSameType();
    var Tuple = require_Tuple();
    var validTuple = function(n, m) {
      return isSameType(Tuple(n), m);
    };
    function runMap(m, fns) {
      var n = fns.length;
      if (!validTuple(n, m)) {
        throw new TypeError("nmap: " + n + "-Tuple required");
      }
      fns.forEach(function(fn) {
        if (!isFunction(fn)) {
          throw new TypeError("nmap: Functions required for all arguments");
        }
      });
      return m.mapAll.apply(m, fns);
    }
    var withLength = function(n, fn) {
      return Object.defineProperty(fn, "length", {
        value: n
      });
    };
    function nmap(n) {
      if (!(isInteger(n) && n >= 1)) {
        throw new TypeError("nmap: Integer required for first argument");
      }
      switch (n) {
        case 1:
          return function(a, m) {
            return runMap(m, [a]);
          };
        case 2:
          return function(a, b, m) {
            return runMap(m, [a, b]);
          };
        case 3:
          return function(a, b, c, m) {
            return runMap(m, [a, b, c]);
          };
        case 4:
          return function(a, b, c, d, m) {
            return runMap(m, [a, b, c, d]);
          };
        case 5:
          return function(a, b, c, d, e, m) {
            return runMap(m, [a, b, c, d, e]);
          };
        case 6:
          return function(a, b, c, d, e, f, m) {
            return runMap(m, [a, b, c, d, e, f]);
          };
        case 7:
          return function(a, b, c, d, e, f, g, m) {
            return runMap(m, [a, b, c, d, e, f, g]);
          };
        case 8:
          return function(a, b, c, d, e, f, g, h, m) {
            return runMap(m, [a, b, c, d, e, f, g, h]);
          };
        case 9:
          return function(a, b, c, d, e, f, g, h, i, m) {
            return runMap(m, [a, b, c, d, e, f, g, h, i]);
          };
        case 10:
          return function(a, b, c, d, e, f, g, h, i, j, m) {
            return runMap(m, [a, b, c, d, e, f, g, h, i, j]);
          };
        default:
          return withLength(n + 1, function() {
            var parts = [].slice.call(arguments);
            return runMap(parts[parts.length - 1], parts.slice(0, parts.length - 1));
          });
      }
    }
    module.exports = curry(nmap);
  }
});

// node_modules/crocks/Tuple/project.js
var require_project = __commonJS({
  "node_modules/crocks/Tuple/project.js"(exports, module) {
    var isFunction = require_isFunction();
    var curry = require_curry();
    function project(index, m) {
      if (!(m && isFunction(m.project))) {
        throw new TypeError("project: Tuple required");
      }
      return m.project(index);
    }
    module.exports = curry(project);
  }
});

// node_modules/crocks/Async/race.js
var require_race = __commonJS({
  "node_modules/crocks/Async/race.js"(exports, module) {
    var curry = require_curry();
    var isSameType = require_isSameType();
    var Async2 = require_types().proxy("Async");
    function race(m, a) {
      if (!(isSameType(m, a) && isSameType(Async2, m))) {
        throw new TypeError("race: Both arguments must be Asyncs");
      }
      return a.race(m);
    }
    module.exports = curry(race);
  }
});

// node_modules/crocks/Writer/read.js
var require_read = __commonJS({
  "node_modules/crocks/Writer/read.js"(exports, module) {
    var isFunction = require_isFunction();
    function read(m) {
      if (!(m && isFunction(m.read))) {
        throw new TypeError("read: Writer required");
      }
      return m.read();
    }
    module.exports = read;
  }
});

// node_modules/crocks/Pair/snd.js
var require_snd = __commonJS({
  "node_modules/crocks/Pair/snd.js"(exports, module) {
    var isFunction = require_isFunction();
    function snd(m) {
      if (!(m && isFunction(m.snd))) {
        throw new TypeError("snd: Pair required");
      }
      return m.snd();
    }
    module.exports = snd;
  }
});

// node_modules/crocks/List/arrayToList.js
var require_arrayToList = __commonJS({
  "node_modules/crocks/List/arrayToList.js"(exports, module) {
    var List = require_List2();
    var curry = require_curry();
    var isArray = require_isArray();
    var isFunction = require_isFunction();
    function arrayToList(array) {
      if (isArray(array)) {
        return List.fromArray(array);
      } else if (isFunction(array)) {
        return function(x) {
          var g = array(x);
          if (!isArray(g)) {
            throw new TypeError("arrayToList: Array returning function required");
          }
          return List.fromArray(g);
        };
      }
      throw new TypeError("arrayToList: Array or Array returning function required");
    }
    module.exports = curry(arrayToList);
  }
});

// node_modules/crocks/Async/asyncToPromise.js
var require_asyncToPromise = __commonJS({
  "node_modules/crocks/Async/asyncToPromise.js"(exports, module) {
    var curry = require_curry();
    var isSameType = require_isSameType();
    var isFunction = require_isFunction();
    var Async2 = require_types().proxy("Async");
    var toPromise = function(m) {
      if (!isSameType(Async2, m)) {
        throw new TypeError("asyncToPromise: Async or a function returning an Async required");
      }
      return m.toPromise();
    };
    function asyncToPromise(m) {
      return isFunction(m) ? function(x) {
        return toPromise(m(x));
      } : toPromise(m);
    }
    module.exports = curry(asyncToPromise);
  }
});

// node_modules/crocks/Async/eitherToAsync.js
var require_eitherToAsync = __commonJS({
  "node_modules/crocks/Async/eitherToAsync.js"(exports, module) {
    var Async2 = require_Async();
    var Either = require_types().proxy("Either");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(either) {
      return either.either(Async2.Rejected, Async2.Resolved);
    };
    function eitherToAsync(either) {
      if (isFunction(either)) {
        return function(x) {
          var m = either(x);
          if (!isSameType(Either, m)) {
            throw new TypeError("eitherToAsync: Either returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Either, either)) {
        return applyTransform(either);
      }
      throw new TypeError("eitherToAsync: Either or Either returning function required");
    }
    module.exports = curry(eitherToAsync);
  }
});

// node_modules/crocks/First/eitherToFirst.js
var require_eitherToFirst = __commonJS({
  "node_modules/crocks/First/eitherToFirst.js"(exports, module) {
    var First = require_First();
    var Either = require_types().proxy("Either");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(either) {
      return either.either(First.empty, First);
    };
    function eitherToFirst(either) {
      if (isFunction(either)) {
        return function(x) {
          var m = either(x);
          if (!isSameType(Either, m)) {
            throw new TypeError("eitherToFirst: Either returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Either, either)) {
        return applyTransform(either);
      }
      throw new TypeError("eitherToFirst: Either or Either returning function required");
    }
    module.exports = curry(eitherToFirst);
  }
});

// node_modules/crocks/Last/eitherToLast.js
var require_eitherToLast = __commonJS({
  "node_modules/crocks/Last/eitherToLast.js"(exports, module) {
    var Last = require_Last();
    var Either = require_types().proxy("Either");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(either) {
      return either.either(Last.empty, Last);
    };
    function eitherToLast(either) {
      if (isFunction(either)) {
        return function(x) {
          var m = either(x);
          if (!isSameType(Either, m)) {
            throw new TypeError("eitherToLast: Either returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Either, either)) {
        return applyTransform(either);
      }
      throw new TypeError("eitherToLast: Either or Either returning function required");
    }
    module.exports = curry(eitherToLast);
  }
});

// node_modules/crocks/Maybe/eitherToMaybe.js
var require_eitherToMaybe = __commonJS({
  "node_modules/crocks/Maybe/eitherToMaybe.js"(exports, module) {
    var Maybe = require_Maybe2();
    var Either = require_types().proxy("Either");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(either) {
      return either.either(Maybe.Nothing, Maybe.Just);
    };
    function eitherToMaybe(either) {
      if (isFunction(either)) {
        return function(x) {
          var m = either(x);
          if (!isSameType(Either, m)) {
            throw new TypeError("eitherToMaybe: Either returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Either, either)) {
        return applyTransform(either);
      }
      throw new TypeError("eitherToMaybe: Either or Either returning function required");
    }
    module.exports = curry(eitherToMaybe);
  }
});

// node_modules/crocks/Result/eitherToResult.js
var require_eitherToResult = __commonJS({
  "node_modules/crocks/Result/eitherToResult.js"(exports, module) {
    var Result = require_Result();
    var Either = require_types().proxy("Either");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(either) {
      return either.either(Result.Err, Result.Ok);
    };
    function eitherToResult(either) {
      if (isFunction(either)) {
        return function(x) {
          var m = either(x);
          if (!isSameType(Either, m)) {
            throw new TypeError("eitherToResult: Either returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Either, either)) {
        return applyTransform(either);
      }
      throw new TypeError("eitherToResult: Either or Either returning function required");
    }
    module.exports = curry(eitherToResult);
  }
});

// node_modules/crocks/Async/firstToAsync.js
var require_firstToAsync = __commonJS({
  "node_modules/crocks/Async/firstToAsync.js"(exports, module) {
    var Async2 = require_Async();
    var First = require_types().proxy("First");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var applyTransform = function(left, first) {
      return first.valueOf().either(
        constant(Async2.Rejected(left)),
        Async2.Resolved
      );
    };
    function firstToAsync(left, first) {
      if (isFunction(first)) {
        return function(x) {
          var m = first(x);
          if (!isSameType(First, m)) {
            throw new TypeError("firstToAsync: First returning function required for second argument");
          }
          return applyTransform(left, m);
        };
      }
      if (isSameType(First, first)) {
        return applyTransform(left, first);
      }
      throw new TypeError("firstToAsync: First or First returning function required for second argument");
    }
    module.exports = curry(firstToAsync);
  }
});

// node_modules/crocks/Either/firstToEither.js
var require_firstToEither = __commonJS({
  "node_modules/crocks/Either/firstToEither.js"(exports, module) {
    var Either = require_Either();
    var First = require_types().proxy("First");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var applyTransform = function(left, first) {
      return first.valueOf().either(
        constant(Either.Left(left)),
        Either.Right
      );
    };
    function firstToEither(left, first) {
      if (isFunction(first)) {
        return function(x) {
          var m = first(x);
          if (!isSameType(First, m)) {
            throw new TypeError("firstToEither: First returning function required for second argument");
          }
          return applyTransform(left, m);
        };
      }
      if (isSameType(First, first)) {
        return applyTransform(left, first);
      }
      throw new TypeError("firstToEither: First or First returning function required for second argument");
    }
    module.exports = curry(firstToEither);
  }
});

// node_modules/crocks/Last/firstToLast.js
var require_firstToLast = __commonJS({
  "node_modules/crocks/Last/firstToLast.js"(exports, module) {
    var Last = require_Last();
    var First = require_types().proxy("First");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(first) {
      return Last(first.valueOf());
    };
    function firstToLast(first) {
      if (isFunction(first)) {
        return function(x) {
          var m = first(x);
          if (!isSameType(First, m)) {
            throw new TypeError("firstToLast: First returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(First, first)) {
        return applyTransform(first);
      }
      throw new TypeError("firstToLast: First or First returning function required");
    }
    module.exports = curry(firstToLast);
  }
});

// node_modules/crocks/Maybe/firstToMaybe.js
var require_firstToMaybe = __commonJS({
  "node_modules/crocks/Maybe/firstToMaybe.js"(exports, module) {
    var First = require_types().proxy("First");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(first) {
      return first.valueOf();
    };
    function firstToMaybe(first) {
      if (isFunction(first)) {
        return function(x) {
          var m = first(x);
          if (!isSameType(First, m)) {
            throw new TypeError("firstToMaybe: First returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(First, first)) {
        return applyTransform(first);
      }
      throw new TypeError("firstToMaybe: First or First returning function required");
    }
    module.exports = curry(firstToMaybe);
  }
});

// node_modules/crocks/Result/firstToResult.js
var require_firstToResult = __commonJS({
  "node_modules/crocks/Result/firstToResult.js"(exports, module) {
    var Result = require_Result();
    var First = require_types().proxy("First");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var applyTransform = function(left, first) {
      return first.valueOf().either(
        constant(Result.Err(left)),
        Result.Ok
      );
    };
    function firstToResult(left, first) {
      if (isFunction(first)) {
        return function(x) {
          var m = first(x);
          if (!isSameType(First, m)) {
            throw new TypeError("firstToResult: First returning function required for second argument");
          }
          return applyTransform(left, m);
        };
      }
      if (isSameType(First, first)) {
        return applyTransform(left, first);
      }
      throw new TypeError("firstToResult: First or First returning function required for second argument");
    }
    module.exports = curry(firstToResult);
  }
});

// node_modules/crocks/Async/lastToAsync.js
var require_lastToAsync = __commonJS({
  "node_modules/crocks/Async/lastToAsync.js"(exports, module) {
    var Async2 = require_Async();
    var Last = require_types().proxy("Last");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var applyTransform = function(left, last) {
      return last.valueOf().either(
        constant(Async2.Rejected(left)),
        Async2.Resolved
      );
    };
    function lastToAsync(left, last) {
      if (isFunction(last)) {
        return function(x) {
          var m = last(x);
          if (!isSameType(Last, m)) {
            throw new TypeError("lastToAsync: Last returning function required for second argument");
          }
          return applyTransform(left, m);
        };
      }
      if (isSameType(Last, last)) {
        return applyTransform(left, last);
      }
      throw new TypeError("lastToAsync: Last or Last returning function required for second argument");
    }
    module.exports = curry(lastToAsync);
  }
});

// node_modules/crocks/Either/lastToEither.js
var require_lastToEither = __commonJS({
  "node_modules/crocks/Either/lastToEither.js"(exports, module) {
    var Either = require_Either();
    var Last = require_types().proxy("Last");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var applyTransform = function(left, last) {
      return last.valueOf().either(
        constant(Either.Left(left)),
        Either.Right
      );
    };
    function lastToEither(left, last) {
      if (isFunction(last)) {
        return function(x) {
          var m = last(x);
          if (!isSameType(Last, m)) {
            throw new TypeError("lastToEither: Last returning function required for second argument");
          }
          return applyTransform(left, m);
        };
      }
      if (isSameType(Last, last)) {
        return applyTransform(left, last);
      }
      throw new TypeError("lastToEither: Last or Last returning function required for second argument");
    }
    module.exports = curry(lastToEither);
  }
});

// node_modules/crocks/First/lastToFirst.js
var require_lastToFirst = __commonJS({
  "node_modules/crocks/First/lastToFirst.js"(exports, module) {
    var First = require_First();
    var Last = require_types().proxy("Last");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(last) {
      return First(last.valueOf());
    };
    function lastToFirst(last) {
      if (isFunction(last)) {
        return function(x) {
          var m = last(x);
          if (!isSameType(Last, m)) {
            throw new TypeError("lastToFirst: Last returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Last, last)) {
        return applyTransform(last);
      }
      throw new TypeError("lastToFirst: Last or Last returning function required");
    }
    module.exports = curry(lastToFirst);
  }
});

// node_modules/crocks/Maybe/lastToMaybe.js
var require_lastToMaybe = __commonJS({
  "node_modules/crocks/Maybe/lastToMaybe.js"(exports, module) {
    var Last = require_types().proxy("Last");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(last) {
      return last.valueOf();
    };
    function lastToMaybe(last) {
      if (isFunction(last)) {
        return function(x) {
          var m = last(x);
          if (!isSameType(Last, m)) {
            throw new TypeError("lastToMaybe: Last returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Last, last)) {
        return applyTransform(last);
      }
      throw new TypeError("lastToMaybe: Last or Last returning function required");
    }
    module.exports = curry(lastToMaybe);
  }
});

// node_modules/crocks/Result/lastToResult.js
var require_lastToResult = __commonJS({
  "node_modules/crocks/Result/lastToResult.js"(exports, module) {
    var Result = require_Result();
    var Last = require_types().proxy("Last");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var applyTransform = function(left, last) {
      return last.valueOf().either(
        constant(Result.Err(left)),
        Result.Ok
      );
    };
    function lastToResult(left, last) {
      if (isFunction(last)) {
        return function(x) {
          var m = last(x);
          if (!isSameType(Last, m)) {
            throw new TypeError("lastToResult: Last returning function required for second argument");
          }
          return applyTransform(left, m);
        };
      }
      if (isSameType(Last, last)) {
        return applyTransform(left, last);
      }
      throw new TypeError("lastToResult: Last or Last returning function required for second argument");
    }
    module.exports = curry(lastToResult);
  }
});

// node_modules/crocks/List/listToArray.js
var require_listToArray = __commonJS({
  "node_modules/crocks/List/listToArray.js"(exports, module) {
    var List = require_List2();
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    function listToArray(list) {
      if (isFunction(list)) {
        return function(x) {
          var m = list(x);
          if (!isSameType(List, m)) {
            throw new TypeError("listToArray: List returning function required");
          }
          return m.toArray();
        };
      }
      if (isSameType(List, list)) {
        return list.toArray();
      }
      throw new TypeError("listToArray: List or List returning function required");
    }
    module.exports = curry(listToArray);
  }
});

// node_modules/crocks/Maybe/maybeToArray.js
var require_maybeToArray = __commonJS({
  "node_modules/crocks/Maybe/maybeToArray.js"(exports, module) {
    var Maybe = require_Maybe2();
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(maybe) {
      return maybe.either(function() {
        return [];
      }, function(x) {
        return [x];
      });
    };
    var err = "maybeToArray: Argument must be a Maybe instanstace or a Maybe returning function";
    function maybeToArray(maybe) {
      if (isFunction(maybe)) {
        return function(x) {
          var m = maybe(x);
          if (!isSameType(Maybe, m)) {
            throw new TypeError(err);
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Maybe, maybe)) {
        return applyTransform(maybe);
      }
      throw new TypeError(err);
    }
    module.exports = curry(maybeToArray);
  }
});

// node_modules/crocks/Async/maybeToAsync.js
var require_maybeToAsync = __commonJS({
  "node_modules/crocks/Async/maybeToAsync.js"(exports, module) {
    var Async2 = require_Async();
    var Maybe = require_types().proxy("Maybe");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var applyTransform = function(left, maybe) {
      return maybe.either(
        constant(Async2.Rejected(left)),
        Async2.Resolved
      );
    };
    function maybeToAsync(left, maybe) {
      if (isFunction(maybe)) {
        return function(x) {
          var m = maybe(x);
          if (!isSameType(Maybe, m)) {
            throw new TypeError("maybeToAsync: Maybe returning function required for second argument");
          }
          return applyTransform(left, m);
        };
      }
      if (isSameType(Maybe, maybe)) {
        return applyTransform(left, maybe);
      }
      throw new TypeError("maybeToAsync: Maybe or Maybe returning function required for second argument");
    }
    module.exports = curry(maybeToAsync);
  }
});

// node_modules/crocks/Either/maybeToEither.js
var require_maybeToEither = __commonJS({
  "node_modules/crocks/Either/maybeToEither.js"(exports, module) {
    var Either = require_Either();
    var Maybe = require_types().proxy("Maybe");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var applyTransform = function(left, maybe) {
      return maybe.either(
        constant(Either.Left(left)),
        Either.Right
      );
    };
    function maybeToEither(left, maybe) {
      if (isFunction(maybe)) {
        return function(x) {
          var m = maybe(x);
          if (!isSameType(Maybe, m)) {
            throw new TypeError("maybeToEither: Maybe returning function required for second argument");
          }
          return applyTransform(left, m);
        };
      }
      if (isSameType(Maybe, maybe)) {
        return applyTransform(left, maybe);
      }
      throw new TypeError("maybeToEither: Maybe or Maybe returning function required for second argument");
    }
    module.exports = curry(maybeToEither);
  }
});

// node_modules/crocks/First/maybeToFirst.js
var require_maybeToFirst = __commonJS({
  "node_modules/crocks/First/maybeToFirst.js"(exports, module) {
    var First = require_First();
    var Maybe = require_types().proxy("Maybe");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(maybe) {
      return First(maybe);
    };
    function maybeToFirst(maybe) {
      if (isFunction(maybe)) {
        return function(x) {
          var m = maybe(x);
          if (!isSameType(Maybe, m)) {
            throw new TypeError("maybeToFirst: Maybe returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Maybe, maybe)) {
        return applyTransform(maybe);
      }
      throw new TypeError("maybeToFirst: Maybe or Maybe returning function required");
    }
    module.exports = curry(maybeToFirst);
  }
});

// node_modules/crocks/Last/maybeToLast.js
var require_maybeToLast = __commonJS({
  "node_modules/crocks/Last/maybeToLast.js"(exports, module) {
    var Last = require_Last();
    var Maybe = require_types().proxy("Maybe");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(maybe) {
      return Last(maybe);
    };
    function maybeToLast(maybe) {
      if (isFunction(maybe)) {
        return function(x) {
          var m = maybe(x);
          if (!isSameType(Maybe, m)) {
            throw new TypeError("maybeToLast: Maybe returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Maybe, maybe)) {
        return applyTransform(maybe);
      }
      throw new TypeError("maybeToLast: Maybe or Maybe returning function required");
    }
    module.exports = curry(maybeToLast);
  }
});

// node_modules/crocks/List/maybeToList.js
var require_maybeToList = __commonJS({
  "node_modules/crocks/List/maybeToList.js"(exports, module) {
    var List = require_List2();
    var Maybe = require_types().proxy("Maybe");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(maybe) {
      return maybe.either(
        List.empty,
        List.of
      );
    };
    var err = "maybeToList: Argument must be a Maybe instanstace or a Maybe returning function";
    function maybeToList(maybe) {
      if (isFunction(maybe)) {
        return function(x) {
          var m = maybe(x);
          if (!isSameType(Maybe, m)) {
            throw new TypeError(err);
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Maybe, maybe)) {
        return applyTransform(maybe);
      }
      throw new TypeError(err);
    }
    module.exports = curry(maybeToList);
  }
});

// node_modules/crocks/Result/maybeToResult.js
var require_maybeToResult = __commonJS({
  "node_modules/crocks/Result/maybeToResult.js"(exports, module) {
    var Result = require_Result();
    var Maybe = require_types().proxy("Maybe");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var constant = function(x) {
      return function() {
        return x;
      };
    };
    var applyTransform = function(left, maybe) {
      return maybe.either(
        constant(Result.Err(left)),
        Result.Ok
      );
    };
    function maybeToResult(left, maybe) {
      if (isFunction(maybe)) {
        return function(x) {
          var m = maybe(x);
          if (!isSameType(Maybe, m)) {
            throw new TypeError("maybeToResult: Maybe returning function required for second argument");
          }
          return applyTransform(left, m);
        };
      }
      if (isSameType(Maybe, maybe)) {
        return applyTransform(left, maybe);
      }
      throw new TypeError("maybeToResult: Maybe or Maybe returning function required for second argument");
    }
    module.exports = curry(maybeToResult);
  }
});

// node_modules/crocks/Async/resultToAsync.js
var require_resultToAsync = __commonJS({
  "node_modules/crocks/Async/resultToAsync.js"(exports, module) {
    var Async2 = require_Async();
    var Result = require_types().proxy("Result");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(either) {
      return either.either(Async2.Rejected, Async2.Resolved);
    };
    function resultToAsync(result) {
      if (isFunction(result)) {
        return function(x) {
          var m = result(x);
          if (!isSameType(Result, m)) {
            throw new TypeError("resultToAsync: Result returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Result, result)) {
        return applyTransform(result);
      }
      throw new TypeError("resultToAsync: Result or Result returning function required");
    }
    module.exports = curry(resultToAsync);
  }
});

// node_modules/crocks/Either/resultToEither.js
var require_resultToEither = __commonJS({
  "node_modules/crocks/Either/resultToEither.js"(exports, module) {
    var Either = require_Either();
    var Result = require_types().proxy("Result");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(result) {
      return result.either(Either.Left, Either.Right);
    };
    function resultToEither(result) {
      if (isFunction(result)) {
        return function(x) {
          var m = result(x);
          if (!isSameType(Result, m)) {
            throw new TypeError("resultToEither: Result returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Result, result)) {
        return applyTransform(result);
      }
      throw new TypeError("resultToEither: Result or Result returning function required");
    }
    module.exports = curry(resultToEither);
  }
});

// node_modules/crocks/First/resultToFirst.js
var require_resultToFirst = __commonJS({
  "node_modules/crocks/First/resultToFirst.js"(exports, module) {
    var First = require_First();
    var Result = require_types().proxy("Result");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(result) {
      return result.either(First.empty, First);
    };
    function resultToFirst(result) {
      if (isFunction(result)) {
        return function(x) {
          var m = result(x);
          if (!isSameType(Result, m)) {
            throw new TypeError("resultToFirst: Result returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Result, result)) {
        return applyTransform(result);
      }
      throw new TypeError("resultToFirst: Result or Result returning function required");
    }
    module.exports = curry(resultToFirst);
  }
});

// node_modules/crocks/Last/resultToLast.js
var require_resultToLast = __commonJS({
  "node_modules/crocks/Last/resultToLast.js"(exports, module) {
    var Last = require_Last();
    var Result = require_types().proxy("Result");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(result) {
      return result.either(Last.empty, Last);
    };
    function resultToLast(result) {
      if (isFunction(result)) {
        return function(x) {
          var m = result(x);
          if (!isSameType(Result, m)) {
            throw new TypeError("resultToLast: Result returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Result, result)) {
        return applyTransform(result);
      }
      throw new TypeError("resultToLast: Result or Result returning function required");
    }
    module.exports = curry(resultToLast);
  }
});

// node_modules/crocks/Maybe/resultToMaybe.js
var require_resultToMaybe = __commonJS({
  "node_modules/crocks/Maybe/resultToMaybe.js"(exports, module) {
    var Maybe = require_Maybe2();
    var Result = require_types().proxy("Result");
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isSameType = require_isSameType();
    var applyTransform = function(result) {
      return result.either(Maybe.Nothing, Maybe.Just);
    };
    function resultToMaybe(result) {
      if (isFunction(result)) {
        return function(x) {
          var m = result(x);
          if (!isSameType(Result, m)) {
            throw new TypeError("resultToMaybe: Result returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isSameType(Result, result)) {
        return applyTransform(result);
      }
      throw new TypeError("resultToMaybe: Result or Result returning function required");
    }
    module.exports = curry(resultToMaybe);
  }
});

// node_modules/crocks/Tuple/tupleToArray.js
var require_tupleToArray = __commonJS({
  "node_modules/crocks/Tuple/tupleToArray.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    function tupleToArray(tuple) {
      if (isFunction(tuple)) {
        return function(x) {
          var m = tuple(x);
          if (!isFunction(m.tupleLength)) {
            throw new TypeError("tupleToArray: Tuple returning function required");
          }
          return m.toArray();
        };
      }
      if (isFunction(tuple.tupleLength)) {
        return tuple.toArray();
      }
      throw new TypeError("tupleToArray: Tuple or Tuple returning function required");
    }
    module.exports = curry(tupleToArray);
  }
});

// node_modules/crocks/Pair/writerToPair.js
var require_writerToPair = __commonJS({
  "node_modules/crocks/Pair/writerToPair.js"(exports, module) {
    var curry = require_curry();
    var isFunction = require_isFunction();
    var isWriter = function(x) {
      return !!x && isFunction(x.read);
    };
    var applyTransform = function(w) {
      return w.read();
    };
    function writerToPair(writer) {
      if (isFunction(writer)) {
        return function(x) {
          var m = writer(x);
          if (!isWriter(m)) {
            throw new TypeError("writerToPair: Writer returning function required");
          }
          return applyTransform(m);
        };
      }
      if (isWriter(writer)) {
        return applyTransform(writer);
      }
      throw new TypeError("writerToPair: Writer or Writer returning function required");
    }
    module.exports = curry(writerToPair);
  }
});

// node_modules/crocks/index.js
var require_crocks = __commonJS({
  "node_modules/crocks/index.js"(exports, module) {
    var combinators = require_combinators();
    var logic = require_logic();
    var predicates = require_predicates();
    var crocks2 = {
      Arrow: require_Arrow(),
      Async: require_Async(),
      Const: require_Const(),
      Either: require_Either(),
      Equiv: require_Equiv(),
      Identity: require_Identity(),
      IO: require_IO(),
      List: require_List2(),
      Maybe: require_Maybe2(),
      Pair: require_Pair2(),
      Pred: require_Pred2(),
      Reader: require_Reader(),
      ReaderT: require_ReaderT(),
      Result: require_Result(),
      Star: require_Star(),
      State: require_State(),
      Tuple: require_Tuple(),
      Unit: require_Unit2(),
      Writer: require_Writer()
    };
    var helpers = Object.assign(
      {},
      require_helpers(),
      {
        branch: require_branch(),
        fanout: require_fanout(),
        find: require_find(),
        getPath: require_getPath(),
        getProp: require_getProp(),
        prop: require_prop(),
        propPath: require_propPath(),
        safe: require_safe(),
        safeAfter: require_safeAfter(),
        safeLift: require_safeLift(),
        toPairs: require_toPairs(),
        tryCatch: require_tryCatch()
      }
    );
    var monoids = {
      All: require_All(),
      Any: require_Any(),
      Assign: require_Assign(),
      Endo: require_Endo(),
      First: require_First(),
      Last: require_Last(),
      Max: require_Max(),
      Min: require_Min(),
      Prod: require_Prod(),
      Sum: require_Sum()
    };
    var pointfree = Object.assign(
      {},
      require_pointfree(),
      {
        evalWith: require_evalWith(),
        execWith: require_execWith(),
        fst: require_fst(),
        log: require_log(),
        nmap: require_nmap(),
        project: require_project(),
        race: require_race(),
        read: require_read(),
        snd: require_snd()
      }
    );
    var transforms = {
      arrayToList: require_arrayToList(),
      asyncToPromise: require_asyncToPromise(),
      eitherToAsync: require_eitherToAsync(),
      eitherToFirst: require_eitherToFirst(),
      eitherToLast: require_eitherToLast(),
      eitherToMaybe: require_eitherToMaybe(),
      eitherToResult: require_eitherToResult(),
      firstToAsync: require_firstToAsync(),
      firstToEither: require_firstToEither(),
      firstToLast: require_firstToLast(),
      firstToMaybe: require_firstToMaybe(),
      firstToResult: require_firstToResult(),
      lastToAsync: require_lastToAsync(),
      lastToEither: require_lastToEither(),
      lastToFirst: require_lastToFirst(),
      lastToMaybe: require_lastToMaybe(),
      lastToResult: require_lastToResult(),
      listToArray: require_listToArray(),
      maybeToArray: require_maybeToArray(),
      maybeToAsync: require_maybeToAsync(),
      maybeToEither: require_maybeToEither(),
      maybeToFirst: require_maybeToFirst(),
      maybeToLast: require_maybeToLast(),
      maybeToList: require_maybeToList(),
      maybeToResult: require_maybeToResult(),
      resultToAsync: require_resultToAsync(),
      resultToEither: require_resultToEither(),
      resultToFirst: require_resultToFirst(),
      resultToLast: require_resultToLast(),
      resultToMaybe: require_resultToMaybe(),
      tupleToArray: require_tupleToArray(),
      writerToPair: require_writerToPair()
    };
    module.exports = Object.assign(
      {},
      combinators,
      crocks2,
      helpers,
      logic,
      monoids,
      pointfree,
      predicates,
      transforms
    );
  }
});

// node_modules/bignumber.js/bignumber.js
var require_bignumber = __commonJS({
  "node_modules/bignumber.js/bignumber.js"(exports, module) {
    (function(globalObject) {
      "use strict";
      var BigNumber, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
      function clone(configObject) {
        var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: "\xA0",
          suffix: ""
        }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
        function BigNumber2(v, b) {
          var alphabet, c, caseChanged, e, i, isNum, len, str, x = this;
          if (!(x instanceof BigNumber2))
            return new BigNumber2(v, b);
          if (b == null) {
            if (v && v._isBigNumber === true) {
              x.s = v.s;
              if (!v.c || v.e > MAX_EXP) {
                x.c = x.e = null;
              } else if (v.e < MIN_EXP) {
                x.c = [x.e = 0];
              } else {
                x.e = v.e;
                x.c = v.c.slice();
              }
              return;
            }
            if ((isNum = typeof v == "number") && v * 0 == 0) {
              x.s = 1 / v < 0 ? (v = -v, -1) : 1;
              if (v === ~~v) {
                for (e = 0, i = v; i >= 10; i /= 10, e++)
                  ;
                if (e > MAX_EXP) {
                  x.c = x.e = null;
                } else {
                  x.e = e;
                  x.c = [v];
                }
                return;
              }
              str = String(v);
            } else {
              if (!isNumeric.test(str = String(v)))
                return parseNumeric(x, str, isNum);
              x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
            }
            if ((e = str.indexOf(".")) > -1)
              str = str.replace(".", "");
            if ((i = str.search(/e/i)) > 0) {
              if (e < 0)
                e = i;
              e += +str.slice(i + 1);
              str = str.substring(0, i);
            } else if (e < 0) {
              e = str.length;
            }
          } else {
            intCheck(b, 2, ALPHABET.length, "Base");
            if (b == 10 && alphabetHasNormalDecimalDigits) {
              x = new BigNumber2(v);
              return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
            }
            str = String(v);
            if (isNum = typeof v == "number") {
              if (v * 0 != 0)
                return parseNumeric(x, str, isNum, b);
              x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
              if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
                throw Error(tooManyDigits + v);
              }
            } else {
              x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
            }
            alphabet = ALPHABET.slice(0, b);
            e = i = 0;
            for (len = str.length; i < len; i++) {
              if (alphabet.indexOf(c = str.charAt(i)) < 0) {
                if (c == ".") {
                  if (i > e) {
                    e = len;
                    continue;
                  }
                } else if (!caseChanged) {
                  if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                    caseChanged = true;
                    i = -1;
                    e = 0;
                    continue;
                  }
                }
                return parseNumeric(x, String(v), isNum, b);
              }
            }
            isNum = false;
            str = convertBase(str, b, 10, x.s);
            if ((e = str.indexOf(".")) > -1)
              str = str.replace(".", "");
            else
              e = str.length;
          }
          for (i = 0; str.charCodeAt(i) === 48; i++)
            ;
          for (len = str.length; str.charCodeAt(--len) === 48; )
            ;
          if (str = str.slice(i, ++len)) {
            len -= i;
            if (isNum && BigNumber2.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
              throw Error(tooManyDigits + x.s * v);
            }
            if ((e = e - i - 1) > MAX_EXP) {
              x.c = x.e = null;
            } else if (e < MIN_EXP) {
              x.c = [x.e = 0];
            } else {
              x.e = e;
              x.c = [];
              i = (e + 1) % LOG_BASE;
              if (e < 0)
                i += LOG_BASE;
              if (i < len) {
                if (i)
                  x.c.push(+str.slice(0, i));
                for (len -= LOG_BASE; i < len; ) {
                  x.c.push(+str.slice(i, i += LOG_BASE));
                }
                i = LOG_BASE - (str = str.slice(i)).length;
              } else {
                i -= len;
              }
              for (; i--; str += "0")
                ;
              x.c.push(+str);
            }
          } else {
            x.c = [x.e = 0];
          }
        }
        BigNumber2.clone = clone;
        BigNumber2.ROUND_UP = 0;
        BigNumber2.ROUND_DOWN = 1;
        BigNumber2.ROUND_CEIL = 2;
        BigNumber2.ROUND_FLOOR = 3;
        BigNumber2.ROUND_HALF_UP = 4;
        BigNumber2.ROUND_HALF_DOWN = 5;
        BigNumber2.ROUND_HALF_EVEN = 6;
        BigNumber2.ROUND_HALF_CEIL = 7;
        BigNumber2.ROUND_HALF_FLOOR = 8;
        BigNumber2.EUCLID = 9;
        BigNumber2.config = BigNumber2.set = function(obj) {
          var p, v;
          if (obj != null) {
            if (typeof obj == "object") {
              if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
                v = obj[p];
                intCheck(v, 0, MAX, p);
                DECIMAL_PLACES = v;
              }
              if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
                v = obj[p];
                intCheck(v, 0, 8, p);
                ROUNDING_MODE = v;
              }
              if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
                v = obj[p];
                if (v && v.pop) {
                  intCheck(v[0], -MAX, 0, p);
                  intCheck(v[1], 0, MAX, p);
                  TO_EXP_NEG = v[0];
                  TO_EXP_POS = v[1];
                } else {
                  intCheck(v, -MAX, MAX, p);
                  TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
                }
              }
              if (obj.hasOwnProperty(p = "RANGE")) {
                v = obj[p];
                if (v && v.pop) {
                  intCheck(v[0], -MAX, -1, p);
                  intCheck(v[1], 1, MAX, p);
                  MIN_EXP = v[0];
                  MAX_EXP = v[1];
                } else {
                  intCheck(v, -MAX, MAX, p);
                  if (v) {
                    MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
                  } else {
                    throw Error(bignumberError + p + " cannot be zero: " + v);
                  }
                }
              }
              if (obj.hasOwnProperty(p = "CRYPTO")) {
                v = obj[p];
                if (v === !!v) {
                  if (v) {
                    if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                      CRYPTO = v;
                    } else {
                      CRYPTO = !v;
                      throw Error(bignumberError + "crypto unavailable");
                    }
                  } else {
                    CRYPTO = v;
                  }
                } else {
                  throw Error(bignumberError + p + " not true or false: " + v);
                }
              }
              if (obj.hasOwnProperty(p = "MODULO_MODE")) {
                v = obj[p];
                intCheck(v, 0, 9, p);
                MODULO_MODE = v;
              }
              if (obj.hasOwnProperty(p = "POW_PRECISION")) {
                v = obj[p];
                intCheck(v, 0, MAX, p);
                POW_PRECISION = v;
              }
              if (obj.hasOwnProperty(p = "FORMAT")) {
                v = obj[p];
                if (typeof v == "object")
                  FORMAT = v;
                else
                  throw Error(bignumberError + p + " not an object: " + v);
              }
              if (obj.hasOwnProperty(p = "ALPHABET")) {
                v = obj[p];
                if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
                  alphabetHasNormalDecimalDigits = v.slice(0, 10) == "0123456789";
                  ALPHABET = v;
                } else {
                  throw Error(bignumberError + p + " invalid: " + v);
                }
              }
            } else {
              throw Error(bignumberError + "Object expected: " + obj);
            }
          }
          return {
            DECIMAL_PLACES,
            ROUNDING_MODE,
            EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
            RANGE: [MIN_EXP, MAX_EXP],
            CRYPTO,
            MODULO_MODE,
            POW_PRECISION,
            FORMAT,
            ALPHABET
          };
        };
        BigNumber2.isBigNumber = function(v) {
          if (!v || v._isBigNumber !== true)
            return false;
          if (!BigNumber2.DEBUG)
            return true;
          var i, n, c = v.c, e = v.e, s = v.s;
          out:
            if ({}.toString.call(c) == "[object Array]") {
              if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
                if (c[0] === 0) {
                  if (e === 0 && c.length === 1)
                    return true;
                  break out;
                }
                i = (e + 1) % LOG_BASE;
                if (i < 1)
                  i += LOG_BASE;
                if (String(c[0]).length == i) {
                  for (i = 0; i < c.length; i++) {
                    n = c[i];
                    if (n < 0 || n >= BASE || n !== mathfloor(n))
                      break out;
                  }
                  if (n !== 0)
                    return true;
                }
              }
            } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
              return true;
            }
          throw Error(bignumberError + "Invalid BigNumber: " + v);
        };
        BigNumber2.maximum = BigNumber2.max = function() {
          return maxOrMin(arguments, P.lt);
        };
        BigNumber2.minimum = BigNumber2.min = function() {
          return maxOrMin(arguments, P.gt);
        };
        BigNumber2.random = function() {
          var pow2_53 = 9007199254740992;
          var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
            return mathfloor(Math.random() * pow2_53);
          } : function() {
            return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
          };
          return function(dp) {
            var a, b, e, k, v, i = 0, c = [], rand = new BigNumber2(ONE);
            if (dp == null)
              dp = DECIMAL_PLACES;
            else
              intCheck(dp, 0, MAX);
            k = mathceil(dp / LOG_BASE);
            if (CRYPTO) {
              if (crypto.getRandomValues) {
                a = crypto.getRandomValues(new Uint32Array(k *= 2));
                for (; i < k; ) {
                  v = a[i] * 131072 + (a[i + 1] >>> 11);
                  if (v >= 9e15) {
                    b = crypto.getRandomValues(new Uint32Array(2));
                    a[i] = b[0];
                    a[i + 1] = b[1];
                  } else {
                    c.push(v % 1e14);
                    i += 2;
                  }
                }
                i = k / 2;
              } else if (crypto.randomBytes) {
                a = crypto.randomBytes(k *= 7);
                for (; i < k; ) {
                  v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
                  if (v >= 9e15) {
                    crypto.randomBytes(7).copy(a, i);
                  } else {
                    c.push(v % 1e14);
                    i += 7;
                  }
                }
                i = k / 7;
              } else {
                CRYPTO = false;
                throw Error(bignumberError + "crypto unavailable");
              }
            }
            if (!CRYPTO) {
              for (; i < k; ) {
                v = random53bitInt();
                if (v < 9e15)
                  c[i++] = v % 1e14;
              }
            }
            k = c[--i];
            dp %= LOG_BASE;
            if (k && dp) {
              v = POWS_TEN[LOG_BASE - dp];
              c[i] = mathfloor(k / v) * v;
            }
            for (; c[i] === 0; c.pop(), i--)
              ;
            if (i < 0) {
              c = [e = 0];
            } else {
              for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE)
                ;
              for (i = 1, v = c[0]; v >= 10; v /= 10, i++)
                ;
              if (i < LOG_BASE)
                e -= LOG_BASE - i;
            }
            rand.e = e;
            rand.c = c;
            return rand;
          };
        }();
        BigNumber2.sum = function() {
          var i = 1, args = arguments, sum = new BigNumber2(args[0]);
          for (; i < args.length; )
            sum = sum.plus(args[i++]);
          return sum;
        };
        convertBase = function() {
          var decimal = "0123456789";
          function toBaseOut(str, baseIn, baseOut, alphabet) {
            var j, arr = [0], arrL, i = 0, len = str.length;
            for (; i < len; ) {
              for (arrL = arr.length; arrL--; arr[arrL] *= baseIn)
                ;
              arr[0] += alphabet.indexOf(str.charAt(i++));
              for (j = 0; j < arr.length; j++) {
                if (arr[j] > baseOut - 1) {
                  if (arr[j + 1] == null)
                    arr[j + 1] = 0;
                  arr[j + 1] += arr[j] / baseOut | 0;
                  arr[j] %= baseOut;
                }
              }
            }
            return arr.reverse();
          }
          return function(str, baseIn, baseOut, sign, callerIsToString) {
            var alphabet, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
            if (i >= 0) {
              k = POW_PRECISION;
              POW_PRECISION = 0;
              str = str.replace(".", "");
              y = new BigNumber2(baseIn);
              x = y.pow(str.length - i);
              POW_PRECISION = k;
              y.c = toBaseOut(
                toFixedPoint(coeffToString(x.c), x.e, "0"),
                10,
                baseOut,
                decimal
              );
              y.e = y.c.length;
            }
            xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
            e = k = xc.length;
            for (; xc[--k] == 0; xc.pop())
              ;
            if (!xc[0])
              return alphabet.charAt(0);
            if (i < 0) {
              --e;
            } else {
              x.c = xc;
              x.e = e;
              x.s = sign;
              x = div(x, y, dp, rm, baseOut);
              xc = x.c;
              r = x.r;
              e = x.e;
            }
            d = e + dp + 1;
            i = xc[d];
            k = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;
            r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
            if (d < 1 || !xc[0]) {
              str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
            } else {
              xc.length = d;
              if (r) {
                for (--baseOut; ++xc[--d] > baseOut; ) {
                  xc[d] = 0;
                  if (!d) {
                    ++e;
                    xc = [1].concat(xc);
                  }
                }
              }
              for (k = xc.length; !xc[--k]; )
                ;
              for (i = 0, str = ""; i <= k; str += alphabet.charAt(xc[i++]))
                ;
              str = toFixedPoint(str, e, alphabet.charAt(0));
            }
            return str;
          };
        }();
        div = function() {
          function multiply(x, k, base) {
            var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
            for (x = x.slice(); i--; ) {
              xlo = x[i] % SQRT_BASE;
              xhi = x[i] / SQRT_BASE | 0;
              m = khi * xlo + xhi * klo;
              temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
              carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
              x[i] = temp % base;
            }
            if (carry)
              x = [carry].concat(x);
            return x;
          }
          function compare2(a, b, aL, bL) {
            var i, cmp;
            if (aL != bL) {
              cmp = aL > bL ? 1 : -1;
            } else {
              for (i = cmp = 0; i < aL; i++) {
                if (a[i] != b[i]) {
                  cmp = a[i] > b[i] ? 1 : -1;
                  break;
                }
              }
            }
            return cmp;
          }
          function subtract(a, b, aL, base) {
            var i = 0;
            for (; aL--; ) {
              a[aL] -= i;
              i = a[aL] < b[aL] ? 1 : 0;
              a[aL] = i * base + a[aL] - b[aL];
            }
            for (; !a[0] && a.length > 1; a.splice(0, 1))
              ;
          }
          return function(x, y, dp, rm, base) {
            var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
            if (!xc || !xc[0] || !yc || !yc[0]) {
              return new BigNumber2(
                !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : xc && xc[0] == 0 || !yc ? s * 0 : s / 0
              );
            }
            q = new BigNumber2(s);
            qc = q.c = [];
            e = x.e - y.e;
            s = dp + e + 1;
            if (!base) {
              base = BASE;
              e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
              s = s / LOG_BASE | 0;
            }
            for (i = 0; yc[i] == (xc[i] || 0); i++)
              ;
            if (yc[i] > (xc[i] || 0))
              e--;
            if (s < 0) {
              qc.push(1);
              more = true;
            } else {
              xL = xc.length;
              yL = yc.length;
              i = 0;
              s += 2;
              n = mathfloor(base / (yc[0] + 1));
              if (n > 1) {
                yc = multiply(yc, n, base);
                xc = multiply(xc, n, base);
                yL = yc.length;
                xL = xc.length;
              }
              xi = yL;
              rem = xc.slice(0, yL);
              remL = rem.length;
              for (; remL < yL; rem[remL++] = 0)
                ;
              yz = yc.slice();
              yz = [0].concat(yz);
              yc0 = yc[0];
              if (yc[1] >= base / 2)
                yc0++;
              do {
                n = 0;
                cmp = compare2(yc, rem, yL, remL);
                if (cmp < 0) {
                  rem0 = rem[0];
                  if (yL != remL)
                    rem0 = rem0 * base + (rem[1] || 0);
                  n = mathfloor(rem0 / yc0);
                  if (n > 1) {
                    if (n >= base)
                      n = base - 1;
                    prod = multiply(yc, n, base);
                    prodL = prod.length;
                    remL = rem.length;
                    while (compare2(prod, rem, prodL, remL) == 1) {
                      n--;
                      subtract(prod, yL < prodL ? yz : yc, prodL, base);
                      prodL = prod.length;
                      cmp = 1;
                    }
                  } else {
                    if (n == 0) {
                      cmp = n = 1;
                    }
                    prod = yc.slice();
                    prodL = prod.length;
                  }
                  if (prodL < remL)
                    prod = [0].concat(prod);
                  subtract(rem, prod, remL, base);
                  remL = rem.length;
                  if (cmp == -1) {
                    while (compare2(yc, rem, yL, remL) < 1) {
                      n++;
                      subtract(rem, yL < remL ? yz : yc, remL, base);
                      remL = rem.length;
                    }
                  }
                } else if (cmp === 0) {
                  n++;
                  rem = [0];
                }
                qc[i++] = n;
                if (rem[0]) {
                  rem[remL++] = xc[xi] || 0;
                } else {
                  rem = [xc[xi]];
                  remL = 1;
                }
              } while ((xi++ < xL || rem[0] != null) && s--);
              more = rem[0] != null;
              if (!qc[0])
                qc.splice(0, 1);
            }
            if (base == BASE) {
              for (i = 1, s = qc[0]; s >= 10; s /= 10, i++)
                ;
              round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
            } else {
              q.e = e;
              q.r = +more;
            }
            return q;
          };
        }();
        function format(n, i, rm, id) {
          var c0, e, ne, len, str;
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          if (!n.c)
            return n.toString();
          c0 = n.c[0];
          ne = n.e;
          if (i == null) {
            str = coeffToString(n.c);
            str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
          } else {
            n = round(new BigNumber2(n), i, rm);
            e = n.e;
            str = coeffToString(n.c);
            len = str.length;
            if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
              for (; len < i; str += "0", len++)
                ;
              str = toExponential(str, e);
            } else {
              i -= ne;
              str = toFixedPoint(str, e, "0");
              if (e + 1 > len) {
                if (--i > 0)
                  for (str += "."; i--; str += "0")
                    ;
              } else {
                i += e - len;
                if (i > 0) {
                  if (e + 1 == len)
                    str += ".";
                  for (; i--; str += "0")
                    ;
                }
              }
            }
          }
          return n.s < 0 && c0 ? "-" + str : str;
        }
        function maxOrMin(args, method) {
          var n, i = 1, m = new BigNumber2(args[0]);
          for (; i < args.length; i++) {
            n = new BigNumber2(args[i]);
            if (!n.s) {
              m = n;
              break;
            } else if (method.call(m, n)) {
              m = n;
            }
          }
          return m;
        }
        function normalise(n, c, e) {
          var i = 1, j = c.length;
          for (; !c[--j]; c.pop())
            ;
          for (j = c[0]; j >= 10; j /= 10, i++)
            ;
          if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
            n.c = n.e = null;
          } else if (e < MIN_EXP) {
            n.c = [n.e = 0];
          } else {
            n.e = e;
            n.c = c;
          }
          return n;
        }
        parseNumeric = function() {
          var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
          return function(x, str, isNum, b) {
            var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
            if (isInfinityOrNaN.test(s)) {
              x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
            } else {
              if (!isNum) {
                s = s.replace(basePrefix, function(m, p1, p2) {
                  base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
                  return !b || b == base ? p1 : m;
                });
                if (b) {
                  base = b;
                  s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
                }
                if (str != s)
                  return new BigNumber2(s, base);
              }
              if (BigNumber2.DEBUG) {
                throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
              }
              x.s = null;
            }
            x.c = x.e = null;
          };
        }();
        function round(x, sd, rm, r) {
          var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
          if (xc) {
            out: {
              for (d = 1, k = xc[0]; k >= 10; k /= 10, d++)
                ;
              i = sd - d;
              if (i < 0) {
                i += LOG_BASE;
                j = sd;
                n = xc[ni = 0];
                rd = n / pows10[d - j - 1] % 10 | 0;
              } else {
                ni = mathceil((i + 1) / LOG_BASE);
                if (ni >= xc.length) {
                  if (r) {
                    for (; xc.length <= ni; xc.push(0))
                      ;
                    n = rd = 0;
                    d = 1;
                    i %= LOG_BASE;
                    j = i - LOG_BASE + 1;
                  } else {
                    break out;
                  }
                } else {
                  n = k = xc[ni];
                  for (d = 1; k >= 10; k /= 10, d++)
                    ;
                  i %= LOG_BASE;
                  j = i - LOG_BASE + d;
                  rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
                }
              }
              r = r || sd < 0 || xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
              r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
              if (sd < 1 || !xc[0]) {
                xc.length = 0;
                if (r) {
                  sd -= x.e + 1;
                  xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                  x.e = -sd || 0;
                } else {
                  xc[0] = x.e = 0;
                }
                return x;
              }
              if (i == 0) {
                xc.length = ni;
                k = 1;
                ni--;
              } else {
                xc.length = ni + 1;
                k = pows10[LOG_BASE - i];
                xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
              }
              if (r) {
                for (; ; ) {
                  if (ni == 0) {
                    for (i = 1, j = xc[0]; j >= 10; j /= 10, i++)
                      ;
                    j = xc[0] += k;
                    for (k = 1; j >= 10; j /= 10, k++)
                      ;
                    if (i != k) {
                      x.e++;
                      if (xc[0] == BASE)
                        xc[0] = 1;
                    }
                    break;
                  } else {
                    xc[ni] += k;
                    if (xc[ni] != BASE)
                      break;
                    xc[ni--] = 0;
                    k = 1;
                  }
                }
              }
              for (i = xc.length; xc[--i] === 0; xc.pop())
                ;
            }
            if (x.e > MAX_EXP) {
              x.c = x.e = null;
            } else if (x.e < MIN_EXP) {
              x.c = [x.e = 0];
            }
          }
          return x;
        }
        function valueOf(n) {
          var str, e = n.e;
          if (e === null)
            return n.toString();
          str = coeffToString(n.c);
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
          return n.s < 0 ? "-" + str : str;
        }
        P.absoluteValue = P.abs = function() {
          var x = new BigNumber2(this);
          if (x.s < 0)
            x.s = 1;
          return x;
        };
        P.comparedTo = function(y, b) {
          return compare(this, new BigNumber2(y, b));
        };
        P.decimalPlaces = P.dp = function(dp, rm) {
          var c, n, v, x = this;
          if (dp != null) {
            intCheck(dp, 0, MAX);
            if (rm == null)
              rm = ROUNDING_MODE;
            else
              intCheck(rm, 0, 8);
            return round(new BigNumber2(x), dp + x.e + 1, rm);
          }
          if (!(c = x.c))
            return null;
          n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
          if (v = c[v])
            for (; v % 10 == 0; v /= 10, n--)
              ;
          if (n < 0)
            n = 0;
          return n;
        };
        P.dividedBy = P.div = function(y, b) {
          return div(this, new BigNumber2(y, b), DECIMAL_PLACES, ROUNDING_MODE);
        };
        P.dividedToIntegerBy = P.idiv = function(y, b) {
          return div(this, new BigNumber2(y, b), 0, 1);
        };
        P.exponentiatedBy = P.pow = function(n, m) {
          var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
          n = new BigNumber2(n);
          if (n.c && !n.isInteger()) {
            throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
          }
          if (m != null)
            m = new BigNumber2(m);
          nIsBig = n.e > 14;
          if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
            y = new BigNumber2(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
            return m ? y.mod(m) : y;
          }
          nIsNeg = n.s < 0;
          if (m) {
            if (m.c ? !m.c[0] : !m.s)
              return new BigNumber2(NaN);
            isModExp = !nIsNeg && x.isInteger() && m.isInteger();
            if (isModExp)
              x = x.mod(m);
          } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
            k = x.s < 0 && isOdd(n) ? -0 : 0;
            if (x.e > -1)
              k = 1 / k;
            return new BigNumber2(nIsNeg ? 1 / k : k);
          } else if (POW_PRECISION) {
            k = mathceil(POW_PRECISION / LOG_BASE + 2);
          }
          if (nIsBig) {
            half = new BigNumber2(0.5);
            if (nIsNeg)
              n.s = 1;
            nIsOdd = isOdd(n);
          } else {
            i = Math.abs(+valueOf(n));
            nIsOdd = i % 2;
          }
          y = new BigNumber2(ONE);
          for (; ; ) {
            if (nIsOdd) {
              y = y.times(x);
              if (!y.c)
                break;
              if (k) {
                if (y.c.length > k)
                  y.c.length = k;
              } else if (isModExp) {
                y = y.mod(m);
              }
            }
            if (i) {
              i = mathfloor(i / 2);
              if (i === 0)
                break;
              nIsOdd = i % 2;
            } else {
              n = n.times(half);
              round(n, n.e + 1, 1);
              if (n.e > 14) {
                nIsOdd = isOdd(n);
              } else {
                i = +valueOf(n);
                if (i === 0)
                  break;
                nIsOdd = i % 2;
              }
            }
            x = x.times(x);
            if (k) {
              if (x.c && x.c.length > k)
                x.c.length = k;
            } else if (isModExp) {
              x = x.mod(m);
            }
          }
          if (isModExp)
            return y;
          if (nIsNeg)
            y = ONE.div(y);
          return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
        };
        P.integerValue = function(rm) {
          var n = new BigNumber2(this);
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          return round(n, n.e + 1, rm);
        };
        P.isEqualTo = P.eq = function(y, b) {
          return compare(this, new BigNumber2(y, b)) === 0;
        };
        P.isFinite = function() {
          return !!this.c;
        };
        P.isGreaterThan = P.gt = function(y, b) {
          return compare(this, new BigNumber2(y, b)) > 0;
        };
        P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
          return (b = compare(this, new BigNumber2(y, b))) === 1 || b === 0;
        };
        P.isInteger = function() {
          return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
        };
        P.isLessThan = P.lt = function(y, b) {
          return compare(this, new BigNumber2(y, b)) < 0;
        };
        P.isLessThanOrEqualTo = P.lte = function(y, b) {
          return (b = compare(this, new BigNumber2(y, b))) === -1 || b === 0;
        };
        P.isNaN = function() {
          return !this.s;
        };
        P.isNegative = function() {
          return this.s < 0;
        };
        P.isPositive = function() {
          return this.s > 0;
        };
        P.isZero = function() {
          return !!this.c && this.c[0] == 0;
        };
        P.minus = function(y, b) {
          var i, j, t, xLTy, x = this, a = x.s;
          y = new BigNumber2(y, b);
          b = y.s;
          if (!a || !b)
            return new BigNumber2(NaN);
          if (a != b) {
            y.s = -b;
            return x.plus(y);
          }
          var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc)
              return xc ? (y.s = -b, y) : new BigNumber2(yc ? x : NaN);
            if (!xc[0] || !yc[0]) {
              return yc[0] ? (y.s = -b, y) : new BigNumber2(xc[0] ? x : ROUNDING_MODE == 3 ? -0 : 0);
            }
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (xLTy = a < 0) {
              a = -a;
              t = xc;
            } else {
              ye = xe;
              t = yc;
            }
            t.reverse();
            for (b = a; b--; t.push(0))
              ;
            t.reverse();
          } else {
            j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
            for (a = b = 0; b < j; b++) {
              if (xc[b] != yc[b]) {
                xLTy = xc[b] < yc[b];
                break;
              }
            }
          }
          if (xLTy) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
          }
          b = (j = yc.length) - (i = xc.length);
          if (b > 0)
            for (; b--; xc[i++] = 0)
              ;
          b = BASE - 1;
          for (; j > a; ) {
            if (xc[--j] < yc[j]) {
              for (i = j; i && !xc[--i]; xc[i] = b)
                ;
              --xc[i];
              xc[j] += BASE;
            }
            xc[j] -= yc[j];
          }
          for (; xc[0] == 0; xc.splice(0, 1), --ye)
            ;
          if (!xc[0]) {
            y.s = ROUNDING_MODE == 3 ? -1 : 1;
            y.c = [y.e = 0];
            return y;
          }
          return normalise(y, xc, ye);
        };
        P.modulo = P.mod = function(y, b) {
          var q, s, x = this;
          y = new BigNumber2(y, b);
          if (!x.c || !y.s || y.c && !y.c[0]) {
            return new BigNumber2(NaN);
          } else if (!y.c || x.c && !x.c[0]) {
            return new BigNumber2(x);
          }
          if (MODULO_MODE == 9) {
            s = y.s;
            y.s = 1;
            q = div(x, y, 0, 3);
            y.s = s;
            q.s *= s;
          } else {
            q = div(x, y, 0, MODULO_MODE);
          }
          y = x.minus(q.times(y));
          if (!y.c[0] && MODULO_MODE == 1)
            y.s = x.s;
          return y;
        };
        P.multipliedBy = P.times = function(y, b) {
          var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber2(y, b)).c;
          if (!xc || !yc || !xc[0] || !yc[0]) {
            if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
              y.c = y.e = y.s = null;
            } else {
              y.s *= x.s;
              if (!xc || !yc) {
                y.c = y.e = null;
              } else {
                y.c = [0];
                y.e = 0;
              }
            }
            return y;
          }
          e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
          y.s *= x.s;
          xcL = xc.length;
          ycL = yc.length;
          if (xcL < ycL) {
            zc = xc;
            xc = yc;
            yc = zc;
            i = xcL;
            xcL = ycL;
            ycL = i;
          }
          for (i = xcL + ycL, zc = []; i--; zc.push(0))
            ;
          base = BASE;
          sqrtBase = SQRT_BASE;
          for (i = ycL; --i >= 0; ) {
            c = 0;
            ylo = yc[i] % sqrtBase;
            yhi = yc[i] / sqrtBase | 0;
            for (k = xcL, j = i + k; j > i; ) {
              xlo = xc[--k] % sqrtBase;
              xhi = xc[k] / sqrtBase | 0;
              m = yhi * xlo + xhi * ylo;
              xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
              c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
              zc[j--] = xlo % base;
            }
            zc[j] = c;
          }
          if (c) {
            ++e;
          } else {
            zc.splice(0, 1);
          }
          return normalise(y, zc, e);
        };
        P.negated = function() {
          var x = new BigNumber2(this);
          x.s = -x.s || null;
          return x;
        };
        P.plus = function(y, b) {
          var t, x = this, a = x.s;
          y = new BigNumber2(y, b);
          b = y.s;
          if (!a || !b)
            return new BigNumber2(NaN);
          if (a != b) {
            y.s = -b;
            return x.minus(y);
          }
          var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc)
              return new BigNumber2(a / 0);
            if (!xc[0] || !yc[0])
              return yc[0] ? y : new BigNumber2(xc[0] ? x : a * 0);
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (a > 0) {
              ye = xe;
              t = yc;
            } else {
              a = -a;
              t = xc;
            }
            t.reverse();
            for (; a--; t.push(0))
              ;
            t.reverse();
          }
          a = xc.length;
          b = yc.length;
          if (a - b < 0) {
            t = yc;
            yc = xc;
            xc = t;
            b = a;
          }
          for (a = 0; b; ) {
            a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
            xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
          }
          if (a) {
            xc = [a].concat(xc);
            ++ye;
          }
          return normalise(y, xc, ye);
        };
        P.precision = P.sd = function(sd, rm) {
          var c, n, v, x = this;
          if (sd != null && sd !== !!sd) {
            intCheck(sd, 1, MAX);
            if (rm == null)
              rm = ROUNDING_MODE;
            else
              intCheck(rm, 0, 8);
            return round(new BigNumber2(x), sd, rm);
          }
          if (!(c = x.c))
            return null;
          v = c.length - 1;
          n = v * LOG_BASE + 1;
          if (v = c[v]) {
            for (; v % 10 == 0; v /= 10, n--)
              ;
            for (v = c[0]; v >= 10; v /= 10, n++)
              ;
          }
          if (sd && x.e + 1 > n)
            n = x.e + 1;
          return n;
        };
        P.shiftedBy = function(k) {
          intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
          return this.times("1e" + k);
        };
        P.squareRoot = P.sqrt = function() {
          var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
          if (s !== 1 || !c || !c[0]) {
            return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
          }
          s = Math.sqrt(+valueOf(x));
          if (s == 0 || s == 1 / 0) {
            n = coeffToString(c);
            if ((n.length + e) % 2 == 0)
              n += "0";
            s = Math.sqrt(+n);
            e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
            if (s == 1 / 0) {
              n = "5e" + e;
            } else {
              n = s.toExponential();
              n = n.slice(0, n.indexOf("e") + 1) + e;
            }
            r = new BigNumber2(n);
          } else {
            r = new BigNumber2(s + "");
          }
          if (r.c[0]) {
            e = r.e;
            s = e + dp;
            if (s < 3)
              s = 0;
            for (; ; ) {
              t = r;
              r = half.times(t.plus(div(x, t, dp, 1)));
              if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
                if (r.e < e)
                  --s;
                n = n.slice(s - 3, s + 1);
                if (n == "9999" || !rep && n == "4999") {
                  if (!rep) {
                    round(t, t.e + DECIMAL_PLACES + 2, 0);
                    if (t.times(t).eq(x)) {
                      r = t;
                      break;
                    }
                  }
                  dp += 4;
                  s += 4;
                  rep = 1;
                } else {
                  if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                    round(r, r.e + DECIMAL_PLACES + 2, 1);
                    m = !r.times(r).eq(x);
                  }
                  break;
                }
              }
            }
          }
          return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
        };
        P.toExponential = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp++;
          }
          return format(this, dp, rm, 1);
        };
        P.toFixed = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp = dp + this.e + 1;
          }
          return format(this, dp, rm);
        };
        P.toFormat = function(dp, rm, format2) {
          var str, x = this;
          if (format2 == null) {
            if (dp != null && rm && typeof rm == "object") {
              format2 = rm;
              rm = null;
            } else if (dp && typeof dp == "object") {
              format2 = dp;
              dp = rm = null;
            } else {
              format2 = FORMAT;
            }
          } else if (typeof format2 != "object") {
            throw Error(bignumberError + "Argument not an object: " + format2);
          }
          str = x.toFixed(dp, rm);
          if (x.c) {
            var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
            if (g2) {
              i = g1;
              g1 = g2;
              g2 = i;
              len -= i;
            }
            if (g1 > 0 && len > 0) {
              i = len % g1 || g1;
              intPart = intDigits.substr(0, i);
              for (; i < len; i += g1)
                intPart += groupSeparator + intDigits.substr(i, g1);
              if (g2 > 0)
                intPart += groupSeparator + intDigits.slice(i);
              if (isNeg)
                intPart = "-" + intPart;
            }
            str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
              new RegExp("\\d{" + g2 + "}\\B", "g"),
              "$&" + (format2.fractionGroupSeparator || "")
            ) : fractionPart) : intPart;
          }
          return (format2.prefix || "") + str + (format2.suffix || "");
        };
        P.toFraction = function(md) {
          var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
          if (md != null) {
            n = new BigNumber2(md);
            if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
              throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
            }
          }
          if (!xc)
            return new BigNumber2(x);
          d = new BigNumber2(ONE);
          n1 = d0 = new BigNumber2(ONE);
          d1 = n0 = new BigNumber2(ONE);
          s = coeffToString(xc);
          e = d.e = s.length - x.e - 1;
          d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
          md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
          exp = MAX_EXP;
          MAX_EXP = 1 / 0;
          n = new BigNumber2(s);
          n0.c[0] = 0;
          for (; ; ) {
            q = div(n, d, 0, 1);
            d2 = d0.plus(q.times(d1));
            if (d2.comparedTo(md) == 1)
              break;
            d0 = d1;
            d1 = d2;
            n1 = n0.plus(q.times(d2 = n1));
            n0 = d2;
            d = n.minus(q.times(d2 = d));
            n = d2;
          }
          d2 = div(md.minus(d0), d1, 0, 1);
          n0 = n0.plus(d2.times(n1));
          d0 = d0.plus(d2.times(d1));
          n0.s = n1.s = x.s;
          e = e * 2;
          r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
            div(n0, d0, e, ROUNDING_MODE).minus(x).abs()
          ) < 1 ? [n1, d1] : [n0, d0];
          MAX_EXP = exp;
          return r;
        };
        P.toNumber = function() {
          return +valueOf(this);
        };
        P.toPrecision = function(sd, rm) {
          if (sd != null)
            intCheck(sd, 1, MAX);
          return format(this, sd, rm, 2);
        };
        P.toString = function(b) {
          var str, n = this, s = n.s, e = n.e;
          if (e === null) {
            if (s) {
              str = "Infinity";
              if (s < 0)
                str = "-" + str;
            } else {
              str = "NaN";
            }
          } else {
            if (b == null) {
              str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
            } else if (b === 10 && alphabetHasNormalDecimalDigits) {
              n = round(new BigNumber2(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
              str = toFixedPoint(coeffToString(n.c), n.e, "0");
            } else {
              intCheck(b, 2, ALPHABET.length, "Base");
              str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
            }
            if (s < 0 && n.c[0])
              str = "-" + str;
          }
          return str;
        };
        P.valueOf = P.toJSON = function() {
          return valueOf(this);
        };
        P._isBigNumber = true;
        if (configObject != null)
          BigNumber2.set(configObject);
        return BigNumber2;
      }
      function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
      }
      function coeffToString(a) {
        var s, z, i = 1, j = a.length, r = a[0] + "";
        for (; i < j; ) {
          s = a[i++] + "";
          z = LOG_BASE - s.length;
          for (; z--; s = "0" + s)
            ;
          r += s;
        }
        for (j = r.length; r.charCodeAt(--j) === 48; )
          ;
        return r.slice(0, j + 1 || 1);
      }
      function compare(x, y) {
        var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
        if (!i || !j)
          return null;
        a = xc && !xc[0];
        b = yc && !yc[0];
        if (a || b)
          return a ? b ? 0 : -j : i;
        if (i != j)
          return i;
        a = i < 0;
        b = k == l;
        if (!xc || !yc)
          return b ? 0 : !xc ^ a ? 1 : -1;
        if (!b)
          return k > l ^ a ? 1 : -1;
        j = (k = xc.length) < (l = yc.length) ? k : l;
        for (i = 0; i < j; i++)
          if (xc[i] != yc[i])
            return xc[i] > yc[i] ^ a ? 1 : -1;
        return k == l ? 0 : k > l ^ a ? 1 : -1;
      }
      function intCheck(n, min, max, name) {
        if (n < min || n > max || n !== mathfloor(n)) {
          throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
        }
      }
      function isOdd(n) {
        var k = n.c.length - 1;
        return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
      }
      function toExponential(str, e) {
        return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
      }
      function toFixedPoint(str, e, z) {
        var len, zs;
        if (e < 0) {
          for (zs = z + "."; ++e; zs += z)
            ;
          str = zs + str;
        } else {
          len = str.length;
          if (++e > len) {
            for (zs = z, e -= len; --e; zs += z)
              ;
            str += zs;
          } else if (e < len) {
            str = str.slice(0, e) + "." + str.slice(e);
          }
        }
        return str;
      }
      BigNumber = clone();
      BigNumber["default"] = BigNumber.BigNumber = BigNumber;
      if (typeof define == "function" && define.amd) {
        define(function() {
          return BigNumber;
        });
      } else if (typeof module != "undefined" && module.exports) {
        module.exports = BigNumber;
      } else {
        if (!globalObject) {
          globalObject = typeof self != "undefined" && self ? self : window;
        }
        globalObject.BigNumber = BigNumber;
      }
    })(exports);
  }
});

// node_modules/arweave/web/ar.js
var require_ar = __commonJS({
  "node_modules/arweave/web/ar.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var bignumber_js_1 = require_bignumber();
    var Ar = class {
      constructor() {
        this.BigNum = (value, decimals) => {
          let instance = bignumber_js_1.BigNumber.clone({ DECIMAL_PLACES: decimals });
          return new instance(value);
        };
      }
      winstonToAr(winstonString, { formatted = false, decimals = 12, trim = true } = {}) {
        let number = this.stringToBigNum(winstonString, decimals).shiftedBy(-12);
        return formatted ? number.toFormat(decimals) : number.toFixed(decimals);
      }
      arToWinston(arString, { formatted = false } = {}) {
        let number = this.stringToBigNum(arString).shiftedBy(12);
        return formatted ? number.toFormat() : number.toFixed(0);
      }
      compare(winstonStringA, winstonStringB) {
        let a = this.stringToBigNum(winstonStringA);
        let b = this.stringToBigNum(winstonStringB);
        return a.comparedTo(b);
      }
      isEqual(winstonStringA, winstonStringB) {
        return this.compare(winstonStringA, winstonStringB) === 0;
      }
      isLessThan(winstonStringA, winstonStringB) {
        let a = this.stringToBigNum(winstonStringA);
        let b = this.stringToBigNum(winstonStringB);
        return a.isLessThan(b);
      }
      isGreaterThan(winstonStringA, winstonStringB) {
        let a = this.stringToBigNum(winstonStringA);
        let b = this.stringToBigNum(winstonStringB);
        return a.isGreaterThan(b);
      }
      add(winstonStringA, winstonStringB) {
        let a = this.stringToBigNum(winstonStringA);
        let b = this.stringToBigNum(winstonStringB);
        return a.plus(winstonStringB).toFixed(0);
      }
      sub(winstonStringA, winstonStringB) {
        let a = this.stringToBigNum(winstonStringA);
        let b = this.stringToBigNum(winstonStringB);
        return a.minus(winstonStringB).toFixed(0);
      }
      stringToBigNum(stringValue, decimalPlaces = 12) {
        return this.BigNum(stringValue, decimalPlaces);
      }
    };
    exports.default = Ar;
  }
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    module.exports = function bind3(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    var bind3 = require_bind();
    var toString4 = Object.prototype.toString;
    var kindOf = function(cache) {
      return function(thing) {
        var str = toString4.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
      };
    }(/* @__PURE__ */ Object.create(null));
    function kindOfTest(type3) {
      type3 = type3.toLowerCase();
      return function isKindOf(thing) {
        return kindOf(thing) === type3;
      };
    }
    function isArray(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    var isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (kindOf(val) !== "object") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    var isDate = kindOfTest("Date");
    var isFile = kindOfTest("File");
    var isBlob = kindOfTest("Blob");
    var isFileList = kindOfTest("FileList");
    function isFunction(val) {
      return toString4.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isFormData(thing) {
      var pattern = "[object FormData]";
      return thing && (typeof FormData === "function" && thing instanceof FormData || toString4.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
    }
    var isURLSearchParams = kindOfTest("URLSearchParams");
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind3(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    function inherits(constructor, superConstructor, props, descriptors) {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      props && Object.assign(constructor.prototype, props);
    }
    function toFlatObject(sourceObj, destObj, filter2) {
      var props;
      var i;
      var prop4;
      var merged = {};
      destObj = destObj || {};
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop4 = props[i];
          if (!merged[prop4]) {
            destObj[prop4] = sourceObj[prop4];
            merged[prop4] = true;
          }
        }
        sourceObj = Object.getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    }
    function endsWith(str, searchString, position) {
      str = String(str);
      if (position === void 0 || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      var lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
    function toArray(thing) {
      if (!thing)
        return null;
      var i = thing.length;
      if (isUndefined(i))
        return null;
      var arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    }
    var isTypedArray = function(TypedArray) {
      return function(thing) {
        return TypedArray && thing instanceof TypedArray;
      };
    }(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      isTypedArray,
      isFileList
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/AxiosError.js
var require_AxiosError = __commonJS({
  "node_modules/axios/lib/core/AxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function AxiosError(message, code, config, request, response) {
      Error.call(this);
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype = AxiosError.prototype;
    var descriptors = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED"
    ].forEach(function(code) {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype, "isAxiosError", { value: true });
    AxiosError.from = function(error, code, config, request, response, customProps) {
      var axiosError = Object.create(prototype);
      utils.toFlatObject(error, axiosError, function filter2(obj) {
        return obj !== Error.prototype;
      });
      AxiosError.call(axiosError, error.message, code, config, request, response);
      axiosError.name = error.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    module.exports = AxiosError;
  }
});

// node_modules/axios/lib/defaults/transitional.js
var require_transitional = __commonJS({
  "node_modules/axios/lib/defaults/transitional.js"(exports, module) {
    "use strict";
    module.exports = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
  }
});

// node_modules/axios/lib/helpers/toFormData.js
var require_toFormData = __commonJS({
  "node_modules/axios/lib/helpers/toFormData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function toFormData(obj, formData) {
      formData = formData || new FormData();
      var stack = [];
      function convertValue(value) {
        if (value === null)
          return "";
        if (utils.isDate(value)) {
          return value.toISOString();
        }
        if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
          return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
        }
        return value;
      }
      function build(data, parentKey) {
        if (utils.isPlainObject(data) || utils.isArray(data)) {
          if (stack.indexOf(data) !== -1) {
            throw Error("Circular reference detected in " + parentKey);
          }
          stack.push(data);
          utils.forEach(data, function each(value, key) {
            if (utils.isUndefined(value))
              return;
            var fullKey = parentKey ? parentKey + "." + key : key;
            var arr;
            if (value && !parentKey && typeof value === "object") {
              if (utils.endsWith(key, "{}")) {
                value = JSON.stringify(value);
              } else if (utils.endsWith(key, "[]") && (arr = utils.toArray(value))) {
                arr.forEach(function(el) {
                  !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
                });
                return;
              }
            }
            build(value, fullKey);
          });
          stack.pop();
        } else {
          formData.append(parentKey, convertValue(data));
        }
      }
      build(obj);
      return formData;
    }
    module.exports = toFormData;
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    var AxiosError = require_AxiosError();
    module.exports = function settle(resolve, reject3, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject3(new AxiosError(
          "Request failed with status code " + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path3, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path3)) {
            cookie.push("path=" + path3);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/cancel/CanceledError.js
var require_CanceledError = __commonJS({
  "node_modules/axios/lib/cancel/CanceledError.js"(exports, module) {
    "use strict";
    var AxiosError = require_AxiosError();
    var utils = require_utils();
    function CanceledError(message) {
      AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED);
      this.name = "CanceledError";
    }
    utils.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    module.exports = CanceledError;
  }
});

// node_modules/axios/lib/helpers/parseProtocol.js
var require_parseProtocol = __commonJS({
  "node_modules/axios/lib/helpers/parseProtocol.js"(exports, module) {
    "use strict";
    module.exports = function parseProtocol(url) {
      var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || "";
    };
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var transitionalDefaults = require_transitional();
    var AxiosError = require_AxiosError();
    var CanceledError = require_CanceledError();
    var parseProtocol = require_parseProtocol();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject3) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject3(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject3(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
          request = null;
        };
        request.onerror = function handleError() {
          reject3(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject3(new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config,
            request
          ));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject3(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        var protocol = parseProtocol(fullPath);
        if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
          reject3(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
          return;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/axios/lib/helpers/null.js
var require_null = __commonJS({
  "node_modules/axios/lib/helpers/null.js"(exports, module) {
    module.exports = null;
  }
});

// node_modules/axios/lib/defaults/index.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults/index.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var AxiosError = require_AxiosError();
    var transitionalDefaults = require_transitional();
    var toFormData = require_toFormData();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        var isObjectPayload = utils.isObject(data);
        var contentType = headers && headers["Content-Type"];
        var isFileList;
        if ((isFileList = utils.isFileList(data)) || isObjectPayload && contentType === "multipart/form-data") {
          var _FormData = this.env && this.env.FormData;
          return toFormData(isFileList ? { "files[]": data } : data, _FormData && new _FormData());
        } else if (isObjectPayload || contentType === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: require_null()
      },
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
    "use strict";
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var CanceledError = require_CanceledError();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new CanceledError();
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
      );
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
      utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(
          config,
          response.data,
          response.headers,
          config.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop4) {
        if (!utils.isUndefined(config2[prop4])) {
          return getMergedValue(config1[prop4], config2[prop4]);
        } else if (!utils.isUndefined(config1[prop4])) {
          return getMergedValue(void 0, config1[prop4]);
        }
      }
      function valueFromConfig2(prop4) {
        if (!utils.isUndefined(config2[prop4])) {
          return getMergedValue(void 0, config2[prop4]);
        }
      }
      function defaultToConfig2(prop4) {
        if (!utils.isUndefined(config2[prop4])) {
          return getMergedValue(void 0, config2[prop4]);
        } else if (!utils.isUndefined(config1[prop4])) {
          return getMergedValue(void 0, config1[prop4]);
        }
      }
      function mergeDirectKeys(prop4) {
        if (prop4 in config2) {
          return getMergedValue(config1[prop4], config2[prop4]);
        } else if (prop4 in config1) {
          return getMergedValue(void 0, config1[prop4]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "beforeRedirect": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop4) {
        var merge = mergeMap[prop4] || mergeDeepProperties;
        var configValue = merge(prop4);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop4] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module) {
    module.exports = {
      "version": "0.27.2"
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module) {
    "use strict";
    var VERSION = require_data().version;
    var AxiosError = require_AxiosError();
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type3, i) {
      validators[type3] = function validator(thing) {
        return typeof thing === type3 || "a" + (i < 1 ? "n " : " ") + type3;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new AxiosError(
            formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
            AxiosError.ERR_DEPRECATED
          );
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version + " and will be removed in the near future"
            )
          );
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
      }
      var keys4 = Object.keys(options);
      var i = keys4.length;
      while (i-- > 0) {
        var opt = keys4[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }
    module.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var buildFullPath = require_buildFullPath();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      var fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            headers: isForm ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url,
            data
          }));
        };
      }
      Axios.prototype[method] = generateHTTPMethod();
      Axios.prototype[method + "Form"] = generateHTTPMethod(true);
    });
    module.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
    "use strict";
    var CanceledError = require_CanceledError();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject3() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module) {
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var bind3 = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind3(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios = createInstance(defaults);
    axios.Axios = Axios;
    axios.CanceledError = require_CanceledError();
    axios.CancelToken = require_CancelToken();
    axios.isCancel = require_isCancel();
    axios.VERSION = require_data().version;
    axios.toFormData = require_toFormData();
    axios.AxiosError = require_AxiosError();
    axios.Cancel = axios.CanceledError;
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require_spread();
    axios.isAxiosError = require_isAxiosError();
    module.exports = axios;
    module.exports.default = axios;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module) {
    module.exports = require_axios();
  }
});

// node_modules/arweave/web/lib/api.js
var require_api = __commonJS({
  "node_modules/arweave/web/lib/api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var axios_1 = require_axios2();
    var Api = class {
      constructor(config) {
        this.METHOD_GET = "GET";
        this.METHOD_POST = "POST";
        this.applyConfig(config);
      }
      applyConfig(config) {
        this.config = this.mergeDefaults(config);
      }
      getConfig() {
        return this.config;
      }
      mergeDefaults(config) {
        const protocol = config.protocol || "http";
        const port = config.port || (protocol === "https" ? 443 : 80);
        return {
          host: config.host || "127.0.0.1",
          protocol,
          port,
          timeout: config.timeout || 2e4,
          logging: config.logging || false,
          logger: config.logger || console.log,
          network: config.network
        };
      }
      async get(endpoint, config) {
        try {
          return await this.request().get(endpoint, config);
        } catch (error) {
          if (error.response && error.response.status) {
            return error.response;
          }
          throw error;
        }
      }
      async post(endpoint, body, config) {
        try {
          return await this.request().post(endpoint, body, config);
        } catch (error) {
          if (error.response && error.response.status) {
            return error.response;
          }
          throw error;
        }
      }
      request() {
        const headers = {};
        if (this.config.network) {
          headers["x-network"] = this.config.network;
        }
        let instance = axios_1.default.create({
          baseURL: `${this.config.protocol}://${this.config.host}:${this.config.port}`,
          timeout: this.config.timeout,
          maxContentLength: 1024 * 1024 * 512,
          headers
        });
        if (this.config.logging) {
          instance.interceptors.request.use((request) => {
            this.config.logger(`Requesting: ${request.baseURL}/${request.url}`);
            return request;
          });
          instance.interceptors.response.use((response) => {
            this.config.logger(`Response:   ${response.config.url} - ${response.status}`);
            return response;
          });
        }
        return instance;
      }
    };
    exports.default = Api;
  }
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens3 = getLens(b64);
      var validLen = lens3[0];
      var placeHoldersLen = lens3[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens3 = getLens(b64);
      var validLen = lens3[0];
      var placeHoldersLen = lens3[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports, module) {
    "use strict";
    module.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "node_modules/has-tostringtag/shams.js"(exports, module) {
    "use strict";
    var hasSymbols = require_shams();
    module.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports, module) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice3 = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module.exports = function bind3(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice3.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(slice3.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(slice3.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    var implementation = require_implementation();
    module.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/has/src/index.js
var require_src = __commonJS({
  "node_modules/has/src/index.js"(exports, module) {
    "use strict";
    var bind3 = require_function_bind();
    module.exports = bind3.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports, module) {
    "use strict";
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = Object.getPrototypeOf || function(x) {
      return x.__proto__;
    };
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind3 = require_function_bind();
    var hasOwn = require_src();
    var $concat = bind3.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind3.call(Function.apply, Array.prototype.splice);
    var $replace = bind3.call(Function.call, String.prototype.replace);
    var $strSlice = bind3.call(Function.call, String.prototype.slice);
    var $exec = bind3.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports, module) {
    "use strict";
    var bind3 = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind3.call($call, $apply);
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module.exports = function callBind(originalFunction) {
      var func = $reflectApply(bind3, $call, arguments);
      if ($gOPD && $defineProperty) {
        var desc = $gOPD(func, "length");
        if (desc.configurable) {
          $defineProperty(
            func,
            "length",
            { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
          );
        }
      }
      return func;
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind3, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  }
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// node_modules/is-arguments/index.js
var require_is_arguments = __commonJS({
  "node_modules/is-arguments/index.js"(exports, module) {
    "use strict";
    var hasToStringTag = require_shams2()();
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var isStandardArguments = function isArguments(value) {
      if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
        return false;
      }
      return $toString(value) === "[object Arguments]";
    };
    var isLegacyArguments = function isArguments(value) {
      if (isStandardArguments(value)) {
        return true;
      }
      return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
    };
    var supportsStandardArguments = function() {
      return isStandardArguments(arguments);
    }();
    isStandardArguments.isLegacyArguments = isLegacyArguments;
    module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  }
});

// node_modules/is-generator-function/index.js
var require_is_generator_function = __commonJS({
  "node_modules/is-generator-function/index.js"(exports, module) {
    "use strict";
    var toStr = Object.prototype.toString;
    var fnToStr = Function.prototype.toString;
    var isFnRegex = /^\s*(?:function)?\*/;
    var hasToStringTag = require_shams2()();
    var getProto = Object.getPrototypeOf;
    var getGeneratorFunc = function() {
      if (!hasToStringTag) {
        return false;
      }
      try {
        return Function("return function*() {}")();
      } catch (e) {
      }
    };
    var GeneratorFunction;
    module.exports = function isGeneratorFunction(fn) {
      if (typeof fn !== "function") {
        return false;
      }
      if (isFnRegex.test(fnToStr.call(fn))) {
        return true;
      }
      if (!hasToStringTag) {
        var str = toStr.call(fn);
        return str === "[object GeneratorFunction]";
      }
      if (!getProto) {
        return false;
      }
      if (typeof GeneratorFunction === "undefined") {
        var generatorFunc = getGeneratorFunc();
        GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
      }
      return getProto(fn) === GeneratorFunction;
    };
  }
});

// node_modules/is-callable/index.js
var require_is_callable = __commonJS({
  "node_modules/is-callable/index.js"(exports, module) {
    "use strict";
    var fnToStr = Function.prototype.toString;
    var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
    var badArrayLike;
    var isCallableMarker;
    if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
      try {
        badArrayLike = Object.defineProperty({}, "length", {
          get: function() {
            throw isCallableMarker;
          }
        });
        isCallableMarker = {};
        reflectApply(function() {
          throw 42;
        }, null, badArrayLike);
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null;
        }
      }
    } else {
      reflectApply = null;
    }
    var constructorRegex = /^\s*class\b/;
    var isES6ClassFn = function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    };
    var tryFunctionObject = function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = function isDocumentDotAll() {
      return false;
    };
    if (typeof document === "object") {
      all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        };
      }
    }
    var all;
    module.exports = reflectApply ? function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      try {
        reflectApply(value, null, badArrayLike);
      } catch (e) {
        if (e !== isCallableMarker) {
          return false;
        }
      }
      return !isES6ClassFn(value) && tryFunctionObject(value);
    } : function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      if (isES6ClassFn(value)) {
        return false;
      }
      var strClass = toStr.call(value);
      if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
      }
      return tryFunctionObject(value);
    };
  }
});

// node_modules/for-each/index.js
var require_for_each = __commonJS({
  "node_modules/for-each/index.js"(exports, module) {
    "use strict";
    var isCallable = require_is_callable();
    var toStr = Object.prototype.toString;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var forEachArray = function forEachArray2(array, iterator, receiver) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
          if (receiver == null) {
            iterator(array[i], i, array);
          } else {
            iterator.call(receiver, array[i], i, array);
          }
        }
      }
    };
    var forEachString = function forEachString2(string, iterator, receiver) {
      for (var i = 0, len = string.length; i < len; i++) {
        if (receiver == null) {
          iterator(string.charAt(i), i, string);
        } else {
          iterator.call(receiver, string.charAt(i), i, string);
        }
      }
    };
    var forEachObject = function forEachObject2(object, iterator, receiver) {
      for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
          if (receiver == null) {
            iterator(object[k], k, object);
          } else {
            iterator.call(receiver, object[k], k, object);
          }
        }
      }
    };
    var forEach = function forEach2(list, iterator, thisArg) {
      if (!isCallable(iterator)) {
        throw new TypeError("iterator must be a function");
      }
      var receiver;
      if (arguments.length >= 3) {
        receiver = thisArg;
      }
      if (toStr.call(list) === "[object Array]") {
        forEachArray(list, iterator, receiver);
      } else if (typeof list === "string") {
        forEachString(list, iterator, receiver);
      } else {
        forEachObject(list, iterator, receiver);
      }
    };
    module.exports = forEach;
  }
});

// node_modules/available-typed-arrays/index.js
var require_available_typed_arrays = __commonJS({
  "node_modules/available-typed-arrays/index.js"(exports, module) {
    "use strict";
    var possibleNames = [
      "BigInt64Array",
      "BigUint64Array",
      "Float32Array",
      "Float64Array",
      "Int16Array",
      "Int32Array",
      "Int8Array",
      "Uint16Array",
      "Uint32Array",
      "Uint8Array",
      "Uint8ClampedArray"
    ];
    var g = typeof globalThis === "undefined" ? global : globalThis;
    module.exports = function availableTypedArrays() {
      var out = [];
      for (var i = 0; i < possibleNames.length; i++) {
        if (typeof g[possibleNames[i]] === "function") {
          out[out.length] = possibleNames[i];
        }
      }
      return out;
    };
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});

// node_modules/is-typed-array/index.js
var require_is_typed_array = __commonJS({
  "node_modules/is-typed-array/index.js"(exports, module) {
    "use strict";
    var forEach = require_for_each();
    var availableTypedArrays = require_available_typed_arrays();
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var hasToStringTag = require_shams2()();
    var gOPD = require_gopd();
    var g = typeof globalThis === "undefined" ? global : globalThis;
    var typedArrays = availableTypedArrays();
    var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    };
    var $slice = callBound("String.prototype.slice");
    var toStrTags = {};
    var getPrototypeOf = Object.getPrototypeOf;
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        if (Symbol.toStringTag in arr) {
          var proto = getPrototypeOf(arr);
          var descriptor = gOPD(proto, Symbol.toStringTag);
          if (!descriptor) {
            var superProto = getPrototypeOf(proto);
            descriptor = gOPD(superProto, Symbol.toStringTag);
          }
          toStrTags[typedArray] = descriptor.get;
        }
      });
    }
    var tryTypedArrays = function tryAllTypedArrays(value) {
      var anyTrue = false;
      forEach(toStrTags, function(getter, typedArray) {
        if (!anyTrue) {
          try {
            anyTrue = getter.call(value) === typedArray;
          } catch (e) {
          }
        }
      });
      return anyTrue;
    };
    module.exports = function isTypedArray(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      if (!hasToStringTag || !(Symbol.toStringTag in value)) {
        var tag = $slice($toString(value), 8, -1);
        return $indexOf(typedArrays, tag) > -1;
      }
      if (!gOPD) {
        return false;
      }
      return tryTypedArrays(value);
    };
  }
});

// node_modules/which-typed-array/index.js
var require_which_typed_array = __commonJS({
  "node_modules/which-typed-array/index.js"(exports, module) {
    "use strict";
    var forEach = require_for_each();
    var availableTypedArrays = require_available_typed_arrays();
    var callBound = require_callBound();
    var gOPD = require_gopd();
    var $toString = callBound("Object.prototype.toString");
    var hasToStringTag = require_shams2()();
    var g = typeof globalThis === "undefined" ? global : globalThis;
    var typedArrays = availableTypedArrays();
    var $slice = callBound("String.prototype.slice");
    var toStrTags = {};
    var getPrototypeOf = Object.getPrototypeOf;
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach(typedArrays, function(typedArray) {
        if (typeof g[typedArray] === "function") {
          var arr = new g[typedArray]();
          if (Symbol.toStringTag in arr) {
            var proto = getPrototypeOf(arr);
            var descriptor = gOPD(proto, Symbol.toStringTag);
            if (!descriptor) {
              var superProto = getPrototypeOf(proto);
              descriptor = gOPD(superProto, Symbol.toStringTag);
            }
            toStrTags[typedArray] = descriptor.get;
          }
        }
      });
    }
    var tryTypedArrays = function tryAllTypedArrays(value) {
      var foundName = false;
      forEach(toStrTags, function(getter, typedArray) {
        if (!foundName) {
          try {
            var name = getter.call(value);
            if (name === typedArray) {
              foundName = name;
            }
          } catch (e) {
          }
        }
      });
      return foundName;
    };
    var isTypedArray = require_is_typed_array();
    module.exports = function whichTypedArray(value) {
      if (!isTypedArray(value)) {
        return false;
      }
      if (!hasToStringTag || !(Symbol.toStringTag in value)) {
        return $slice($toString(value), 8, -1);
      }
      return tryTypedArrays(value);
    };
  }
});

// node_modules/util/support/types.js
var require_types2 = __commonJS({
  "node_modules/util/support/types.js"(exports) {
    "use strict";
    var isArgumentsObject = require_is_arguments();
    var isGeneratorFunction = require_is_generator_function();
    var whichTypedArray = require_which_typed_array();
    var isTypedArray = require_is_typed_array();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var BigIntSupported = typeof BigInt !== "undefined";
    var SymbolSupported = typeof Symbol !== "undefined";
    var ObjectToString = uncurryThis(Object.prototype.toString);
    var numberValue = uncurryThis(Number.prototype.valueOf);
    var stringValue = uncurryThis(String.prototype.valueOf);
    var booleanValue = uncurryThis(Boolean.prototype.valueOf);
    if (BigIntSupported) {
      bigIntValue = uncurryThis(BigInt.prototype.valueOf);
    }
    var bigIntValue;
    if (SymbolSupported) {
      symbolValue = uncurryThis(Symbol.prototype.valueOf);
    }
    var symbolValue;
    function checkBoxedPrimitive(value, prototypeValueOf) {
      if (typeof value !== "object") {
        return false;
      }
      try {
        prototypeValueOf(value);
        return true;
      } catch (e) {
        return false;
      }
    }
    exports.isArgumentsObject = isArgumentsObject;
    exports.isGeneratorFunction = isGeneratorFunction;
    exports.isTypedArray = isTypedArray;
    function isPromise(input) {
      return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
    }
    exports.isPromise = isPromise;
    function isArrayBufferView(value) {
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
      }
      return isTypedArray(value) || isDataView(value);
    }
    exports.isArrayBufferView = isArrayBufferView;
    function isUint8Array(value) {
      return whichTypedArray(value) === "Uint8Array";
    }
    exports.isUint8Array = isUint8Array;
    function isUint8ClampedArray(value) {
      return whichTypedArray(value) === "Uint8ClampedArray";
    }
    exports.isUint8ClampedArray = isUint8ClampedArray;
    function isUint16Array(value) {
      return whichTypedArray(value) === "Uint16Array";
    }
    exports.isUint16Array = isUint16Array;
    function isUint32Array(value) {
      return whichTypedArray(value) === "Uint32Array";
    }
    exports.isUint32Array = isUint32Array;
    function isInt8Array(value) {
      return whichTypedArray(value) === "Int8Array";
    }
    exports.isInt8Array = isInt8Array;
    function isInt16Array(value) {
      return whichTypedArray(value) === "Int16Array";
    }
    exports.isInt16Array = isInt16Array;
    function isInt32Array(value) {
      return whichTypedArray(value) === "Int32Array";
    }
    exports.isInt32Array = isInt32Array;
    function isFloat32Array(value) {
      return whichTypedArray(value) === "Float32Array";
    }
    exports.isFloat32Array = isFloat32Array;
    function isFloat64Array(value) {
      return whichTypedArray(value) === "Float64Array";
    }
    exports.isFloat64Array = isFloat64Array;
    function isBigInt64Array(value) {
      return whichTypedArray(value) === "BigInt64Array";
    }
    exports.isBigInt64Array = isBigInt64Array;
    function isBigUint64Array(value) {
      return whichTypedArray(value) === "BigUint64Array";
    }
    exports.isBigUint64Array = isBigUint64Array;
    function isMapToString(value) {
      return ObjectToString(value) === "[object Map]";
    }
    isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
    function isMap(value) {
      if (typeof Map === "undefined") {
        return false;
      }
      return isMapToString.working ? isMapToString(value) : value instanceof Map;
    }
    exports.isMap = isMap;
    function isSetToString(value) {
      return ObjectToString(value) === "[object Set]";
    }
    isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
    function isSet(value) {
      if (typeof Set === "undefined") {
        return false;
      }
      return isSetToString.working ? isSetToString(value) : value instanceof Set;
    }
    exports.isSet = isSet;
    function isWeakMapToString(value) {
      return ObjectToString(value) === "[object WeakMap]";
    }
    isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
    function isWeakMap(value) {
      if (typeof WeakMap === "undefined") {
        return false;
      }
      return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
    }
    exports.isWeakMap = isWeakMap;
    function isWeakSetToString(value) {
      return ObjectToString(value) === "[object WeakSet]";
    }
    isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
    function isWeakSet(value) {
      return isWeakSetToString(value);
    }
    exports.isWeakSet = isWeakSet;
    function isArrayBufferToString(value) {
      return ObjectToString(value) === "[object ArrayBuffer]";
    }
    isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
    function isArrayBuffer(value) {
      if (typeof ArrayBuffer === "undefined") {
        return false;
      }
      return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
    }
    exports.isArrayBuffer = isArrayBuffer;
    function isDataViewToString(value) {
      return ObjectToString(value) === "[object DataView]";
    }
    isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
    function isDataView(value) {
      if (typeof DataView === "undefined") {
        return false;
      }
      return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
    }
    exports.isDataView = isDataView;
    var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
    function isSharedArrayBufferToString(value) {
      return ObjectToString(value) === "[object SharedArrayBuffer]";
    }
    function isSharedArrayBuffer(value) {
      if (typeof SharedArrayBufferCopy === "undefined") {
        return false;
      }
      if (typeof isSharedArrayBufferToString.working === "undefined") {
        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
      }
      return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
    }
    exports.isSharedArrayBuffer = isSharedArrayBuffer;
    function isAsyncFunction(value) {
      return ObjectToString(value) === "[object AsyncFunction]";
    }
    exports.isAsyncFunction = isAsyncFunction;
    function isMapIterator(value) {
      return ObjectToString(value) === "[object Map Iterator]";
    }
    exports.isMapIterator = isMapIterator;
    function isSetIterator(value) {
      return ObjectToString(value) === "[object Set Iterator]";
    }
    exports.isSetIterator = isSetIterator;
    function isGeneratorObject(value) {
      return ObjectToString(value) === "[object Generator]";
    }
    exports.isGeneratorObject = isGeneratorObject;
    function isWebAssemblyCompiledModule(value) {
      return ObjectToString(value) === "[object WebAssembly.Module]";
    }
    exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
    function isNumberObject(value) {
      return checkBoxedPrimitive(value, numberValue);
    }
    exports.isNumberObject = isNumberObject;
    function isStringObject(value) {
      return checkBoxedPrimitive(value, stringValue);
    }
    exports.isStringObject = isStringObject;
    function isBooleanObject(value) {
      return checkBoxedPrimitive(value, booleanValue);
    }
    exports.isBooleanObject = isBooleanObject;
    function isBigIntObject(value) {
      return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
    }
    exports.isBigIntObject = isBigIntObject;
    function isSymbolObject(value) {
      return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
    }
    exports.isSymbolObject = isSymbolObject;
    function isBoxedPrimitive(value) {
      return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
    }
    exports.isBoxedPrimitive = isBoxedPrimitive;
    function isAnyArrayBuffer(value) {
      return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
    }
    exports.isAnyArrayBuffer = isAnyArrayBuffer;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
      Object.defineProperty(exports, method, {
        enumerable: false,
        value: function() {
          throw new Error(method + " is not supported in userland");
        }
      });
    });
  }
});

// node_modules/util/support/isBufferBrowser.js
var require_isBufferBrowser = __commonJS({
  "node_modules/util/support/isBufferBrowser.js"(exports, module) {
    module.exports = function isBuffer(arg) {
      return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
    };
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module) {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/util/util.js
var require_util = __commonJS({
  "node_modules/util/util.js"(exports) {
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
      var keys4 = Object.keys(obj);
      var descriptors = {};
      for (var i = 0; i < keys4.length; i++) {
        descriptors[keys4[i]] = Object.getOwnPropertyDescriptor(obj, keys4[i]);
      }
      return descriptors;
    };
    var formatRegExp = /%[sdj%]/g;
    exports.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%")
          return "%";
        if (i >= len)
          return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    };
    exports.deprecate = function(fn, msg) {
      if (typeof process !== "undefined" && process.noDeprecation === true) {
        return fn;
      }
      if (typeof process === "undefined") {
        return function() {
          return exports.deprecate(fn, msg).apply(this, arguments);
        };
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (process.throwDeprecation) {
            throw new Error(msg);
          } else if (process.traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnvRegex = /^$/;
    if (process.env.NODE_DEBUG) {
      debugEnv = process.env.NODE_DEBUG;
      debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
      debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
    }
    var debugEnv;
    exports.debuglog = function(set) {
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (debugEnvRegex.test(set)) {
          var pid = process.pid;
          debugs[set] = function() {
            var msg = exports.format.apply(exports, arguments);
            console.error("%s %d: %s", set, pid, msg);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect;
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys4 = Object.keys(value);
      var visibleKeys = arrayToHash(keys4);
      if (ctx.showHidden) {
        keys4 = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys4.indexOf("message") >= 0 || keys4.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys4.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError(value);
      }
      if (keys4.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys4);
      } else {
        output = keys4.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys4) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys4.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            true
          ));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").slice(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.slice(1, -1);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf("\n") >= 0)
          numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    exports.types = require_types2();
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    exports.types.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    exports.isDate = isDate;
    exports.types.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    exports.isError = isError;
    exports.types.isNativeError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = require_isBufferBrowser();
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad3(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = new Date();
      var time = [
        pad3(d.getHours()),
        pad3(d.getMinutes()),
        pad3(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    exports.log = function() {
      console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = require_inherits_browser();
    exports._extend = function(origin, add) {
      if (!add || !isObject(add))
        return origin;
      var keys4 = Object.keys(add);
      var i = keys4.length;
      while (i--) {
        origin[keys4[i]] = add[keys4[i]];
      }
      return origin;
    };
    function hasOwnProperty(obj, prop4) {
      return Object.prototype.hasOwnProperty.call(obj, prop4);
    }
    var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
    exports.promisify = function promisify(original) {
      if (typeof original !== "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        }
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return fn;
      }
      function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject3) {
          promiseResolve = resolve;
          promiseReject = reject3;
        });
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        args.push(function(err, value) {
          if (err) {
            promiseReject(err);
          } else {
            promiseResolve(value);
          }
        });
        try {
          original.apply(this, args);
        } catch (err) {
          promiseReject(err);
        }
        return promise;
      }
      Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
      if (kCustomPromisifiedSymbol)
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
      return Object.defineProperties(
        fn,
        getOwnPropertyDescriptors(original)
      );
    };
    exports.promisify.custom = kCustomPromisifiedSymbol;
    function callbackifyOnRejected(reason, cb) {
      if (!reason) {
        var newReason = new Error("Promise was rejected with a falsy value");
        newReason.reason = reason;
        reason = newReason;
      }
      return cb(reason);
    }
    function callbackify(original) {
      if (typeof original !== "function") {
        throw new TypeError('The "original" argument must be of type Function');
      }
      function callbackified() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
          throw new TypeError("The last argument must be of type Function");
        }
        var self2 = this;
        var cb = function() {
          return maybeCb.apply(self2, arguments);
        };
        original.apply(this, args).then(
          function(ret) {
            process.nextTick(cb.bind(null, null, ret));
          },
          function(rej) {
            process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
          }
        );
      }
      Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
      Object.defineProperties(
        callbackified,
        getOwnPropertyDescriptors(original)
      );
      return callbackified;
    }
    exports.callbackify = callbackify;
  }
});

// node_modules/arweave/web/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/arweave/web/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b64UrlDecode = exports.b64UrlEncode = exports.bufferTob64Url = exports.bufferTob64 = exports.b64UrlToBuffer = exports.stringToB64Url = exports.stringToBuffer = exports.bufferToString = exports.b64UrlToString = exports.concatBuffers = void 0;
    var B64js = require_base64_js();
    function concatBuffers(buffers) {
      let total_length = 0;
      for (let i = 0; i < buffers.length; i++) {
        total_length += buffers[i].byteLength;
      }
      let temp = new Uint8Array(total_length);
      let offset = 0;
      temp.set(new Uint8Array(buffers[0]), offset);
      offset += buffers[0].byteLength;
      for (let i = 1; i < buffers.length; i++) {
        temp.set(new Uint8Array(buffers[i]), offset);
        offset += buffers[i].byteLength;
      }
      return temp;
    }
    exports.concatBuffers = concatBuffers;
    function b64UrlToString(b64UrlString) {
      let buffer = b64UrlToBuffer(b64UrlString);
      return bufferToString(buffer);
    }
    exports.b64UrlToString = b64UrlToString;
    function bufferToString(buffer) {
      if (typeof TextDecoder == "undefined") {
        const TextDecoder2 = require_util().TextDecoder;
        return new TextDecoder2("utf-8", { fatal: true }).decode(buffer);
      }
      return new TextDecoder("utf-8", { fatal: true }).decode(buffer);
    }
    exports.bufferToString = bufferToString;
    function stringToBuffer(string) {
      if (typeof TextEncoder == "undefined") {
        const TextEncoder2 = require_util().TextEncoder;
        return new TextEncoder2().encode(string);
      }
      return new TextEncoder().encode(string);
    }
    exports.stringToBuffer = stringToBuffer;
    function stringToB64Url(string) {
      return bufferTob64Url(stringToBuffer(string));
    }
    exports.stringToB64Url = stringToB64Url;
    function b64UrlToBuffer(b64UrlString) {
      return new Uint8Array(B64js.toByteArray(b64UrlDecode(b64UrlString)));
    }
    exports.b64UrlToBuffer = b64UrlToBuffer;
    function bufferTob64(buffer) {
      return B64js.fromByteArray(new Uint8Array(buffer));
    }
    exports.bufferTob64 = bufferTob64;
    function bufferTob64Url(buffer) {
      return b64UrlEncode(bufferTob64(buffer));
    }
    exports.bufferTob64Url = bufferTob64Url;
    function b64UrlEncode(b64UrlString) {
      return b64UrlString.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
    }
    exports.b64UrlEncode = b64UrlEncode;
    function b64UrlDecode(b64UrlString) {
      b64UrlString = b64UrlString.replace(/\-/g, "+").replace(/\_/g, "/");
      let padding;
      b64UrlString.length % 4 == 0 ? padding = 0 : padding = 4 - b64UrlString.length % 4;
      return b64UrlString.concat("=".repeat(padding));
    }
    exports.b64UrlDecode = b64UrlDecode;
  }
});

// node_modules/arweave/web/lib/crypto/webcrypto-driver.js
var require_webcrypto_driver = __commonJS({
  "node_modules/arweave/web/lib/crypto/webcrypto-driver.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArweaveUtils = require_utils2();
    var WebCryptoDriver = class {
      constructor() {
        this.keyLength = 4096;
        this.publicExponent = 65537;
        this.hashAlgorithm = "sha256";
        if (!this.detectWebCrypto()) {
          throw new Error("SubtleCrypto not available!");
        }
        this.driver = crypto.subtle;
      }
      async generateJWK() {
        let cryptoKey = await this.driver.generateKey({
          name: "RSA-PSS",
          modulusLength: 4096,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: {
            name: "SHA-256"
          }
        }, true, ["sign"]);
        let jwk = await this.driver.exportKey("jwk", cryptoKey.privateKey);
        return {
          kty: jwk.kty,
          e: jwk.e,
          n: jwk.n,
          d: jwk.d,
          p: jwk.p,
          q: jwk.q,
          dp: jwk.dp,
          dq: jwk.dq,
          qi: jwk.qi
        };
      }
      async sign(jwk, data, { saltLength } = {}) {
        let signature = await this.driver.sign({
          name: "RSA-PSS",
          saltLength: 32
        }, await this.jwkToCryptoKey(jwk), data);
        return new Uint8Array(signature);
      }
      async hash(data, algorithm = "SHA-256") {
        let digest = await this.driver.digest(algorithm, data);
        return new Uint8Array(digest);
      }
      async verify(publicModulus, data, signature) {
        const publicKey = {
          kty: "RSA",
          e: "AQAB",
          n: publicModulus
        };
        const key = await this.jwkToPublicCryptoKey(publicKey);
        const digest = await this.driver.digest("SHA-256", data);
        const salt0 = await this.driver.verify({
          name: "RSA-PSS",
          saltLength: 0
        }, key, signature, data);
        const salt32 = await this.driver.verify({
          name: "RSA-PSS",
          saltLength: 32
        }, key, signature, data);
        const saltN = await this.driver.verify({
          name: "RSA-PSS",
          saltLength: Math.ceil((key.algorithm.modulusLength - 1) / 8) - digest.byteLength - 2
        }, key, signature, data);
        return salt0 || salt32 || saltN;
      }
      async jwkToCryptoKey(jwk) {
        return this.driver.importKey("jwk", jwk, {
          name: "RSA-PSS",
          hash: {
            name: "SHA-256"
          }
        }, false, ["sign"]);
      }
      async jwkToPublicCryptoKey(publicJwk) {
        return this.driver.importKey("jwk", publicJwk, {
          name: "RSA-PSS",
          hash: {
            name: "SHA-256"
          }
        }, false, ["verify"]);
      }
      detectWebCrypto() {
        if (typeof crypto === "undefined") {
          return false;
        }
        const subtle = crypto === null || crypto === void 0 ? void 0 : crypto.subtle;
        if (subtle === void 0) {
          return false;
        }
        const names = [
          "generateKey",
          "importKey",
          "exportKey",
          "digest",
          "sign"
        ];
        return names.every((name) => typeof subtle[name] === "function");
      }
      async encrypt(data, key, salt) {
        const initialKey = await this.driver.importKey("raw", typeof key == "string" ? ArweaveUtils.stringToBuffer(key) : key, {
          name: "PBKDF2",
          length: 32
        }, false, ["deriveKey"]);
        const derivedkey = await this.driver.deriveKey({
          name: "PBKDF2",
          salt: salt ? ArweaveUtils.stringToBuffer(salt) : ArweaveUtils.stringToBuffer("salt"),
          iterations: 1e5,
          hash: "SHA-256"
        }, initialKey, {
          name: "AES-CBC",
          length: 256
        }, false, ["encrypt", "decrypt"]);
        const iv = new Uint8Array(16);
        crypto.getRandomValues(iv);
        const encryptedData = await this.driver.encrypt({
          name: "AES-CBC",
          iv
        }, derivedkey, data);
        return ArweaveUtils.concatBuffers([iv, encryptedData]);
      }
      async decrypt(encrypted, key, salt) {
        const initialKey = await this.driver.importKey("raw", typeof key == "string" ? ArweaveUtils.stringToBuffer(key) : key, {
          name: "PBKDF2",
          length: 32
        }, false, ["deriveKey"]);
        const derivedkey = await this.driver.deriveKey({
          name: "PBKDF2",
          salt: salt ? ArweaveUtils.stringToBuffer(salt) : ArweaveUtils.stringToBuffer("salt"),
          iterations: 1e5,
          hash: "SHA-256"
        }, initialKey, {
          name: "AES-CBC",
          length: 256
        }, false, ["encrypt", "decrypt"]);
        const iv = encrypted.slice(0, 16);
        const data = await this.driver.decrypt({
          name: "AES-CBC",
          iv
        }, derivedkey, encrypted.slice(16));
        return ArweaveUtils.concatBuffers([data]);
      }
    };
    exports.default = WebCryptoDriver;
  }
});

// node_modules/arweave/web/network.js
var require_network = __commonJS({
  "node_modules/arweave/web/network.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Network = class {
      constructor(api) {
        this.api = api;
      }
      getInfo() {
        return this.api.get(`info`).then((response) => {
          return response.data;
        });
      }
      getPeers() {
        return this.api.get(`peers`).then((response) => {
          return response.data;
        });
      }
    };
    exports.default = Network;
  }
});

// node_modules/arweave/web/lib/error.js
var require_error = __commonJS({
  "node_modules/arweave/web/lib/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getError = void 0;
    var ArweaveError = class extends Error {
      constructor(type3, optional = {}) {
        if (optional.message) {
          super(optional.message);
        } else {
          super();
        }
        this.type = type3;
        this.response = optional.response;
      }
      getType() {
        return this.type;
      }
    };
    exports.default = ArweaveError;
    function getError(resp) {
      let data = resp.data;
      if (typeof resp.data === "string") {
        try {
          data = JSON.parse(resp.data);
        } catch (e) {
        }
      }
      if (resp.data instanceof ArrayBuffer || resp.data instanceof Uint8Array) {
        try {
          data = JSON.parse(data.toString());
        } catch (e) {
        }
      }
      return data ? data.error || data : resp.statusText || "unknown";
    }
    exports.getError = getError;
  }
});

// node_modules/arweave/web/lib/deepHash.js
var require_deepHash = __commonJS({
  "node_modules/arweave/web/lib/deepHash.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common_1 = require_common();
    async function deepHash(data) {
      if (Array.isArray(data)) {
        const tag2 = common_1.default.utils.concatBuffers([
          common_1.default.utils.stringToBuffer("list"),
          common_1.default.utils.stringToBuffer(data.length.toString())
        ]);
        return await deepHashChunks(data, await common_1.default.crypto.hash(tag2, "SHA-384"));
      }
      const tag = common_1.default.utils.concatBuffers([
        common_1.default.utils.stringToBuffer("blob"),
        common_1.default.utils.stringToBuffer(data.byteLength.toString())
      ]);
      const taggedHash = common_1.default.utils.concatBuffers([
        await common_1.default.crypto.hash(tag, "SHA-384"),
        await common_1.default.crypto.hash(data, "SHA-384")
      ]);
      return await common_1.default.crypto.hash(taggedHash, "SHA-384");
    }
    exports.default = deepHash;
    async function deepHashChunks(chunks, acc) {
      if (chunks.length < 1) {
        return acc;
      }
      const hashPair = common_1.default.utils.concatBuffers([
        acc,
        await deepHash(chunks[0])
      ]);
      const newAcc = await common_1.default.crypto.hash(hashPair, "SHA-384");
      return await deepHashChunks(chunks.slice(1), newAcc);
    }
  }
});

// node_modules/arweave/web/lib/merkle.js
var require_merkle = __commonJS({
  "node_modules/arweave/web/lib/merkle.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.debug = exports.validatePath = exports.arrayCompare = exports.bufferToInt = exports.intToBuffer = exports.arrayFlatten = exports.generateProofs = exports.buildLayers = exports.generateTransactionChunks = exports.generateTree = exports.computeRootHash = exports.generateLeaves = exports.chunkData = exports.MIN_CHUNK_SIZE = exports.MAX_CHUNK_SIZE = void 0;
    var common_1 = require_common();
    var utils_1 = require_utils2();
    exports.MAX_CHUNK_SIZE = 256 * 1024;
    exports.MIN_CHUNK_SIZE = 32 * 1024;
    var NOTE_SIZE = 32;
    var HASH_SIZE = 32;
    async function chunkData(data) {
      let chunks = [];
      let rest = data;
      let cursor = 0;
      while (rest.byteLength >= exports.MAX_CHUNK_SIZE) {
        let chunkSize = exports.MAX_CHUNK_SIZE;
        let nextChunkSize = rest.byteLength - exports.MAX_CHUNK_SIZE;
        if (nextChunkSize > 0 && nextChunkSize < exports.MIN_CHUNK_SIZE) {
          chunkSize = Math.ceil(rest.byteLength / 2);
        }
        const chunk = rest.slice(0, chunkSize);
        const dataHash = await common_1.default.crypto.hash(chunk);
        cursor += chunk.byteLength;
        chunks.push({
          dataHash,
          minByteRange: cursor - chunk.byteLength,
          maxByteRange: cursor
        });
        rest = rest.slice(chunkSize);
      }
      chunks.push({
        dataHash: await common_1.default.crypto.hash(rest),
        minByteRange: cursor,
        maxByteRange: cursor + rest.byteLength
      });
      return chunks;
    }
    exports.chunkData = chunkData;
    async function generateLeaves(chunks) {
      return Promise.all(chunks.map(async ({ dataHash, minByteRange, maxByteRange }) => {
        return {
          type: "leaf",
          id: await hash(await Promise.all([hash(dataHash), hash(intToBuffer(maxByteRange))])),
          dataHash,
          minByteRange,
          maxByteRange
        };
      }));
    }
    exports.generateLeaves = generateLeaves;
    async function computeRootHash(data) {
      const rootNode = await generateTree(data);
      return rootNode.id;
    }
    exports.computeRootHash = computeRootHash;
    async function generateTree(data) {
      const rootNode = await buildLayers(await generateLeaves(await chunkData(data)));
      return rootNode;
    }
    exports.generateTree = generateTree;
    async function generateTransactionChunks(data) {
      const chunks = await chunkData(data);
      const leaves = await generateLeaves(chunks);
      const root = await buildLayers(leaves);
      const proofs = await generateProofs(root);
      const lastChunk = chunks.slice(-1)[0];
      if (lastChunk.maxByteRange - lastChunk.minByteRange === 0) {
        chunks.splice(chunks.length - 1, 1);
        proofs.splice(proofs.length - 1, 1);
      }
      return {
        data_root: root.id,
        chunks,
        proofs
      };
    }
    exports.generateTransactionChunks = generateTransactionChunks;
    async function buildLayers(nodes, level = 0) {
      if (nodes.length < 2) {
        const root = nodes[0];
        return root;
      }
      const nextLayer = [];
      for (let i = 0; i < nodes.length; i += 2) {
        nextLayer.push(await hashBranch(nodes[i], nodes[i + 1]));
      }
      return buildLayers(nextLayer, level + 1);
    }
    exports.buildLayers = buildLayers;
    function generateProofs(root) {
      const proofs = resolveBranchProofs(root);
      if (!Array.isArray(proofs)) {
        return [proofs];
      }
      return arrayFlatten(proofs);
    }
    exports.generateProofs = generateProofs;
    function resolveBranchProofs(node, proof = new Uint8Array(), depth = 0) {
      if (node.type == "leaf") {
        return {
          offset: node.maxByteRange - 1,
          proof: (0, utils_1.concatBuffers)([
            proof,
            node.dataHash,
            intToBuffer(node.maxByteRange)
          ])
        };
      }
      if (node.type == "branch") {
        const partialProof = (0, utils_1.concatBuffers)([
          proof,
          node.leftChild.id,
          node.rightChild.id,
          intToBuffer(node.byteRange)
        ]);
        return [
          resolveBranchProofs(node.leftChild, partialProof, depth + 1),
          resolveBranchProofs(node.rightChild, partialProof, depth + 1)
        ];
      }
      throw new Error(`Unexpected node type`);
    }
    function arrayFlatten(input) {
      const flat = [];
      input.forEach((item) => {
        if (Array.isArray(item)) {
          flat.push(...arrayFlatten(item));
        } else {
          flat.push(item);
        }
      });
      return flat;
    }
    exports.arrayFlatten = arrayFlatten;
    async function hashBranch(left, right) {
      if (!right) {
        return left;
      }
      let branch = {
        type: "branch",
        id: await hash([
          await hash(left.id),
          await hash(right.id),
          await hash(intToBuffer(left.maxByteRange))
        ]),
        byteRange: left.maxByteRange,
        maxByteRange: right.maxByteRange,
        leftChild: left,
        rightChild: right
      };
      return branch;
    }
    async function hash(data) {
      if (Array.isArray(data)) {
        data = common_1.default.utils.concatBuffers(data);
      }
      return new Uint8Array(await common_1.default.crypto.hash(data));
    }
    function intToBuffer(note) {
      const buffer = new Uint8Array(NOTE_SIZE);
      for (var i = buffer.length - 1; i >= 0; i--) {
        var byte = note % 256;
        buffer[i] = byte;
        note = (note - byte) / 256;
      }
      return buffer;
    }
    exports.intToBuffer = intToBuffer;
    function bufferToInt(buffer) {
      let value = 0;
      for (var i = 0; i < buffer.length; i++) {
        value *= 256;
        value += buffer[i];
      }
      return value;
    }
    exports.bufferToInt = bufferToInt;
    var arrayCompare = (a, b) => a.every((value, index) => b[index] === value);
    exports.arrayCompare = arrayCompare;
    async function validatePath(id, dest, leftBound, rightBound, path3) {
      if (rightBound <= 0) {
        return false;
      }
      if (dest >= rightBound) {
        return validatePath(id, 0, rightBound - 1, rightBound, path3);
      }
      if (dest < 0) {
        return validatePath(id, 0, 0, rightBound, path3);
      }
      if (path3.length == HASH_SIZE + NOTE_SIZE) {
        const pathData = path3.slice(0, HASH_SIZE);
        const endOffsetBuffer = path3.slice(pathData.length, pathData.length + NOTE_SIZE);
        const pathDataHash = await hash([
          await hash(pathData),
          await hash(endOffsetBuffer)
        ]);
        let result = (0, exports.arrayCompare)(id, pathDataHash);
        if (result) {
          return {
            offset: rightBound - 1,
            leftBound,
            rightBound,
            chunkSize: rightBound - leftBound
          };
        }
        return false;
      }
      const left = path3.slice(0, HASH_SIZE);
      const right = path3.slice(left.length, left.length + HASH_SIZE);
      const offsetBuffer = path3.slice(left.length + right.length, left.length + right.length + NOTE_SIZE);
      const offset = bufferToInt(offsetBuffer);
      const remainder = path3.slice(left.length + right.length + offsetBuffer.length);
      const pathHash = await hash([
        await hash(left),
        await hash(right),
        await hash(offsetBuffer)
      ]);
      if ((0, exports.arrayCompare)(id, pathHash)) {
        if (dest < offset) {
          return await validatePath(left, dest, leftBound, Math.min(rightBound, offset), remainder);
        }
        return await validatePath(right, dest, Math.max(leftBound, offset), rightBound, remainder);
      }
      return false;
    }
    exports.validatePath = validatePath;
    async function debug(proof, output = "") {
      if (proof.byteLength < 1) {
        return output;
      }
      const left = proof.slice(0, HASH_SIZE);
      const right = proof.slice(left.length, left.length + HASH_SIZE);
      const offsetBuffer = proof.slice(left.length + right.length, left.length + right.length + NOTE_SIZE);
      const offset = bufferToInt(offsetBuffer);
      const remainder = proof.slice(left.length + right.length + offsetBuffer.length);
      const pathHash = await hash([
        await hash(left),
        await hash(right),
        await hash(offsetBuffer)
      ]);
      const updatedOutput = `${output}
${JSON.stringify(Buffer.from(left))},${JSON.stringify(Buffer.from(right))},${offset} => ${JSON.stringify(pathHash)}`;
      return debug(remainder, updatedOutput);
    }
    exports.debug = debug;
  }
});

// node_modules/arweave/web/lib/transaction.js
var require_transaction = __commonJS({
  "node_modules/arweave/web/lib/transaction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tag = void 0;
    var ArweaveUtils = require_utils2();
    var deepHash_1 = require_deepHash();
    var merkle_1 = require_merkle();
    var BaseObject = class {
      get(field, options) {
        if (!Object.getOwnPropertyNames(this).includes(field)) {
          throw new Error(`Field "${field}" is not a property of the Arweave Transaction class.`);
        }
        if (this[field] instanceof Uint8Array) {
          if (options && options.decode && options.string) {
            return ArweaveUtils.bufferToString(this[field]);
          }
          if (options && options.decode && !options.string) {
            return this[field];
          }
          return ArweaveUtils.bufferTob64Url(this[field]);
        }
        if (options && options.decode == true) {
          if (options && options.string) {
            return ArweaveUtils.b64UrlToString(this[field]);
          }
          return ArweaveUtils.b64UrlToBuffer(this[field]);
        }
        return this[field];
      }
    };
    var Tag = class extends BaseObject {
      constructor(name, value, decode = false) {
        super();
        this.name = name;
        this.value = value;
      }
    };
    exports.Tag = Tag;
    var Transaction = class extends BaseObject {
      constructor(attributes = {}) {
        super();
        this.format = 2;
        this.id = "";
        this.last_tx = "";
        this.owner = "";
        this.tags = [];
        this.target = "";
        this.quantity = "0";
        this.data_size = "0";
        this.data = new Uint8Array();
        this.data_root = "";
        this.reward = "0";
        this.signature = "";
        Object.assign(this, attributes);
        if (typeof this.data === "string") {
          this.data = ArweaveUtils.b64UrlToBuffer(this.data);
        }
        if (attributes.tags) {
          this.tags = attributes.tags.map((tag) => {
            return new Tag(tag.name, tag.value);
          });
        }
      }
      addTag(name, value) {
        this.tags.push(new Tag(ArweaveUtils.stringToB64Url(name), ArweaveUtils.stringToB64Url(value)));
      }
      toJSON() {
        return {
          format: this.format,
          id: this.id,
          last_tx: this.last_tx,
          owner: this.owner,
          tags: this.tags,
          target: this.target,
          quantity: this.quantity,
          data: ArweaveUtils.bufferTob64Url(this.data),
          data_size: this.data_size,
          data_root: this.data_root,
          data_tree: this.data_tree,
          reward: this.reward,
          signature: this.signature
        };
      }
      setOwner(owner) {
        this.owner = owner;
      }
      setSignature({ id, owner, reward, tags, signature }) {
        this.id = id;
        this.owner = owner;
        if (reward)
          this.reward = reward;
        if (tags)
          this.tags = tags;
        this.signature = signature;
      }
      async prepareChunks(data) {
        if (!this.chunks && data.byteLength > 0) {
          this.chunks = await (0, merkle_1.generateTransactionChunks)(data);
          this.data_root = ArweaveUtils.bufferTob64Url(this.chunks.data_root);
        }
        if (!this.chunks && data.byteLength === 0) {
          this.chunks = {
            chunks: [],
            data_root: new Uint8Array(),
            proofs: []
          };
          this.data_root = "";
        }
      }
      getChunk(idx, data) {
        if (!this.chunks) {
          throw new Error(`Chunks have not been prepared`);
        }
        const proof = this.chunks.proofs[idx];
        const chunk = this.chunks.chunks[idx];
        return {
          data_root: this.data_root,
          data_size: this.data_size,
          data_path: ArweaveUtils.bufferTob64Url(proof.proof),
          offset: proof.offset.toString(),
          chunk: ArweaveUtils.bufferTob64Url(data.slice(chunk.minByteRange, chunk.maxByteRange))
        };
      }
      async getSignatureData() {
        switch (this.format) {
          case 1:
            let tags = this.tags.reduce((accumulator, tag) => {
              return ArweaveUtils.concatBuffers([
                accumulator,
                tag.get("name", { decode: true, string: false }),
                tag.get("value", { decode: true, string: false })
              ]);
            }, new Uint8Array());
            return ArweaveUtils.concatBuffers([
              this.get("owner", { decode: true, string: false }),
              this.get("target", { decode: true, string: false }),
              this.get("data", { decode: true, string: false }),
              ArweaveUtils.stringToBuffer(this.quantity),
              ArweaveUtils.stringToBuffer(this.reward),
              this.get("last_tx", { decode: true, string: false }),
              tags
            ]);
          case 2:
            if (!this.data_root) {
              await this.prepareChunks(this.data);
            }
            const tagList = this.tags.map((tag) => [
              tag.get("name", { decode: true, string: false }),
              tag.get("value", { decode: true, string: false })
            ]);
            return await (0, deepHash_1.default)([
              ArweaveUtils.stringToBuffer(this.format.toString()),
              this.get("owner", { decode: true, string: false }),
              this.get("target", { decode: true, string: false }),
              ArweaveUtils.stringToBuffer(this.quantity),
              ArweaveUtils.stringToBuffer(this.reward),
              this.get("last_tx", { decode: true, string: false }),
              tagList,
              ArweaveUtils.stringToBuffer(this.data_size),
              this.get("data_root", { decode: true, string: false })
            ]);
          default:
            throw new Error(`Unexpected transaction format: ${this.format}`);
        }
      }
    };
    exports.default = Transaction;
  }
});

// node_modules/arweave/web/lib/transaction-uploader.js
var require_transaction_uploader = __commonJS({
  "node_modules/arweave/web/lib/transaction-uploader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransactionUploader = void 0;
    var transaction_1 = require_transaction();
    var ArweaveUtils = require_utils2();
    var error_1 = require_error();
    var merkle_1 = require_merkle();
    var MAX_CHUNKS_IN_BODY = 1;
    var FATAL_CHUNK_UPLOAD_ERRORS = [
      "invalid_json",
      "chunk_too_big",
      "data_path_too_big",
      "offset_too_big",
      "data_size_too_big",
      "chunk_proof_ratio_not_attractive",
      "invalid_proof"
    ];
    var ERROR_DELAY = 1e3 * 40;
    var TransactionUploader = class {
      get isComplete() {
        return this.txPosted && this.chunkIndex === this.transaction.chunks.chunks.length;
      }
      get totalChunks() {
        return this.transaction.chunks.chunks.length;
      }
      get uploadedChunks() {
        return this.chunkIndex;
      }
      get pctComplete() {
        return Math.trunc(this.uploadedChunks / this.totalChunks * 100);
      }
      constructor(api, transaction) {
        this.api = api;
        this.chunkIndex = 0;
        this.txPosted = false;
        this.lastRequestTimeEnd = 0;
        this.totalErrors = 0;
        this.lastResponseStatus = 0;
        this.lastResponseError = "";
        if (!transaction.id) {
          throw new Error(`Transaction is not signed`);
        }
        if (!transaction.chunks) {
          throw new Error(`Transaction chunks not prepared`);
        }
        this.data = transaction.data;
        this.transaction = new transaction_1.default(Object.assign({}, transaction, { data: new Uint8Array(0) }));
      }
      async uploadChunk(chunkIndex_) {
        if (this.isComplete) {
          throw new Error(`Upload is already complete`);
        }
        if (this.lastResponseError !== "") {
          this.totalErrors++;
        } else {
          this.totalErrors = 0;
        }
        if (this.totalErrors === 100) {
          throw new Error(`Unable to complete upload: ${this.lastResponseStatus}: ${this.lastResponseError}`);
        }
        let delay = this.lastResponseError === "" ? 0 : Math.max(this.lastRequestTimeEnd + ERROR_DELAY - Date.now(), ERROR_DELAY);
        if (delay > 0) {
          delay = delay - delay * Math.random() * 0.3;
          await new Promise((res) => setTimeout(res, delay));
        }
        this.lastResponseError = "";
        if (!this.txPosted) {
          await this.postTransaction();
          return;
        }
        if (chunkIndex_) {
          this.chunkIndex = chunkIndex_;
        }
        const chunk = this.transaction.getChunk(chunkIndex_ || this.chunkIndex, this.data);
        const chunkOk = await (0, merkle_1.validatePath)(this.transaction.chunks.data_root, parseInt(chunk.offset), 0, parseInt(chunk.data_size), ArweaveUtils.b64UrlToBuffer(chunk.data_path));
        if (!chunkOk) {
          throw new Error(`Unable to validate chunk ${this.chunkIndex}`);
        }
        const resp = await this.api.post(`chunk`, this.transaction.getChunk(this.chunkIndex, this.data)).catch((e) => {
          console.error(e.message);
          return { status: -1, data: { error: e.message } };
        });
        this.lastRequestTimeEnd = Date.now();
        this.lastResponseStatus = resp.status;
        if (this.lastResponseStatus == 200) {
          this.chunkIndex++;
        } else {
          this.lastResponseError = (0, error_1.getError)(resp);
          if (FATAL_CHUNK_UPLOAD_ERRORS.includes(this.lastResponseError)) {
            throw new Error(`Fatal error uploading chunk ${this.chunkIndex}: ${this.lastResponseError}`);
          }
        }
      }
      static async fromSerialized(api, serialized, data) {
        if (!serialized || typeof serialized.chunkIndex !== "number" || typeof serialized.transaction !== "object") {
          throw new Error(`Serialized object does not match expected format.`);
        }
        var transaction = new transaction_1.default(serialized.transaction);
        if (!transaction.chunks) {
          await transaction.prepareChunks(data);
        }
        const upload = new TransactionUploader(api, transaction);
        upload.chunkIndex = serialized.chunkIndex;
        upload.lastRequestTimeEnd = serialized.lastRequestTimeEnd;
        upload.lastResponseError = serialized.lastResponseError;
        upload.lastResponseStatus = serialized.lastResponseStatus;
        upload.txPosted = serialized.txPosted;
        upload.data = data;
        if (upload.transaction.data_root !== serialized.transaction.data_root) {
          throw new Error(`Data mismatch: Uploader doesn't match provided data.`);
        }
        return upload;
      }
      static async fromTransactionId(api, id) {
        const resp = await api.get(`tx/${id}`);
        if (resp.status !== 200) {
          throw new Error(`Tx ${id} not found: ${resp.status}`);
        }
        const transaction = resp.data;
        transaction.data = new Uint8Array(0);
        const serialized = {
          txPosted: true,
          chunkIndex: 0,
          lastResponseError: "",
          lastRequestTimeEnd: 0,
          lastResponseStatus: 0,
          transaction
        };
        return serialized;
      }
      toJSON() {
        return {
          chunkIndex: this.chunkIndex,
          transaction: this.transaction,
          lastRequestTimeEnd: this.lastRequestTimeEnd,
          lastResponseStatus: this.lastResponseStatus,
          lastResponseError: this.lastResponseError,
          txPosted: this.txPosted
        };
      }
      async postTransaction() {
        const uploadInBody = this.totalChunks <= MAX_CHUNKS_IN_BODY;
        if (uploadInBody) {
          this.transaction.data = this.data;
          const resp2 = await this.api.post(`tx`, this.transaction).catch((e) => {
            console.error(e);
            return { status: -1, data: { error: e.message } };
          });
          this.lastRequestTimeEnd = Date.now();
          this.lastResponseStatus = resp2.status;
          this.transaction.data = new Uint8Array(0);
          if (resp2.status >= 200 && resp2.status < 300) {
            this.txPosted = true;
            this.chunkIndex = MAX_CHUNKS_IN_BODY;
            return;
          }
          this.lastResponseError = (0, error_1.getError)(resp2);
          throw new Error(`Unable to upload transaction: ${resp2.status}, ${this.lastResponseError}`);
        }
        const resp = await this.api.post(`tx`, this.transaction);
        this.lastRequestTimeEnd = Date.now();
        this.lastResponseStatus = resp.status;
        if (!(resp.status >= 200 && resp.status < 300)) {
          this.lastResponseError = (0, error_1.getError)(resp);
          throw new Error(`Unable to upload transaction: ${resp.status}, ${this.lastResponseError}`);
        }
        this.txPosted = true;
      }
    };
    exports.TransactionUploader = TransactionUploader;
  }
});

// node_modules/arconnect/index.js
var require_arconnect = __commonJS({
  "node_modules/arconnect/index.js"(exports, module) {
    module.exports = {};
  }
});

// node_modules/arweave/web/transactions.js
var require_transactions = __commonJS({
  "node_modules/arweave/web/transactions.js"(exports) {
    "use strict";
    var __await = exports && exports.__await || function(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    };
    var __asyncGenerator = exports && exports.__asyncGenerator || function(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i;
      function verb(n) {
        if (g[n])
          i[n] = function(v) {
            return new Promise(function(a, b) {
              q.push([n, v, a, b]) > 1 || resume(n, v);
            });
          };
      }
      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }
      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject3) : settle(q[0][2], r);
      }
      function fulfill(value) {
        resume("next", value);
      }
      function reject3(value) {
        resume("throw", value);
      }
      function settle(f, v) {
        if (f(v), q.shift(), q.length)
          resume(q[0][0], q[0][1]);
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var error_1 = require_error();
    var transaction_1 = require_transaction();
    var ArweaveUtils = require_utils2();
    var transaction_uploader_1 = require_transaction_uploader();
    require_arconnect();
    var Transactions = class {
      constructor(api, crypto2, chunks) {
        this.api = api;
        this.crypto = crypto2;
        this.chunks = chunks;
      }
      getTransactionAnchor() {
        return this.api.get(`tx_anchor`, { transformResponse: [] }).then((response) => {
          return response.data;
        });
      }
      getPrice(byteSize, targetAddress) {
        let endpoint = targetAddress ? `price/${byteSize}/${targetAddress}` : `price/${byteSize}`;
        return this.api.get(endpoint, {
          transformResponse: [
            function(data) {
              return data;
            }
          ]
        }).then((response) => {
          return response.data;
        });
      }
      async get(id) {
        const response = await this.api.get(`tx/${id}`);
        if (response.status == 200) {
          const data_size = parseInt(response.data.data_size);
          if (response.data.format >= 2 && data_size > 0 && data_size <= 1024 * 1024 * 12) {
            const data = await this.getData(id);
            return new transaction_1.default(Object.assign(Object.assign({}, response.data), { data }));
          }
          return new transaction_1.default(Object.assign(Object.assign({}, response.data), { format: response.data.format || 1 }));
        }
        if (response.status == 404) {
          throw new error_1.default("TX_NOT_FOUND");
        }
        if (response.status == 410) {
          throw new error_1.default("TX_FAILED");
        }
        throw new error_1.default("TX_INVALID");
      }
      fromRaw(attributes) {
        return new transaction_1.default(attributes);
      }
      async search(tagName, tagValue) {
        return this.api.post(`arql`, {
          op: "equals",
          expr1: tagName,
          expr2: tagValue
        }).then((response) => {
          if (!response.data) {
            return [];
          }
          return response.data;
        });
      }
      getStatus(id) {
        return this.api.get(`tx/${id}/status`).then((response) => {
          if (response.status == 200) {
            return {
              status: 200,
              confirmed: response.data
            };
          }
          return {
            status: response.status,
            confirmed: null
          };
        });
      }
      async getData(id, options) {
        let data = void 0;
        try {
          data = await this.chunks.downloadChunkedData(id);
        } catch (error) {
          console.error(`Error while trying to download chunked data for ${id}`);
          console.error(error);
        }
        if (!data) {
          console.warn(`Falling back to gateway cache for ${id}`);
          try {
            data = (await this.api.get(`/${id}`)).data;
          } catch (error) {
            console.error(`Error while trying to download contiguous data from gateway cache for ${id}`);
            console.error(error);
          }
        }
        if (!data) {
          throw new Error(`${id} was not found!`);
        }
        if (options && options.decode && !options.string) {
          return data;
        }
        if (options && options.decode && options.string) {
          return ArweaveUtils.bufferToString(data);
        }
        return ArweaveUtils.bufferTob64Url(data);
      }
      async sign(transaction, jwk, options) {
        if (!jwk && typeof arweaveWallet !== "object") {
          throw new Error(`A new Arweave transaction must provide the jwk parameter.`);
        } else if (!jwk || jwk === "use_wallet") {
          try {
            const existingPermissions = await arweaveWallet.getPermissions();
            if (!existingPermissions.includes("SIGN_TRANSACTION"))
              await arweaveWallet.connect(["SIGN_TRANSACTION"]);
          } catch (_a) {
          }
          const signedTransaction = await arweaveWallet.sign(transaction, options);
          transaction.setSignature({
            id: signedTransaction.id,
            owner: signedTransaction.owner,
            reward: signedTransaction.reward,
            tags: signedTransaction.tags,
            signature: signedTransaction.signature
          });
        } else {
          transaction.setOwner(jwk.n);
          let dataToSign = await transaction.getSignatureData();
          let rawSignature = await this.crypto.sign(jwk, dataToSign, options);
          let id = await this.crypto.hash(rawSignature);
          transaction.setSignature({
            id: ArweaveUtils.bufferTob64Url(id),
            owner: jwk.n,
            signature: ArweaveUtils.bufferTob64Url(rawSignature)
          });
        }
      }
      async verify(transaction) {
        const signaturePayload = await transaction.getSignatureData();
        const rawSignature = transaction.get("signature", {
          decode: true,
          string: false
        });
        const expectedId = ArweaveUtils.bufferTob64Url(await this.crypto.hash(rawSignature));
        if (transaction.id !== expectedId) {
          throw new Error(`Invalid transaction signature or ID! The transaction ID doesn't match the expected SHA-256 hash of the signature.`);
        }
        return this.crypto.verify(transaction.owner, signaturePayload, rawSignature);
      }
      async post(transaction) {
        if (typeof transaction === "string") {
          transaction = new transaction_1.default(JSON.parse(transaction));
        } else if (typeof transaction.readInt32BE === "function") {
          transaction = new transaction_1.default(JSON.parse(transaction.toString()));
        } else if (typeof transaction === "object" && !(transaction instanceof transaction_1.default)) {
          transaction = new transaction_1.default(transaction);
        }
        if (!(transaction instanceof transaction_1.default)) {
          throw new Error(`Must be Transaction object`);
        }
        if (!transaction.chunks) {
          await transaction.prepareChunks(transaction.data);
        }
        const uploader = await this.getUploader(transaction, transaction.data);
        try {
          while (!uploader.isComplete) {
            await uploader.uploadChunk();
          }
        } catch (e) {
          if (uploader.lastResponseStatus > 0) {
            return {
              status: uploader.lastResponseStatus,
              statusText: uploader.lastResponseError,
              data: {
                error: uploader.lastResponseError
              }
            };
          }
          throw e;
        }
        return {
          status: 200,
          statusText: "OK",
          data: {}
        };
      }
      async getUploader(upload, data) {
        let uploader;
        if (data instanceof ArrayBuffer) {
          data = new Uint8Array(data);
        }
        if (upload instanceof transaction_1.default) {
          if (!data) {
            data = upload.data;
          }
          if (!(data instanceof Uint8Array)) {
            throw new Error("Data format is invalid");
          }
          if (!upload.chunks) {
            await upload.prepareChunks(data);
          }
          uploader = new transaction_uploader_1.TransactionUploader(this.api, upload);
          if (!uploader.data || uploader.data.length === 0) {
            uploader.data = data;
          }
        } else {
          if (typeof upload === "string") {
            upload = await transaction_uploader_1.TransactionUploader.fromTransactionId(this.api, upload);
          }
          if (!data || !(data instanceof Uint8Array)) {
            throw new Error(`Must provide data when resuming upload`);
          }
          uploader = await transaction_uploader_1.TransactionUploader.fromSerialized(this.api, upload, data);
        }
        return uploader;
      }
      upload(upload, data) {
        return __asyncGenerator(this, arguments, function* upload_1() {
          const uploader = yield __await(this.getUploader(upload, data));
          while (!uploader.isComplete) {
            yield __await(uploader.uploadChunk());
            yield yield __await(uploader);
          }
          return yield __await(uploader);
        });
      }
    };
    exports.default = Transactions;
  }
});

// node_modules/arweave/web/wallets.js
var require_wallets = __commonJS({
  "node_modules/arweave/web/wallets.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArweaveUtils = require_utils2();
    require_arconnect();
    var Wallets = class {
      constructor(api, crypto2) {
        this.api = api;
        this.crypto = crypto2;
      }
      getBalance(address) {
        return this.api.get(`wallet/${address}/balance`, {
          transformResponse: [
            function(data) {
              return data;
            }
          ]
        }).then((response) => {
          return response.data;
        });
      }
      getLastTransactionID(address) {
        return this.api.get(`wallet/${address}/last_tx`).then((response) => {
          return response.data;
        });
      }
      generate() {
        return this.crypto.generateJWK();
      }
      async jwkToAddress(jwk) {
        if (!jwk || jwk === "use_wallet") {
          return this.getAddress();
        } else {
          return this.getAddress(jwk);
        }
      }
      async getAddress(jwk) {
        if (!jwk || jwk === "use_wallet") {
          try {
            await arweaveWallet.connect(["ACCESS_ADDRESS"]);
          } catch (_a) {
          }
          return arweaveWallet.getActiveAddress();
        } else {
          return this.ownerToAddress(jwk.n);
        }
      }
      async ownerToAddress(owner) {
        return ArweaveUtils.bufferTob64Url(await this.crypto.hash(ArweaveUtils.b64UrlToBuffer(owner)));
      }
    };
    exports.default = Wallets;
  }
});

// node_modules/arweave/web/silo.js
var require_silo = __commonJS({
  "node_modules/arweave/web/silo.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SiloResource = void 0;
    var ArweaveUtils = require_utils2();
    var Silo = class {
      constructor(api, crypto2, transactions) {
        this.api = api;
        this.crypto = crypto2;
        this.transactions = transactions;
      }
      async get(siloURI) {
        if (!siloURI) {
          throw new Error(`No Silo URI specified`);
        }
        const resource = await this.parseUri(siloURI);
        const ids = await this.transactions.search("Silo-Name", resource.getAccessKey());
        if (ids.length == 0) {
          throw new Error(`No data could be found for the Silo URI: ${siloURI}`);
        }
        const transaction = await this.transactions.get(ids[0]);
        if (!transaction) {
          throw new Error(`No data could be found for the Silo URI: ${siloURI}`);
        }
        const encrypted = transaction.get("data", { decode: true, string: false });
        return this.crypto.decrypt(encrypted, resource.getEncryptionKey());
      }
      async readTransactionData(transaction, siloURI) {
        if (!siloURI) {
          throw new Error(`No Silo URI specified`);
        }
        const resource = await this.parseUri(siloURI);
        const encrypted = transaction.get("data", { decode: true, string: false });
        return this.crypto.decrypt(encrypted, resource.getEncryptionKey());
      }
      async parseUri(siloURI) {
        const parsed = siloURI.match(/^([a-z0-9-_]+)\.([0-9]+)/i);
        if (!parsed) {
          throw new Error(`Invalid Silo name, must be a name in the format of [a-z0-9]+.[0-9]+, e.g. 'bubble.7'`);
        }
        const siloName = parsed[1];
        const hashIterations = Math.pow(2, parseInt(parsed[2]));
        const digest = await this.hash(ArweaveUtils.stringToBuffer(siloName), hashIterations);
        const accessKey = ArweaveUtils.bufferTob64(digest.slice(0, 15));
        const encryptionkey = await this.hash(digest.slice(16, 31), 1);
        return new SiloResource(siloURI, accessKey, encryptionkey);
      }
      async hash(input, iterations) {
        let digest = await this.crypto.hash(input);
        for (let count = 0; count < iterations - 1; count++) {
          digest = await this.crypto.hash(digest);
        }
        return digest;
      }
    };
    exports.default = Silo;
    var SiloResource = class {
      constructor(uri, accessKey, encryptionKey) {
        this.uri = uri;
        this.accessKey = accessKey;
        this.encryptionKey = encryptionKey;
      }
      getUri() {
        return this.uri;
      }
      getAccessKey() {
        return this.accessKey;
      }
      getEncryptionKey() {
        return this.encryptionKey;
      }
    };
    exports.SiloResource = SiloResource;
  }
});

// node_modules/arweave/web/chunks.js
var require_chunks = __commonJS({
  "node_modules/arweave/web/chunks.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var error_1 = require_error();
    var ArweaveUtils = require_utils2();
    var Chunks = class {
      constructor(api) {
        this.api = api;
      }
      async getTransactionOffset(id) {
        const resp = await this.api.get(`tx/${id}/offset`);
        if (resp.status === 200) {
          return resp.data;
        }
        throw new Error(`Unable to get transaction offset: ${(0, error_1.getError)(resp)}`);
      }
      async getChunk(offset) {
        const resp = await this.api.get(`chunk/${offset}`);
        if (resp.status === 200) {
          return resp.data;
        }
        throw new Error(`Unable to get chunk: ${(0, error_1.getError)(resp)}`);
      }
      async getChunkData(offset) {
        const chunk = await this.getChunk(offset);
        const buf = ArweaveUtils.b64UrlToBuffer(chunk.chunk);
        return buf;
      }
      firstChunkOffset(offsetResponse) {
        return parseInt(offsetResponse.offset) - parseInt(offsetResponse.size) + 1;
      }
      async downloadChunkedData(id) {
        const offsetResponse = await this.getTransactionOffset(id);
        const size = parseInt(offsetResponse.size);
        const endOffset = parseInt(offsetResponse.offset);
        const startOffset = endOffset - size + 1;
        const data = new Uint8Array(size);
        let byte = 0;
        while (byte < size) {
          if (this.api.config.logging) {
            console.log(`[chunk] ${byte}/${size}`);
          }
          let chunkData;
          try {
            chunkData = await this.getChunkData(startOffset + byte);
          } catch (error) {
            console.error(`[chunk] Failed to fetch chunk at offset ${startOffset + byte}`);
            console.error(`[chunk] This could indicate that the chunk wasn't uploaded or hasn't yet seeded properly to a particular gateway/node`);
          }
          if (chunkData) {
            data.set(chunkData, byte);
            byte += chunkData.length;
          } else {
            throw new Error(`Couldn't complete data download at ${byte}/${size}`);
          }
        }
        return data;
      }
    };
    exports.default = Chunks;
  }
});

// node_modules/arweave/web/blocks.js
var require_blocks = __commonJS({
  "node_modules/arweave/web/blocks.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var error_1 = require_error();
    require_arconnect();
    var Blocks = class {
      constructor(api, network) {
        this.api = api;
        this.network = network;
      }
      async get(indepHash) {
        const response = await this.api.get(`${Blocks.ENDPOINT}${indepHash}`);
        if (response.status === 200) {
          return response.data;
        } else {
          if (response.status === 404) {
            throw new error_1.default("BLOCK_NOT_FOUND");
          } else {
            throw new Error(`Error while loading block data: ${response}`);
          }
        }
      }
      async getCurrent() {
        const { current } = await this.network.getInfo();
        return await this.get(current);
      }
    };
    exports.default = Blocks;
    Blocks.ENDPOINT = "block/hash/";
  }
});

// node_modules/arweave/web/common.js
var require_common = __commonJS({
  "node_modules/arweave/web/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ar_1 = require_ar();
    var api_1 = require_api();
    var node_driver_1 = require_webcrypto_driver();
    var network_1 = require_network();
    var transactions_1 = require_transactions();
    var wallets_1 = require_wallets();
    var transaction_1 = require_transaction();
    var ArweaveUtils = require_utils2();
    var silo_1 = require_silo();
    var chunks_1 = require_chunks();
    var blocks_1 = require_blocks();
    var Arweave2 = class {
      constructor(apiConfig) {
        this.api = new api_1.default(apiConfig);
        this.wallets = new wallets_1.default(this.api, Arweave2.crypto);
        this.chunks = new chunks_1.default(this.api);
        this.transactions = new transactions_1.default(this.api, Arweave2.crypto, this.chunks);
        this.silo = new silo_1.default(this.api, this.crypto, this.transactions);
        this.network = new network_1.default(this.api);
        this.blocks = new blocks_1.default(this.api, this.network);
        this.ar = new ar_1.default();
      }
      get crypto() {
        return Arweave2.crypto;
      }
      get utils() {
        return Arweave2.utils;
      }
      getConfig() {
        return {
          api: this.api.getConfig(),
          crypto: null
        };
      }
      async createTransaction(attributes, jwk) {
        const transaction = {};
        Object.assign(transaction, attributes);
        if (!attributes.data && !(attributes.target && attributes.quantity)) {
          throw new Error(`A new Arweave transaction must have a 'data' value, or 'target' and 'quantity' values.`);
        }
        if (attributes.owner == void 0) {
          if (jwk && jwk !== "use_wallet") {
            transaction.owner = jwk.n;
          }
        }
        if (attributes.last_tx == void 0) {
          transaction.last_tx = await this.transactions.getTransactionAnchor();
        }
        if (typeof attributes.data === "string") {
          attributes.data = ArweaveUtils.stringToBuffer(attributes.data);
        }
        if (attributes.data instanceof ArrayBuffer) {
          attributes.data = new Uint8Array(attributes.data);
        }
        if (attributes.data && !(attributes.data instanceof Uint8Array)) {
          throw new Error("Expected data to be a string, Uint8Array or ArrayBuffer");
        }
        if (attributes.reward == void 0) {
          const length = attributes.data ? attributes.data.byteLength : 0;
          transaction.reward = await this.transactions.getPrice(length, transaction.target);
        }
        transaction.data_root = "";
        transaction.data_size = attributes.data ? attributes.data.byteLength.toString() : "0";
        transaction.data = attributes.data || new Uint8Array(0);
        const createdTransaction = new transaction_1.default(transaction);
        await createdTransaction.getSignatureData();
        return createdTransaction;
      }
      async createSiloTransaction(attributes, jwk, siloUri) {
        const transaction = {};
        Object.assign(transaction, attributes);
        if (!attributes.data) {
          throw new Error(`Silo transactions must have a 'data' value`);
        }
        if (!siloUri) {
          throw new Error(`No Silo URI specified.`);
        }
        if (attributes.target || attributes.quantity) {
          throw new Error(`Silo transactions can only be used for storing data, sending AR to other wallets isn't supported.`);
        }
        if (attributes.owner == void 0) {
          if (!jwk || !jwk.n) {
            throw new Error(`A new Arweave transaction must either have an 'owner' attribute, or you must provide the jwk parameter.`);
          }
          transaction.owner = jwk.n;
        }
        if (attributes.last_tx == void 0) {
          transaction.last_tx = await this.transactions.getTransactionAnchor();
        }
        const siloResource = await this.silo.parseUri(siloUri);
        if (typeof attributes.data == "string") {
          const encrypted = await this.crypto.encrypt(ArweaveUtils.stringToBuffer(attributes.data), siloResource.getEncryptionKey());
          transaction.reward = await this.transactions.getPrice(encrypted.byteLength);
          transaction.data = ArweaveUtils.bufferTob64Url(encrypted);
        }
        if (attributes.data instanceof Uint8Array) {
          const encrypted = await this.crypto.encrypt(attributes.data, siloResource.getEncryptionKey());
          transaction.reward = await this.transactions.getPrice(encrypted.byteLength);
          transaction.data = ArweaveUtils.bufferTob64Url(encrypted);
        }
        const siloTransaction = new transaction_1.default(transaction);
        siloTransaction.addTag("Silo-Name", siloResource.getAccessKey());
        siloTransaction.addTag("Silo-Version", `0.1.0`);
        return siloTransaction;
      }
      arql(query) {
        return this.api.post("/arql", query).then((response) => response.data || []);
      }
    };
    exports.default = Arweave2;
    Arweave2.crypto = new node_driver_1.default();
    Arweave2.utils = ArweaveUtils;
  }
});

// node_modules/arweave/web/index.js
var require_web = __commonJS({
  "node_modules/arweave/web/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var common_1 = require_common();
    common_1.default.init = function(apiConfig = {}) {
      function getDefaultConfig() {
        const defaults = {
          host: "arweave.net",
          port: 443,
          protocol: "https"
        };
        if (typeof location !== "object" || !location.protocol || !location.hostname) {
          return defaults;
        }
        const currentProtocol = location.protocol.replace(":", "");
        const currentHost = location.hostname;
        const currentPort = location.port ? parseInt(location.port) : currentProtocol == "https" ? 443 : 80;
        const isLocal = ["localhost", "127.0.0.1"].includes(currentHost) || currentProtocol == "file";
        if (isLocal) {
          return defaults;
        }
        return {
          host: currentHost,
          port: currentPort,
          protocol: currentProtocol
        };
      }
      const defaultConfig = getDefaultConfig();
      const protocol = apiConfig.protocol || defaultConfig.protocol;
      const host = apiConfig.host || defaultConfig.host;
      const port = apiConfig.port || defaultConfig.port;
      return new common_1.default(Object.assign(Object.assign({}, apiConfig), {
        host,
        protocol,
        port
      }));
    };
    if (typeof globalThis === "object") {
      globalThis.Arweave = common_1.default;
    } else if (typeof self === "object") {
      self.Arweave = common_1.default;
    }
    __exportStar(require_common(), exports);
    exports.default = common_1.default;
  }
});

// node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys4 = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys4.push(key);
      }
    }
    return keys4;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(issue.minimum)}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(issue.maximum)}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var overrideErrorMap = errorMap;
function setErrorMap(map3) {
  overrideErrorMap = map3;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params) => {
  const { data, path: path3, errorMaps, issueData } = params;
  const fullPath = [...path3, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map3 of maps) {
    errorMessage = map3(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: issueData.message || errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      syncPairs.push({
        key: await pair.key,
        value: await pair.value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (typeof value.value !== "undefined" || pair.alwaysSet) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== void 0 && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
var ParseInputLazyPath = class {
  constructor(parent, value, path3, key) {
    this.parent = parent;
    this.data = value;
    this._path = path3;
    this._key = key;
  }
  get path() {
    return this._path.concat(this._key);
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    const error = new ZodError(ctx.common.issues);
    return { success: false, error };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
        async: true
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  optional() {
    return ZodOptional.create(this);
  }
  nullable() {
    return ZodNullable.create(this);
  }
  nullish() {
    return this.optional().nullable();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this);
  }
  or(option) {
    return ZodUnion.create([this, option]);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming);
  }
  transform(transform) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(void 0)
    });
  }
  catch(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var datetimeRegex = (args) => {
  if (args.precision) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}:\\d{2})|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
    }
  } else if (args.precision === 0) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}:\\d{2})|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
    }
  } else {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}:\\d{2})|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
    }
  }
};
var ZodString = class extends ZodType {
  constructor() {
    super(...arguments);
    this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
    this.nonempty = (message) => this.min(1, errorUtil.errToObj(message));
    this.trim = () => new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(
        ctx2,
        {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        }
      );
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  datetime(options) {
    var _a;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  var _a;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
var ZodNumber = class extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int");
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = BigInt(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBigInt.create = (params) => {
  var _a;
  return new ZodBigInt({
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all(ctx.data.map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = ctx.data.map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
    };
  };
})(objectUtil || (objectUtil = {}));
var AugmentFactory = (def) => (augmentation) => {
  return new ZodObject({
    ...def,
    shape: () => ({
      ...def.shape(),
      ...augmentation
    })
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return ZodArray.create(deepPartialify(schema.element));
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = AugmentFactory(this._def);
    this.extend = AugmentFactory(this._def);
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys4 = util.objectKeys(shape);
    return this._cached = { shape, keys: keys4 };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip")
        ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          syncPairs.push({
            key,
            value: await pair.value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a, _b, _c, _d;
          const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).map((key) => {
      if (this.shape[key])
        shape[key] = this.shape[key];
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).map((key) => {
      if (util.objectKeys(mask).indexOf(key) === -1) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    if (mask) {
      util.objectKeys(this.shape).map((key) => {
        if (util.objectKeys(mask).indexOf(key) === -1) {
          newShape[key] = this.shape[key];
        } else {
          newShape[key] = this.shape[key].optional();
        }
      });
      return new ZodObject({
        ...this._def,
        shape: () => newShape
      });
    } else {
      for (const key in this.shape) {
        const fieldSchema = this.shape[key];
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    if (mask) {
      util.objectKeys(this.shape).map((key) => {
        if (util.objectKeys(mask).indexOf(key) === -1) {
          newShape[key] = this.shape[key];
        } else {
          const fieldSchema = this.shape[key];
          let newField = fieldSchema;
          while (newField instanceof ZodOptional) {
            newField = newField._def.innerType;
          }
          newShape[key] = newField;
        }
      });
    } else {
      for (const key in this.shape) {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type3) => {
  if (type3 instanceof ZodLazy) {
    return getDiscriminator(type3.schema);
  } else if (type3 instanceof ZodEffects) {
    return getDiscriminator(type3.innerType());
  } else if (type3 instanceof ZodLiteral) {
    return [type3.value];
  } else if (type3 instanceof ZodEnum) {
    return type3.options;
  } else if (type3 instanceof ZodNativeEnum) {
    return Object.keys(type3.enum);
  } else if (type3 instanceof ZodDefault) {
    return getDiscriminator(type3._def.innerType);
  } else if (type3 instanceof ZodUndefined) {
    return [void 0];
  } else if (type3 instanceof ZodNull) {
    return [null];
  } else {
    return null;
  }
};
var ZodDiscriminatedUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type3 of options) {
      const discriminatorValues = getDiscriminator(type3.shape[discriminator]);
      if (!discriminatorValues) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type3);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = ctx.data.map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      return OK(async (...args) => {
        const error = new ZodError([]);
        const parsedArgs = await this._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await fn(...parsedArgs);
        const parsedReturns = await this._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      return OK((...args) => {
        const parsedArgs = this._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = fn(...parsedArgs.data);
        const parsedReturns = this._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (this._def.values.indexOf(input.data) === -1) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (nativeEnumValues.indexOf(input.data) === -1) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data);
      if (ctx.common.async) {
        return Promise.resolve(processed).then((processed2) => {
          return this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
        });
      } else {
        return this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type3, params) => {
  return new ZodOptional({
    innerType: type3,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type3, params) => {
  return new ZodNullable({
    innerType: type3,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type3, params) => {
  return new ZodDefault({
    innerType: type3,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const result = this._def.innerType._parse({
      data: ctx.data,
      path: ctx.path,
      parent: ctx
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.defaultValue()
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.defaultValue()
      };
    }
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type3, params) => {
  return new ZodCatch({
    innerType: type3,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var custom = (check, params = {}, fatal) => {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      if (!check(data)) {
        const p = typeof params === "function" ? params(data) : params;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue({ code: "custom", ...p2, fatal });
      }
    });
  return ZodAny.create();
};
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params, true);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({ ...arg, coerce: true }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
var mod = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  get objectUtil() {
    return objectUtil;
  },
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// src/lib/index.js
var import_crocks = __toESM(require_crocks(), 1);

// node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}

// node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

// node_modules/ramda/es/internal/_arity.js
function _arity(n, fn) {
  switch (n) {
    case 0:
      return function() {
        return fn.apply(this, arguments);
      };
    case 1:
      return function(a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function(a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function(a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function(a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function(a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function(a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function(a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function(a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
  }
}

// node_modules/ramda/es/internal/_curryN.js
function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}

// node_modules/ramda/es/curryN.js
var curryN = /* @__PURE__ */ _curry2(function curryN2(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});
var curryN_default = curryN;

// node_modules/ramda/es/internal/_curry3.js
function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function(_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function(_c) {
          return fn(a, b, _c);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function(_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

// node_modules/ramda/es/internal/_isArray.js
var isArray_default = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};

// node_modules/ramda/es/internal/_isTransformer.js
function _isTransformer(obj) {
  return obj != null && typeof obj["@@transducer/step"] === "function";
}

// node_modules/ramda/es/internal/_dispatchable.js
function _dispatchable(methodNames, transducerCreator, fn) {
  return function() {
    if (arguments.length === 0) {
      return fn();
    }
    var obj = arguments[arguments.length - 1];
    if (!isArray_default(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === "function") {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}

// node_modules/ramda/es/internal/_reduced.js
function _reduced(x) {
  return x && x["@@transducer/reduced"] ? x : {
    "@@transducer/value": x,
    "@@transducer/reduced": true
  };
}

// node_modules/ramda/es/internal/_xfBase.js
var xfBase_default = {
  init: function() {
    return this.xf["@@transducer/init"]();
  },
  result: function(result) {
    return this.xf["@@transducer/result"](result);
  }
};

// node_modules/ramda/es/internal/_map.js
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}

// node_modules/ramda/es/internal/_isString.js
function _isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}

// node_modules/ramda/es/internal/_isArrayLike.js
var _isArrayLike = /* @__PURE__ */ _curry1(function isArrayLike(x) {
  if (isArray_default(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== "object") {
    return false;
  }
  if (_isString(x)) {
    return false;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});
var isArrayLike_default = _isArrayLike;

// node_modules/ramda/es/internal/_xwrap.js
var XWrap = /* @__PURE__ */ function() {
  function XWrap2(fn) {
    this.f = fn;
  }
  XWrap2.prototype["@@transducer/init"] = function() {
    throw new Error("init not implemented on XWrap");
  };
  XWrap2.prototype["@@transducer/result"] = function(acc) {
    return acc;
  };
  XWrap2.prototype["@@transducer/step"] = function(acc, x) {
    return this.f(acc, x);
  };
  return XWrap2;
}();
function _xwrap(fn) {
  return new XWrap(fn);
}

// node_modules/ramda/es/bind.js
var bind = /* @__PURE__ */ _curry2(function bind2(fn, thisObj) {
  return _arity(fn.length, function() {
    return fn.apply(thisObj, arguments);
  });
});
var bind_default = bind;

// node_modules/ramda/es/internal/_reduce.js
function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf["@@transducer/step"](acc, list[idx]);
    if (acc && acc["@@transducer/reduced"]) {
      acc = acc["@@transducer/value"];
      break;
    }
    idx += 1;
  }
  return xf["@@transducer/result"](acc);
}
function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf["@@transducer/step"](acc, step.value);
    if (acc && acc["@@transducer/reduced"]) {
      acc = acc["@@transducer/value"];
      break;
    }
    step = iter.next();
  }
  return xf["@@transducer/result"](acc);
}
function _methodReduce(xf, acc, obj, methodName) {
  return xf["@@transducer/result"](obj[methodName](bind_default(xf["@@transducer/step"], xf), acc));
}
var symIterator = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
function _reduce(fn, acc, list) {
  if (typeof fn === "function") {
    fn = _xwrap(fn);
  }
  if (isArrayLike_default(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list["fantasy-land/reduce"] === "function") {
    return _methodReduce(fn, acc, list, "fantasy-land/reduce");
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === "function") {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === "function") {
    return _methodReduce(fn, acc, list, "reduce");
  }
  throw new TypeError("reduce: list must be array or iterable");
}

// node_modules/ramda/es/internal/_xmap.js
var XMap = /* @__PURE__ */ function() {
  function XMap2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap2.prototype["@@transducer/init"] = xfBase_default.init;
  XMap2.prototype["@@transducer/result"] = xfBase_default.result;
  XMap2.prototype["@@transducer/step"] = function(result, input) {
    return this.xf["@@transducer/step"](result, this.f(input));
  };
  return XMap2;
}();
var _xmap = /* @__PURE__ */ _curry2(function _xmap2(f, xf) {
  return new XMap(f, xf);
});
var xmap_default = _xmap;

// node_modules/ramda/es/internal/_has.js
function _has(prop4, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop4);
}

// node_modules/ramda/es/internal/_isArguments.js
var toString = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
    return toString.call(x) === "[object Arguments]";
  } : function _isArguments2(x) {
    return _has("callee", x);
  };
}();
var isArguments_default = _isArguments;

// node_modules/ramda/es/keys.js
var hasEnumBug = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = /* @__PURE__ */ function() {
  "use strict";
  return arguments.propertyIsEnumerable("length");
}();
var contains = function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /* @__PURE__ */ _curry1(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop4, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && isArguments_default(obj);
  for (prop4 in obj) {
    if (_has(prop4, obj) && (!checkArgsLength || prop4 !== "length")) {
      ks[ks.length] = prop4;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop4 = nonEnumerableProps[nIdx];
      if (_has(prop4, obj) && !contains(ks, prop4)) {
        ks[ks.length] = prop4;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
var keys_default = keys;

// node_modules/ramda/es/map.js
var map = /* @__PURE__ */ _curry2(
  /* @__PURE__ */ _dispatchable(["fantasy-land/map", "map"], xmap_default, function map2(fn, functor) {
    switch (Object.prototype.toString.call(functor)) {
      case "[object Function]":
        return curryN_default(functor.length, function() {
          return fn.call(this, functor.apply(this, arguments));
        });
      case "[object Object]":
        return _reduce(function(acc, key) {
          acc[key] = fn(functor[key]);
          return acc;
        }, {}, keys_default(functor));
      default:
        return _map(fn, functor);
    }
  })
);
var map_default = map;

// node_modules/ramda/es/internal/_isInteger.js
var isInteger_default = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

// node_modules/ramda/es/nth.js
var nth = /* @__PURE__ */ _curry2(function nth2(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});
var nth_default = nth;

// node_modules/ramda/es/prop.js
var prop2 = /* @__PURE__ */ _curry2(function prop3(p, obj) {
  if (obj == null) {
    return;
  }
  return isInteger_default(p) ? nth_default(p, obj) : obj[p];
});
var prop_default = prop2;

// node_modules/ramda/es/pluck.js
var pluck = /* @__PURE__ */ _curry2(function pluck2(p, list) {
  return map_default(prop_default(p), list);
});
var pluck_default = pluck;

// node_modules/ramda/es/reduce.js
var reduce = /* @__PURE__ */ _curry3(_reduce);
var reduce_default = reduce;

// node_modules/ramda/es/internal/_assoc.js
function _assoc(prop4, val, obj) {
  if (isInteger_default(prop4) && isArray_default(obj)) {
    var arr = [].concat(obj);
    arr[prop4] = val;
    return arr;
  }
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop4] = val;
  return result;
}

// node_modules/ramda/es/isNil.js
var isNil = /* @__PURE__ */ _curry1(function isNil2(x) {
  return x == null;
});
var isNil_default = isNil;

// node_modules/ramda/es/assocPath.js
var assocPath = /* @__PURE__ */ _curry3(function assocPath2(path3, val, obj) {
  if (path3.length === 0) {
    return val;
  }
  var idx = path3[0];
  if (path3.length > 1) {
    var nextObj = !isNil_default(obj) && _has(idx, obj) ? obj[idx] : isInteger_default(path3[1]) ? [] : {};
    val = assocPath2(Array.prototype.slice.call(path3, 1), val, nextObj);
  }
  return _assoc(idx, val, obj);
});
var assocPath_default = assocPath;

// node_modules/ramda/es/assoc.js
var assoc = /* @__PURE__ */ _curry3(function assoc2(prop4, val, obj) {
  return assocPath_default([prop4], val, obj);
});
var assoc_default = assoc;

// node_modules/ramda/es/internal/_isFunction.js
function _isFunction(x) {
  var type3 = Object.prototype.toString.call(x);
  return type3 === "[object Function]" || type3 === "[object AsyncFunction]" || type3 === "[object GeneratorFunction]" || type3 === "[object AsyncGeneratorFunction]";
}

// node_modules/ramda/es/type.js
var type = /* @__PURE__ */ _curry1(function type2(val) {
  return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
});
var type_default = type;

// node_modules/ramda/es/internal/_pipe.js
function _pipe(f, g) {
  return function() {
    return g.call(this, f.apply(this, arguments));
  };
}

// node_modules/ramda/es/internal/_checkForMethod.js
function _checkForMethod(methodname, fn) {
  return function() {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return isArray_default(obj) || typeof obj[methodname] !== "function" ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

// node_modules/ramda/es/slice.js
var slice = /* @__PURE__ */ _curry3(
  /* @__PURE__ */ _checkForMethod("slice", function slice2(fromIndex, toIndex, list) {
    return Array.prototype.slice.call(list, fromIndex, toIndex);
  })
);
var slice_default = slice;

// node_modules/ramda/es/tail.js
var tail = /* @__PURE__ */ _curry1(
  /* @__PURE__ */ _checkForMethod(
    "tail",
    /* @__PURE__ */ slice_default(1, Infinity)
  )
);
var tail_default = tail;

// node_modules/ramda/es/pipe.js
function pipe() {
  if (arguments.length === 0) {
    throw new Error("pipe requires at least one argument");
  }
  return _arity(arguments[0].length, reduce_default(_pipe, arguments[0], tail_default(arguments)));
}

// node_modules/ramda/es/reverse.js
var reverse = /* @__PURE__ */ _curry1(function reverse2(list) {
  return _isString(list) ? list.split("").reverse().join("") : Array.prototype.slice.call(list, 0).reverse();
});
var reverse_default = reverse;

// node_modules/ramda/es/compose.js
function compose() {
  if (arguments.length === 0) {
    throw new Error("compose requires at least one argument");
  }
  return pipe.apply(this, reverse_default(arguments));
}

// node_modules/ramda/es/head.js
var head = /* @__PURE__ */ nth_default(0);
var head_default = head;

// node_modules/ramda/es/internal/_arrayFromIterator.js
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}

// node_modules/ramda/es/internal/_includesWith.js
function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}

// node_modules/ramda/es/internal/_functionName.js
function _functionName(f) {
  var match = String(f).match(/^function (\w*)/);
  return match == null ? "" : match[1];
}

// node_modules/ramda/es/internal/_objectIs.js
function _objectIs(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  } else {
    return a !== a && b !== b;
  }
}
var objectIs_default = typeof Object.is === "function" ? Object.is : _objectIs;

// node_modules/ramda/es/internal/_equals.js
function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);
  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }
  return !_includesWith(function(b2, aItem) {
    return !_includesWith(eq, aItem, b2);
  }, b, a);
}
function _equals(a, b, stackA, stackB) {
  if (objectIs_default(a, b)) {
    return true;
  }
  var typeA = type_default(a);
  if (typeA !== type_default(b)) {
    return false;
  }
  if (typeof a["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
    return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a);
  }
  if (typeof a.equals === "function" || typeof b.equals === "function") {
    return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
  }
  switch (typeA) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
        return a === b;
      }
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof a === typeof b && objectIs_default(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case "Date":
      if (!objectIs_default(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case "Error":
      return a.name === b.name && a.message === b.message;
    case "RegExp":
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }
  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }
  switch (typeA) {
    case "Map":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case "Set":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return false;
  }
  var keysA = keys_default(a);
  if (keysA.length !== keys_default(b).length) {
    return false;
  }
  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}

// node_modules/ramda/es/equals.js
var equals = /* @__PURE__ */ _curry2(function equals2(a, b) {
  return _equals(a, b, [], []);
});
var equals_default = equals;

// node_modules/ramda/es/internal/_indexOf.js
function _indexOf(list, a, idx) {
  var inf, item;
  if (typeof list.indexOf === "function") {
    switch (typeof a) {
      case "number":
        if (a === 0) {
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === "number" && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        return list.indexOf(a, idx);
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return list.indexOf(a, idx);
      case "object":
        if (a === null) {
          return list.indexOf(a, idx);
        }
    }
  }
  while (idx < list.length) {
    if (equals_default(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}

// node_modules/ramda/es/internal/_includes.js
function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

// node_modules/ramda/es/internal/_quote.js
function _quote(s) {
  var escaped = s.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

// node_modules/ramda/es/internal/_toISOString.js
var pad = function pad2(n) {
  return (n < 10 ? "0" : "") + n;
};
var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
  return d.toISOString();
} : function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};
var toISOString_default = _toISOString;

// node_modules/ramda/es/internal/_complement.js
function _complement(f) {
  return function() {
    return !f.apply(this, arguments);
  };
}

// node_modules/ramda/es/internal/_filter.js
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}

// node_modules/ramda/es/internal/_isObject.js
function _isObject(x) {
  return Object.prototype.toString.call(x) === "[object Object]";
}

// node_modules/ramda/es/internal/_xfilter.js
var XFilter = /* @__PURE__ */ function() {
  function XFilter2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter2.prototype["@@transducer/init"] = xfBase_default.init;
  XFilter2.prototype["@@transducer/result"] = xfBase_default.result;
  XFilter2.prototype["@@transducer/step"] = function(result, input) {
    return this.f(input) ? this.xf["@@transducer/step"](result, input) : result;
  };
  return XFilter2;
}();
var _xfilter = /* @__PURE__ */ _curry2(function _xfilter2(f, xf) {
  return new XFilter(f, xf);
});
var xfilter_default = _xfilter;

// node_modules/ramda/es/filter.js
var filter = /* @__PURE__ */ _curry2(
  /* @__PURE__ */ _dispatchable(["fantasy-land/filter", "filter"], xfilter_default, function(pred, filterable) {
    return _isObject(filterable) ? _reduce(function(acc, key) {
      if (pred(filterable[key])) {
        acc[key] = filterable[key];
      }
      return acc;
    }, {}, keys_default(filterable)) : _filter(pred, filterable);
  })
);
var filter_default = filter;

// node_modules/ramda/es/reject.js
var reject = /* @__PURE__ */ _curry2(function reject2(pred, filterable) {
  return filter_default(_complement(pred), filterable);
});
var reject_default = reject;

// node_modules/ramda/es/internal/_toString.js
function _toString(x, seen) {
  var recur = function recur2(y) {
    var xs = seen.concat([x]);
    return _includes(y, xs) ? "<Circular>" : _toString(y, xs);
  };
  var mapPairs = function(obj, keys4) {
    return _map(function(k) {
      return _quote(k) + ": " + recur(obj[k]);
    }, keys4.slice().sort());
  };
  switch (Object.prototype.toString.call(x)) {
    case "[object Arguments]":
      return "(function() { return arguments; }(" + _map(recur, x).join(", ") + "))";
    case "[object Array]":
      return "[" + _map(recur, x).concat(mapPairs(x, reject_default(function(k) {
        return /^\d+$/.test(k);
      }, keys_default(x)))).join(", ") + "]";
    case "[object Boolean]":
      return typeof x === "object" ? "new Boolean(" + recur(x.valueOf()) + ")" : x.toString();
    case "[object Date]":
      return "new Date(" + (isNaN(x.valueOf()) ? recur(NaN) : _quote(toISOString_default(x))) + ")";
    case "[object Null]":
      return "null";
    case "[object Number]":
      return typeof x === "object" ? "new Number(" + recur(x.valueOf()) + ")" : 1 / x === -Infinity ? "-0" : x.toString(10);
    case "[object String]":
      return typeof x === "object" ? "new String(" + recur(x.valueOf()) + ")" : _quote(x);
    case "[object Undefined]":
      return "undefined";
    default:
      if (typeof x.toString === "function") {
        var repr = x.toString();
        if (repr !== "[object Object]") {
          return repr;
        }
      }
      return "{" + mapPairs(x, keys_default(x)).join(", ") + "}";
  }
}

// node_modules/ramda/es/toString.js
var toString2 = /* @__PURE__ */ _curry1(function toString3(val) {
  return _toString(val, []);
});
var toString_default = toString2;

// node_modules/ramda/es/internal/_xfind.js
var XFind = /* @__PURE__ */ function() {
  function XFind2(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind2.prototype["@@transducer/init"] = xfBase_default.init;
  XFind2.prototype["@@transducer/result"] = function(result) {
    if (!this.found) {
      result = this.xf["@@transducer/step"](result, void 0);
    }
    return this.xf["@@transducer/result"](result);
  };
  XFind2.prototype["@@transducer/step"] = function(result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf["@@transducer/step"](result, input));
    }
    return result;
  };
  return XFind2;
}();
var _xfind = /* @__PURE__ */ _curry2(function _xfind2(f, xf) {
  return new XFind(f, xf);
});
var xfind_default = _xfind;

// node_modules/ramda/es/find.js
var find = /* @__PURE__ */ _curry2(
  /* @__PURE__ */ _dispatchable(["find"], xfind_default, function find2(fn, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      if (fn(list[idx])) {
        return list[idx];
      }
      idx += 1;
    }
  })
);
var find_default = find;

// node_modules/ramda/es/invoker.js
var invoker = /* @__PURE__ */ _curry2(function invoker2(arity, method) {
  return curryN_default(arity + 1, function() {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString_default(target) + ' does not have a method named "' + method + '"');
  });
});
var invoker_default = invoker;

// node_modules/ramda/es/join.js
var join = /* @__PURE__ */ invoker_default(1, "join");
var join_default = join;

// node_modules/ramda/es/lens.js
var lens = /* @__PURE__ */ _curry2(function lens2(getter, setter) {
  return function(toFunctorFn) {
    return function(target) {
      return map_default(function(focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});
var lens_default = lens;

// node_modules/ramda/es/paths.js
var paths = /* @__PURE__ */ _curry2(function paths2(pathsArray, obj) {
  return pathsArray.map(function(paths3) {
    var val = obj;
    var idx = 0;
    var p;
    while (idx < paths3.length) {
      if (val == null) {
        return;
      }
      p = paths3[idx];
      val = isInteger_default(p) ? nth_default(p, val) : val[p];
      idx += 1;
    }
    return val;
  });
});
var paths_default = paths;

// node_modules/ramda/es/path.js
var path = /* @__PURE__ */ _curry2(function path2(pathAr, obj) {
  return paths_default([pathAr], obj)[0];
});
var path_default = path;

// node_modules/ramda/es/lensProp.js
var lensProp = /* @__PURE__ */ _curry1(function lensProp2(k) {
  return lens_default(prop_default(k), assoc_default(k));
});
var lensProp_default = lensProp;

// node_modules/ramda/es/over.js
var Identity = function(x) {
  return {
    value: x,
    map: function(f) {
      return Identity(f(x));
    }
  };
};
var over = /* @__PURE__ */ _curry3(function over2(lens3, f, x) {
  return lens3(function(y) {
    return Identity(f(y));
  })(x).value;
});
var over_default = over;

// node_modules/ramda/es/propEq.js
var propEq = /* @__PURE__ */ _curry3(function propEq2(name, val, obj) {
  return equals_default(val, prop_default(name, obj));
});
var propEq_default = propEq;

// node_modules/ramda/es/trim.js
var hasProtoTrim = typeof String.prototype.trim === "function";

// src/lib/web-page/index.js
function web_page_default(asset) {
  const topicTags = map_default((v) => ({ name: `Topic:${v}`, value: v }), asset.topics);
  return {
    id: asset.id,
    asset: {
      data: asset.html,
      tags: [
        { name: "Content-Type", value: "text/html" },
        { name: "App-Name", value: "SmartWeaveContract" },
        { name: "Title", value: asset.title },
        { name: "Description", value: asset.description },
        { name: "Type", value: "web-page" },
        { name: "Published", value: Date.now() },
        { name: "Asset-Id", value: asset.id },
        { name: "App-Version", value: "0.3.0" },
        { name: "Contract-Src", value: asset.contractSRC },
        { name: "Page-Code", value: asset.id },
        {
          name: "Init-State",
          value: JSON.stringify({
            balances: asset.balances,
            pairs: [],
            name: "Page-" + asset.id,
            ticker: "WEB-PAGE",
            settings: [["isTradeable", true]]
          })
        },
        ...topicTags
      ]
    },
    source: {
      data: asset.content,
      tags: [
        { name: "Content-Type", value: "text/markdown" },
        { name: "App-Name", value: "Permapages" },
        { name: "Title", value: asset.title },
        { name: "Description", value: asset.description },
        { name: "Type", value: "page-source" },
        { name: "Asset-Id", value: asset.id },
        { name: "Page-Code", value: asset.id },
        ...topicTags
      ]
    }
  };
}

// src/lib/app/index.js
function app_default(asset) {
  const topicTags = map_default((v) => ({ name: `Topic:${v}`, value: v }), asset.topics);
  return {
    id: asset.id,
    asset: {
      data: asset.html,
      tags: [
        { name: "Content-Type", value: "text/html" },
        { name: "App-Name", value: "SmartWeaveContract" },
        { name: "Title", value: asset.title },
        { name: "Description", value: asset.description },
        { name: "Type", value: "app" },
        { name: "Published", value: Date.now() },
        { name: "Asset-Id", value: asset.id },
        { name: "App-Version", value: "0.3.0" },
        { name: "Contract-Src", value: asset.contractSRC },
        { name: "Page-Code", value: asset.id },
        { name: "App-Id", value: asset.appId },
        {
          name: "Init-State",
          value: JSON.stringify({
            balances: asset.balances,
            pairs: [],
            name: "App-" + asset.id,
            ticker: "APP",
            settings: [["isTradeable", true]]
          })
        },
        ...topicTags
      ]
    },
    source: {
      data: asset.content,
      tags: [
        { name: "Content-Type", value: "text/markdown" },
        { name: "App-Name", value: "AssetSDK" },
        { name: "Title", value: asset.title },
        { name: "Description", value: asset.description },
        { name: "Type", value: "source" },
        { name: "Asset-Id", value: asset.id }
      ]
    }
  };
}

// src/lib/index.js
var { ReaderT, Async } = import_crocks.default;
var { of, ask, lift } = ReaderT(Async);
var doPost = (svc, asset) => Async.of(asset).map(over_default(lensProp_default("id"), (id) => id || crypto.randomUUID())).map((asset2) => {
  if (propEq_default("type", "web-page", asset2)) {
    return web_page_default(asset2);
  } else if (propEq_default("type", "app", asset2)) {
    return app_default(asset2);
  }
}).chain(
  (asset2) => Async.fromPromise(svc.publish)(asset2).map((result) => ({ ok: true, id: asset2.id, contract: result.id }))
);
var flow = (asset) => ask((svc) => doPost(svc, asset)).chain(lift);
var CreateAsset = (asset) => flow(asset);
var GetAsset = (id, type3) => ask(
  (svc) => Async.of({ id, type: type3 }).map(({ id: id2, type: type4 }) => buildQuery(id2, type4)).chain(Async.fromPromise(svc.gql)).chain((edges) => {
    console.log(edges);
    const source = compose(
      find_default((n) => find_default((t) => t.name === "Type", n.tags).value === "source"),
      pluck_default("node")
    )(edges);
    const asset = compose(
      head_default,
      filter_default((n) => find_default((t) => t.name === "Type", n.tags).value === type3 && find_default((t) => t.name === "Uploader", n.tags) === void 0),
      pluck_default("node")
    )(edges);
    return Async.all([
      () => source ? Async.fromPromise(svc.getData)(source.id) : Promise.resolve("No Source Data..."),
      Async.fromPromise(svc.getData)(asset.id)
    ]).map(
      ([s, a]) => ({
        ...toAssetItem(asset),
        content: s.data,
        html: a.data
      })
    );
  })
).chain(lift);
function buildQuery(id, type3) {
  return {
    query: `query ($ids: [String!]!, $cursor: String, $type: String!) {
      transactions(first: 3, after: $cursor, 
        tags: [
          { name: "Type", values: [$type] },
          { name: "Asset-Id", values: $ids }
        ]) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            tags {
              name
              value
            }
          }
        }
      }
    }`,
    variables: {
      ids: [id],
      type: type3
    }
  };
}
function toAssetItem(node) {
  const getTag = compose(prop("value"), (n) => find_default(propEq_default("name", n), node.tags));
  const published = getTag("Published") ? Number(getTag("Published")) : Date.now();
  const topics = join_default(", ", pluck_default("value", filter_default((t) => /^Topic:/.test(t.name), node.tags)));
  return {
    id: getTag("Asset-Id"),
    type: getTag("Type"),
    title: getTag("Title"),
    description: getTag("Description"),
    transaction: node.id,
    published,
    stamps: 0,
    topics
  };
}

// src/services/asset-svc.js
var import_arweave = __toESM(require_web(), 1);
function asset_svc_default(env) {
  const ARWEAVE_URL = `${env.arweaveInfo.protocol}://${env.arweaveInfo.host}:${env.arweaveInfo.port}`;
  const URL2 = `${env.warpGateway}/gateway/contracts/deploy`;
  const arweave = import_arweave.default.default.init(env.arweaveInfo);
  const getData = (id) => arweave.api.get(id);
  const publish = (asset) => {
    return dispatch(asset.source).then(() => dispatch(asset.asset)).then(({ id }) => post({ id, ...asset.asset }));
  };
  async function dispatch({ data, tags }) {
    if (!arweaveWallet) {
      return Promise.reject("No wallet found");
    }
    const tx = await arweave.createTransaction({ data });
    map_default((t) => tx.addTag(t.name, t.value), tags);
    const result = await arweaveWallet.dispatch(tx);
    return { data, tags, id: result.id };
  }
  async function post({ data, tags, id }) {
    if (!fetch) {
      return Promise.reject("fetch is required!");
    }
    const tx = await arweave.createTransaction({ data });
    map_default((t) => tx.addTag(t.name, t.value), tags);
    await arweave.transactions.sign(tx, env.wallet);
    tx.id = id;
    const res = await fetch(URL2, {
      method: "POST",
      body: JSON.stringify({ contractTx: tx }),
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then((res2) => res2.ok ? res2.json() : Promise.reject(res2));
    return { id, ...res };
  }
  function run({ query, variables }) {
    return fetch(`${ARWEAVE_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, variables })
    }).then((res) => res.ok ? res.json() : Promise.reject(res));
  }
  async function gql(q) {
    let hasNextPage = true;
    let edges = [];
    let cursor = "";
    while (hasNextPage) {
      const result = await run({ query: q.query, variables: { ...q.variables, cursor } }).then(path_default(["data", "transactions"]));
      if (result.edges && result.edges.length) {
        edges = edges.concat(result.edges);
        cursor = result.edges[result.edges.length - 1].cursor;
      }
      hasNextPage = result.pageInfo.hasNextPage;
    }
    return edges;
  }
  return {
    publish,
    getData,
    gql
  };
}

// src/index.js
var TradeableAsset = mod.object({
  id: mod.string().optional(),
  title: mod.string().min(3).max(180),
  description: mod.string().max(300),
  type: mod.string(),
  topics: mod.array(mod.string()),
  balances: mod.record(mod.string(), mod.number()),
  content: mod.string().optional(),
  html: mod.string().optional(),
  forks: mod.string().optional(),
  appId: mod.string().optional()
});
var src_default = Object.freeze({
  init: (env) => {
    const svc = asset_svc_default(env);
    return Object.freeze({
      create: async (asset) => {
        TradeableAsset.parse(asset);
        return CreateAsset(
          assoc_default("contractSRC", env.assetContractSrc, asset)
        ).runWith(svc).toPromise();
      },
      get: async (id, type3) => {
        return GetAsset(id, type3).runWith(svc).toPromise();
      }
    });
  }
});
export {
  src_default as default
};
