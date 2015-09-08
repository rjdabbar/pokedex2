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

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.toys = this.model.toys();
  }
});
