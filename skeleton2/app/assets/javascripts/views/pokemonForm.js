Pokedex.Views.PokemonForm = Backbone.View.extend({
  template: JST['pokemonForm'],
  render: function() {
    var content = this.template({pokemon: this.model});
    this.$el.html(content);
    return this;
  },
  events: {
    "submit form": "savePokemon"
  },
  savePokemon: function(e){
    e.preventDefault();
    var pokemonJSON = $(e.currentTarget).serializeJSON();

    this.model.set(pokemonJSON.pokemon);
    this.model.save({},{
      success: function(model, response, options){
        this.collection.add(model);
        var url = "pokemon/" + model.id;
        Backbone.history.navigate(url, {trigger: true});
        this.render();
      }.bind(this)
    });
  }
});
