
var TMClient = require('textmagic-rest-client');
  
var youQueueSMS = new TMClient('tarminsidharta', '2gifxFVdkChHlkFBHsMNctS9ZeI8ho');

//Example text message

// youQueueAlert.Messages.send({text: 'Your table is ready..John', phones:'14803885693'}, function(err, res){
//     console.log('Messages.send()', err, res);
// });

module.exports = youQueueSMS;
