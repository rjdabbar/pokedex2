Pokedex.Routers.Router = Backbone.Router.extend({
  intialize: function (options) {

  },

  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetailShow",
    "pokemon/:pokemonId/toys/:toyId": "toyDetailShow"
  },

  pokemonIndex: function(callback) {
    var pokemonIndex = new Pokedex.Views.PokemonIndex();
    pokemonIndex.refreshPokemon(callback);
    $("#pokedex .pokemon-list").html(pokemonIndex.$el);
    this._pokemonIndex = pokemonIndex;
    this.pokemonForm();
  },

  pokemonDetailShow: function(id, callback){
    if(!this._pokemonIndex){
      this.pokemonIndex(this.pokemonDetailShow.bind(this, id));
      return;
    };
    var poke = this._pokemonIndex.collection.get(id);
    var $el = $("#pokedex .pokemon-detail");
    $("#pokedex .toy-detail").empty();
    var detailView = new Pokedex.Views.PokemonDetail({model: poke, el: $el, callback: callback});
    this._pokemonDetail = detailView;
    detailView.render();
  },

  toyDetailShow: function(pokemonId, toyId){
    if(!this._pokemonDetail){
      this.pokemonDetailShow(pokemonId,
        this.toyDetailShow.bind(this, pokemonId, toyId));
      return;
    };
    var toy = this._pokemonDetail.model.toys().get(toyId);
    var $el = $("#pokedex .toy-detail");
    var toyDetailView = new Pokedex.Views.ToyDetail({model: toy, el: $el, collection: this._pokemonIndex.collection});
    toyDetailView.render();
  },

  pokemonForm: function() {
    var newPokemon = new Pokedex.Models.Pokemon();
    var formView = new Pokedex.Views.PokemonForm({model: newPokemon, collection: this._pokemonIndex.collection});
    formView.render();
    $('#pokedex .pokemon-form').html(formView.$el);
  }
});
