const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: YOUR_API_KEY,
  apiSecret: YOUR_API_SECRET
});


nexmo.message.sendSms(
  YOUR_VIRTUAL_NUMBER, '15105551234', 'yo',
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    }
 );