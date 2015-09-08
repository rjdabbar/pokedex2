Pokedex.Views.PokemonIndex = Backbone.View.extend({
  initialize: function(){
    this.collection = new Pokedex.Collections.Pokemon();
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPokemonToList);
  },

  events: {
    "click li": 'selectPokemonFromList'
  },

  render: function(){
    this.$el.empty();
    this.collection.each(this.addPokemonToList.bind(this));
  },

  addPokemonToList: function (pokemon) {
    this.$el.append(JST["pokemonListItem"]({pokemon: pokemon}));
  },

  refreshPokemon: function (showPokemon) {
    this.collection.fetch({
      success: function(model, response, options){
        if (showPokemon) {
          showPokemon();
        };
      }
    });
  },

  selectPokemonFromList: function(e){
    var id = $(e.currentTarget).data('id');
    var url = "pokemon/" + id;
    Backbone.history.navigate(url, {trigger: true});
    
  }
})
