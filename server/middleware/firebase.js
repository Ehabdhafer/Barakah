const admin = require("firebase-admin");

const serviceAccount = require("../json firebase/barakah-f6a23-firebase-adminsdk-msg3r-4f210aaa3d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://barakah-f6a23.appspot.com",
});

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = { bucket };
