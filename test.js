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
  t.plan(2);
  t.ok(c.filterWhere);
  t.equal(c.length, 6, "members.length");
});

var planetExpress = c.filterWhere({ ship: planetExpressConfig.ship });

tape("Create filter", function(t) {
  t.plan(1);
  t.equal(planetExpress.length, 3, "planetExpress.length");
});

tape("Same models exist in both collections", function(t) {
  t.plan(1);
  t.equal(planetExpress.models[0].cid, c.models[0].cid);
});

tape("Add filterable item to main Collection", function(t) {
  t.plan(2);

  c.add([
    _.extend({}, planetExpressConfig, { name: "Bender" })
  ]);

  t.equal(c.length, 7, "members.length");
  t.equal(planetExpress.length, 4, "planetExpress.length");
});

tape("Remove filterable item from main Collection", function(t) {
  t.plan(2);
  c.remove(c.at(0));

  t.equal(c.length, 6, "members.length");
  t.equal(planetExpress.length, 3, "planetExpress.length");
});

tape("Add item to filtered Collection", function(t) {
  t.plan(2);

  planetExpress.add({
    name: "Bubblegum Tate",
    ship: "Basket Ball Ship"
  });

  t.equal(c.length, 7, "members.length");
  t.equal(planetExpress.length, 4, "planetExpress.length");
});

tape("Remove from main Collection via filtered", function(t) {
  t.plan(2);
  planetExpress.remove(planetExpress.at(0));

  t.equal(c.length, 6, "members.length");
  t.equal(planetExpress.length, 3, "planetExpress.length");
});
