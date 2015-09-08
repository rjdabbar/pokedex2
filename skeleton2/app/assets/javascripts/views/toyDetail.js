Pokedex.Views.ToyDetail = Backbone.View.extend({
  template: JST["toyDetail"],
  render: function() {
    console.log("render");
    var content = this.template({toy: this.model, pokemon: this.collection});
    this.$el.html(content);
    return this;
  },

  events: {
    "change select": "changeToyOwner"
  },

  initialize: function() {
    console.log(this.$el);
  },

  changeToyOwner: function(e) {
    e.preventDefault();
    var newPokeId = $(e.currentTarget).find(":selected").data("pokemon-id");
    var newPoke = this.collection.get(newPokeId);
    var toy = this.model
    var oldPoke = this.collection.get(toy.get("pokemon_id"));
    toy.set({pokemon_id: newPoke.id});
    toy.save({}, {
      success: function(model, response, options) {
        oldPoke.toys().remove(toy);
        var url = "pokemon/" + oldPoke.id
        Backbone.history.navigate(url, {trigger: true});
        // this.render();
      }.bind(this)
    })

  }
});
