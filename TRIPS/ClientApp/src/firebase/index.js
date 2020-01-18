import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    //"Enter your filebase configuration here from the private key you have download from firebase"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
  


export {
    storage, firebase as default 
}