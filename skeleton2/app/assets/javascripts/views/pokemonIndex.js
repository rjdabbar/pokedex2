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

  refreshPokemon: function () {
    this.collection.fetch();
  },

  selectPokemonFromList: function(e){
    var id = $(e.currentTarget).data('id');
    var poke = this.collection.get(id);
    var $el = $("#pokedex .pokemon-detail");
    var detailView = new Pokedex.Views.PokemonDetail({model: poke, el: $el});
    // this.renderPokemonDetail(poke);
    // detailView.render();
    poke.fetch()
  }
})
