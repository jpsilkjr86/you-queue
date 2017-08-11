
var TMClient = require('textmagic-rest-client');
  
var c = new TMClient('tarminsidharta', '2gifxFVdkChHlkFBHsMNctS9ZeI8ho');
c.Messages.send({text: 'Your table is ready..John', phones:'14803885693'}, function(err, res){
    console.log('Messages.send()', err, res);
});

module.exports = TMClient;
