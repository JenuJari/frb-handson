const firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = require('./../firebase.client.config.json');

firebase.initializeApp(firebaseConfig);

module.exports = async function (req, res, next) {

  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(403).send('Unauthorized');
  }


  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  }

  try {
    const decodedIdToken = await firebase.auth().signInWithCustomToken(idToken);
    req.auth = decodedIdToken;
    return next();
  } catch (error) {
    return res.status(403).send('Unauthorized');
  }
}