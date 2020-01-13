var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BMJNphtc0AQi8BnU5bQInauXv6wuv8jZRtA3eL9vHLtsMMTzM9Iu4Fa8oYGEB5gvbB8g_nC60JA5peeS3P__sO0",
   "privateKey": "G8agsZP5EnU5dmFZaAy_Pww7L-LPgwtKvPIXkD9BOso"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ecBsXs9SpT4:APA91bHCYbqt_Xc2xUnxyR5xqEerTee-UpXDHkE14fTE9KI5DYKYBsVySR4CRFEOmP218RGyvQBqUcnboFYvcVBB8d1I02xk9RHu6nJGb67bIsxiuzIUPb0Tgbx3rmpxeuhZKUuq72tx",
   "keys": {
   "p256dh": "BCykbNnmFHSr3Fs40lZc9/aVXU8F9OT0fnuxrKW5OEPWPLwi5o+p7owqn2BJFRQc81mukzl7be8NuKNnuusu2vg=",
   "auth": "Ba+pXbTMSV+9oTxW1UvQKw=="
   }
};
var payload = 'Selamat datang di PeeL';
 
var options = {
   gcmAPIKey: '9779228139',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);