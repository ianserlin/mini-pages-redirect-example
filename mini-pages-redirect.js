var Documents = new Meteor.Collection('documents');

function checkOwnership(){
  // simple check here just to illustrate the behavior
  if(Documents.find({}).count() == 0){
    this.redirect(Meteor.homePath());
  }
}

if (Meteor.isClient) {
  Meteor.pages({
    '/': { to: 'home' }
    , '/dashboard': { to: 'dashboard', before: [checkOwnership] }
  });

  Meteor.subscribe('allDocuments');
}

function seed(){
  if(Documents.find({}).count() == 0){
    Documents.insert({ title: 'Bill Nye the Science Guy' });
  }
}

if (Meteor.isServer) {
  Meteor.publish('allDocuments', function(){
    return Documents.find({});
  });

  Meteor.startup(function () {
    seed();
  });
}
