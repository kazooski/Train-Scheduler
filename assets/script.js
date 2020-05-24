 // Script for train scheduler // 
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDwX_n0FxGWyhQiGDn-A2xqS8SXPSTrPyg",
    authDomain: "choo-choo-choose-me.firebaseapp.com",
    databaseURL: "https://choo-choo-choose-me.firebaseio.com",
    projectId: "choo-choo-choose-me",
    storageBucket: "choo-choo-choose-me.appspot.com",
    messagingSenderId: "1018852599451",
    appId: "1:1018852599451:web:b796e46c53447e5d26c83e",
    measurementId: "G-DYD2KX0J2Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";
  var nextArrival = "";
  var minutesAway = "";

  $("#add-train").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#first-train-time").val().trim();
    frequency = $("#frequency").val().trim();
    frequency = parseInt(frequency);

    // Next Arrival and Minutes Away using moment.js

    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log("TIME CONVERTED: " + firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var timeRemaining = diffTime % frequency;
    console.log(timeRemaining);

    minutesAway = frequency - timeRemaining;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    var nextTrainTime = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrainTime).format("HH:mm"));

    nextArrival = moment(nextTrainTime).format("HH:mm");
    
    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      minutesAway: minutesAway,
      nextArrival: nextArrival,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().nextArrival);
    console.log(childSnapshot.val().minutesAway);
    console.log(childSnapshot.val().dateAdded);

    // full list of items to the well
    $("#train-list").append("<tr><td> " +
      childSnapshot.val().trainName +
      " </td><td> " + childSnapshot.val().destination +
      " </td><td> " + childSnapshot.val().frequency +
      " </td><td> " + childSnapshot.val().nextArrival +
      " </td><td> " + childSnapshot.val().minutesAway +
      " </td></tr>");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


