Pokedex.Views.PokemonDetail = Backbone.View.extend({
  template: JST['pokemonDetail'],
  render: function () {
    var content = this.template({pokemon: this.model});
    this.$el.html(content);
    this.toys.each(function(toy){
      this.$el.append(JST["toyListItem"]({toy: toy}));
    }.bind(this))
    return this;
  },

  events: {
    "click li": "selectToyFromList"
  },

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", options.callback);
    this.model.fetch();
    this.toys = this.model.toys();

  },

  selectToyFromList: function(e) {
    var toyId = $(e.currentTarget).data('toy-id');
    var pokemonId = $(e.currentTarget).data('pokemon-id');
    var toy = this.toys.get(toyId);
    var $el = $("#pokedex .toy-detail");

    var url = "/pokemon/" + pokemonId + "/toys/" + toyId;
    Backbone.history.navigate(url, {trigger: true});
  }
});
