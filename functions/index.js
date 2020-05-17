const functions = require('firebase-functions');
const admin = require('firebase-admin');
const createUser = require('./src/createUser');
const sendOTP = require('./src/sendOTP');
const confirmOTP = require('./src/confirmOTP');
const getUserInfo = require('./src/getUserInfo');
const validateFirebaseIdToken = require('./src/validateFirebaseIdToken');
const express = require('express');
const cors = require('cors')({ origin: true });
const app = express();
const securedRouter = express.Router();


var serviceAccount = require("./fir-rnhandson-firebase-admin-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fir-rnhandson.firebaseio.com"
    // databaseURL: "http://localhost:9000"
});

app.use(cors);
securedRouter.use(validateFirebaseIdToken);

securedRouter.get('/get_user_info', getUserInfo);

app.post('/create_user',createUser);
app.post('/send_otp',sendOTP);
app.post('/confirm_otp',confirmOTP);


app.use('/secured', securedRouter, (req, res) => {
    res.sendStatus(401)
});

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.app = functions.https.onRequest(app);
