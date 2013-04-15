var tape = this.tape;
var _ = this._;
var Backbone = this.Backbone;

if(!tape && (typeof require !== "undefined")) tape = require("tape");
if(!_ && (typeof require !== "undefined")) _ = require("underscore");
if(!Backbone && (typeof require !== "undefined")) Backbone = require("./");

var planetExpressConfig = {
  location: "New New York",
  ship: "Planet Express Ship"
};

var planetExpressMembers = [ "Fry", "Lela", "Zoidberg" ];

var DOOPConfig = {
  location: "New New Jersey"
};

var DOOPMembers = [ "Zaap", "Kif", "Hugh Man" ];

var members = [];

_(planetExpressMembers).forEach(function(member) {
  members.push(_.extend({}, planetExpressConfig, { name: member }));
});

_(DOOPMembers).forEach(function(member) {
  members.push(_.extend({}, DOOPConfig, { name: member }));
});

var c = new Backbone.Collection(members);

tape("Check main Collection", function(t) {
  t.ok(c.filterWhere);
  t.equal(c.length, 6, "members.length");
  t.end();
});

var planetExpress = c.filterWhere({ ship: planetExpressConfig.ship });

tape("Create filter", function(t) {
  t.equal(planetExpress.length, 3, "planetExpress.length");

  t.end();
});

tape("Add filterable item to main Collection", function(t) {
  c.add([
    _.extend({}, planetExpressConfig, { name: "Bender" })
  ]);

  console.log(c.length);

  t.equal(c.length, 7, "members.length");
  t.equal(planetExpress.length, 4, "planetExpress.length");

  t.end();
});

tape("Remove filterable item from main Collection", function(t) {
  c.remove(c.at(0));

  t.equal(c.length, 6, "members.length");
  t.equal(planetExpress.length, 3, "planetExpress.length");
});
