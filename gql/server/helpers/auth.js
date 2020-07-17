var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //   databaseURL: "https://gqlreactnode-7117b.firebaseio.com",
});

exports.authCheck = async (req) => {
  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    console.log("CURRENT USER", currentUser);
  } catch (error) {
    console.error("Authcheck Error", error);
    throw new Error("INVALID OR EXPIRED TOKEN", error);
  }
};
