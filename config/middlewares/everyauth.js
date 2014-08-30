'use strict';

var everyauth = require('everyauth');

module.exports = function(app){

  everyauth.everymodule.findUserById( function (userId, callback) {
    console.log(userId);
    User.findById(userId, callback);
    // callback has the signature, function (err, user) {...}
  });


  everyauth.facebook.appId('135177736657394').appSecret('970715de4c99ee9cbd93dcc9a537487d')
  .handleAuthCallbackError( function (req, res){
    res.serverError('Error with Facebook credentials , please try again.');
  }).findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
    
    var promise = this.Promise();
    User.find({id : fbUserMetadata.id }).exec(function(err,data){
      if(err) return promise.fail(err);

      if(data && data.length > 0){
        var user = {
          id : fbUserMetadata.id,
          fullname: fbUserMetadata.name,
          profile: fbUserMetadata
        };
        User.create(user,function(err,data){
          if(err) return promise.fail(err);
          return promise.fulfill(user);
        });
      }else{
        return promise.fulfill(data);
      }
      
    });
    return promise;
  }).redirectPath('/vi/dashboard')
  .entryPath('/vi/auth/facebook')
  .callbackPath('/vi/auth/facebook/callback')
  .scope('email')                       
  .fields('id,name,email,picture');


  app.use(everyauth.middleware());
}