

var Nexmo = require('nexmo');

var nexmo = new Nexmo({
    apiKey: 114585e8
    apiSecret: 00ba2e565ebb5350
    applicationId: APP_ID,
    privateKey: PRIVATE_KEY_PATH,
  }, options);



curl -X "POST" "https://rest.nexmo.com/sms/json" \
  -d "from=Nexmo" \
  -d "text=A text message sent using the Nexmo SMS API" \
  -d "to=TO_NUMBER" \
  -d "api_key=API_KEY" \
  -d "api_secret=API_SECRET"