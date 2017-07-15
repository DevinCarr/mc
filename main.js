(function() {
  'use strict';
  var goalsTableBody = document.getElementById('goalsTableBody'),
      worldSize = document.getElementById('worldSize');
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

  var database = firebase.database();
  var goals = firebase.database().ref('/goals/');
  goals.on('value', function(snapshot) {
    goalsTableBody.innerHTML = "";
    var data = snapshot.val();
    for (var goal in data) {
      if (data.hasOwnProperty(goal)) {
        let newRow = createNewRow(goal,data[goal].completed,data[goal].value);
        goalsTableBody.appendChild(newRow);
      }
    }
  });

  var ws = firebase.database().ref('/worldsize');
  ws.on('value', function(snapshot) {
    worldSize.innerHTML = snapshot.val();
  });
  console.log('MC Initialized');
  let createNewRow = (title,completed,value) => {
    let newRow = document.createElement('tr');
    let t = document.createElement('td');
    let v = document.createElement('td');
    let c = document.createElement('td');
    t.innerHTML = title;
    v.innerHTML = value;
    c.innerHTML = completed;
    newRow.appendChild(t);
    newRow.appendChild(v);
    newRow.appendChild(c);
    return newRow;
  };
  
})();

