if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function() {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function() {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });

  Deps.autorun(function() {
    // if metrika hasnt loaded yet it will execute this after loading
    Metrika.hit(location.href, document.title, document.referrer);
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}