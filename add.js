(function() {
  'use strict';
  var addForm = document.getElementById('addForm'),
      submitButton = document.getElementById('submitButton');
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyACPLnIHH01PDQQ8i9oClM86uhFOVCSZKg",
    authDomain: "mccc-7e8c9.firebaseapp.com",
    databaseURL: "https://mccc-7e8c9.firebaseio.com",
    projectId: "mccc-7e8c9",
    storageBucket: "mccc-7e8c9.appspot.com",
    messagingSenderId: "232576197010"
  };
  firebase.initializeApp(config);
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  provider.addScope('https://www.googleapis.com/auth/firebase');
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(error);
    // ...
  });
  
  submitButton.addEventListener('click', event => {
    let title = addForm.elements['Title'].value;
    let newGoal = {
      completed: addForm.elements['Completed'].value,
      value: addForm.elements['Value'].value
    };
    if (title === '' || newGoal.value < 0) {
      console.log('Invalid form');
    } else {
      firebase.database().ref('goals/' + title).set(newGoal).then(result =>{
        console.log('Sucess');
      }).catch(error => {
        console.log(error);
      });
    }
  });
  console.log('MC Add Initialized');
})();

