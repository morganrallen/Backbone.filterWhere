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

      c.on("add", _.bind(this._onAdd, this));
      c.on("remove", _.bind(this._onParentRemove, this));

      return c;
    },

    _onAdd: function(model, collection, options) {
      this.add(model, options);
    },

    _onParentAdd: function(model, collection, options) {
      if(_.where([model.attributes], this._filter).length > 0) {
        this.add(model, options);
      }
    },

    _onParentRemove: function(model, collection, options) {
      this.remove(model);
    }
  });

  if(typeof module !== "undefined") {
    module.exports = Backbone;
  }
}).call(this);
