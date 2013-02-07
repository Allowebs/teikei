Teikei.module("User", function(User, App, Backbone, Marionette, $, _) {

  User.MenuView = Marionette.View.extend({

    el: "#user",

    ui: {
      toggle: "#login",
    },

    events: {
      "click #login": "toggleAuth"
    },

    initialize: function(controller) {
      this.bindUIElements();
      this.controller = controller;
      App.vent.on("user:login:success", this.onLogin, this);
      App.vent.on("user:logout:success", this.onLogout, this);
    },

    toggleAuth: function(event) {
      event.preventDefault();
      var loggedIn = this.model.get("loggedIn");
      if (!loggedIn) {
        this.controller.loginPopup()
      }
      else {
        this.controller.logout()
      }
    },

    onLogin: function() {
      this.ui.toggle.text("Abmelden")
    },

    onLogout: function() {
      this.ui.toggle.text("Anmelden")
    }
  });
});
