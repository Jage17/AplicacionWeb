  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBx44EiFOpbDrllfz7vPZUCKpAolehgyiA",
    authDomain: "jugadores-3b638.firebaseapp.com",
    databaseURL: "https://jugadores-3b638.firebaseio.com",
    storageBucket: "jugadores-3b638.appspot.com",
    messagingSenderId: "133456905178"
  };
  firebase.initializeApp(config);
 

 function IngresoGoogle(){
 	if (!firebase.auth().currentUser){

 		var provider = new firebase.auth.GoogleAuthProvider();

 		provider.addScope('https://www.googleapis.com/auth/plus.login');

 		firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  
  console.log(user)

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  
  if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('El usuario ya se ha registrado');
            } else {
            console.error(error);
          }
    });
   } else {
       firebase.auth().signOut().then(function() {
       // Sign-out successful.
          }, function(error) {
       // An error happened.
     });
    }
   }

   function IngresoFacebook(){
 	if (!firebase.auth().currentUser){

 		var provider = new firebase.auth.FacebookAuthProvider();

 		provider.addScope('public_profile');

 		firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  
  console.log(user)

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  
  if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('El usuario ya se ha registrado');
            } else {
            console.error(error);
          }
    });
   } else {
       firebase.auth().signOut().then(function() {
       // Sign-out successful.
          }, function(error) {
       // An error happened.
     });
    }
   }

function IngresoTwitter(){
 	if (!firebase.auth().currentUser){

 		var provider = new firebase.auth.TwitterAuthProvider();

 		firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  
  console.log(user)

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  
  if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('El usuario ya se ha registrado');
            } else {
            console.error(error);
          }
    });
   } else {
       firebase.auth().signOut().then(function() {
       // Sign-out successful.
          }, function(error) {
       // An error happened.
     });
    }
   }

  document.getElementById('btn-google').addEventListener('click',IngresoGoogle,false);
  document.getElementById('btn-facebook').addEventListener('click',IngresoFacebook,false);
  document.getElementById('btn-twitter').addEventListener('click',IngresoFacebook,false);
