(function() {
  var root = this;
  var _ = root._;
  var Backbone = root.Backbone;

  if(!_ && (typeof require !== "undefined")) _ = require("underscore");
  if(!Backbone && (typeof require !== "undefined")) Backbone = require("backbone");

  _.extend(Backbone.Collection.prototype, {
    filterWhere: function(where) {
      var c = new this.constructor(this.where(where), this.options || {});
      c._filter = where;

      this.on("add", _.bind(this._onParentAdd, c));
      this.on("remove", _.bind(this._onParentRemove, c));

      return c;
    },

    _onParentAdd: function(model, collection, options) {
      this.add(_.where([model.attributes], this._filter), options);
    },

    _onParentRemove: function(model, collection, options) {
      this.remove(model);
    }
  });

  if(typeof module !== "undefined") {
    module.exports = Backbone;
  };
}).call(this);
