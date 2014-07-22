Metrika: Reactive Yandex Metrika wrapper for Meteor
===================================

This package is influenced by GAnalytics, but it's actually quite different

### Installing

```
mrt add metrika
```

If you don't have a settings.json file, you need to add one and load it according to the Meteor documentation. http://docs.meteor.com/#meteor_settings

In settings.json add
```json
{
  "public" : {
    "yandex": {
      "id":"XXXXXXX"
    }
  }
}
```
### Usage

Usage is just like http://help.yandex.com/metrica/code/ajax-flash.xml

You should just replace yaCounterXXXXXX with `Metrika`. Beware that if you call any method before metrika loads that method will be called right after initialization if you're in a reactive context.