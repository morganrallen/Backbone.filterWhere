# Backbone.filterWhere

Backbone.filterWhere adds a new method to Backbone.Collections.

Backbone.Collections#filterWhere acts like Backbone.Collections#where expect it returns
a new collection that is constantely synced to the original collection it was filtered
from.

[![build status](https://secure.travis-ci.org/morganrallen/Backbone.filterWhere)](http://travis-ci.org/morganrallen/Backbone.filterWhere)

# Example

```js
var things = new Backbone.Collection([{
  name: "Fry",
  species: "Human"
}, {
  name: "Bender",
  species: "Robot"
}, {
  name: "Clamps",
  species: "Robot"
}]);

var humans = things.filterWhere({species: "Human"});
var robots = things.filterWhere({species: "Robot"});

console.log("Current humans: " + humans.length);
console.log("Current robots: " + robots.length);

things.add([ { name: "Lela", species: "Human" } ]);

console.log("Current humans: " + humans.length);
console.log("Current robots: " + robots.length);
```
