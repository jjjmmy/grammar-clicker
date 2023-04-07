const firebase = require('firebase');

const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID 
}

class BaseStore {
  constructor(props) {
    // workaround to prevent initializing multiple times
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
      // firebase.firestore.setLogLevel('debug');
    }

    this.firestore = firebase.firestore();
    this.auth = firebase.auth();
  }
}

export default BaseStore;
