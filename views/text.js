

// var Nexmo = require('nexmo');

// var nexmo = new Nexmo({
//     apiKey: 114585e8,
//     apiSecret: 00ba2e565ebb5350
//     //applicationId: APP_ID,
//     //privateKey: PRIVATE_KEY_PATH,
//   });

// nexmo.message.sendSms(
//   YOUR_VIRTUAL_NUMBER, '16023804488', 'yo',
//     (err, responseData) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.dir(responseData);
//       }
//     }
//  );

// curl -X "POST" "https://rest.nexmo.com/sms/json" \
//   -d "from=Nexmo" \
//   -d "text=A text message sent using the Nexmo SMS API" \
//   -d "to=TO_NUMBER" \
//   -d "api_key=API_KEY" \
//   -d "api_secret=API_SECRET"

//need to npm install text-magic-rest-client

var TMClient = require('textmagic-rest-client');
  
var c = new TMClient('tarminsidharta', '2gifxFVdkChHlkFBHsMNctS9ZeI8ho');
c.Messages.send({text: 'Your table is ready..John', phones:'14803885693'}, function(err, res){
    console.log('Messages.send()', err, res);
});

module.exports = TMClient;
