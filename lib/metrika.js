Metrika = {};

Metrika._inited = false;
Metrika._dep = new Deps.Dependency();

Metrika.setCounter = function(counter) {
  this._inited = true;
  this._counter = counter;

  this._dep.changed();
};

var methods = [
  "_performanceTiming",
  "accurateTrackBounce",
  "addFileExtension",
  "clickmap",
  "enableAll",
  "extLink",
  "file",
  "hit",
  "notBounce",
  "params",
  "reachGoal",
  "replacePhones",
  "social",
  "trackHash",
  "trackLinks",
  "uploadPage",
  "video"
];
Metrika._delegate = function(methodName) {
  return function( /* same as delegated method */ ) {
    this._dep.depend();

    if (!this._inited || !this._counter) {
      console.log("Yandex Metrika not loaded yet, this method will be called again if you're in a reactive context");
      return;
    }

    var fn = this._counter[methodName];

    if (!_.isFunction(fn)) {
      console.log('Couldnt find method named ' + methodName);
      return;
    }

    return fn.apply(this._counter, arguments);
  };
};

_.each(methods, function(methodName) {
  Metrika[methodName] = Metrika._delegate(methodName);
});

var getSettings = function() {
  var isYandexSet = Meteor.settings && Meteor.settings.public !== undefined && Meteor.settings.public.yandex !== undefined && Meteor.settings.public.yandex.id !== undefined;

  return isYandexSet && Meteor.settings.public.yandex;
}

var getId = function() {
  var settings = getSettings();

  return settings && settings.id;
}

var load = function(d, w, c, yandexId) {
  var n = d.getElementsByTagName("script")[0],
    s = d.createElement("script"),
    f = function() {
      n.parentNode.insertBefore(s, n);
    };
  s.type = "text/javascript";
  s.async = true;
  s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

  if (w.opera == "[object Opera]") {
    d.addEventListener("DOMContentLoaded", f, false);
  } else {
    f();
  }
};

var settings = getSettings();

if (settings) {
  var cb_str = 'yandex_metrika_callbacks';

  var callbacks = (window[cb_str] = window[cb_str] || []);
  callbacks.push(function() {
    try {
      Metrika.setCounter(new Ya.Metrika({
        id: settings.id,
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true
      }));
    } catch (e) {}
  });

  load(document, window, "yandex_metrika_callbacks", settings.id);


} else {
  console.log("Yandex Metrika id has not been set in your settings.json file.");
}