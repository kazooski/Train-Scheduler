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



    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().dateAdded);

    // full list of items to the well
    $("#train-list").append("<tr><td> " +
      childSnapshot.val().trainName +
      " </td><td> " + childSnapshot.val().destination +
      " </td><td> " + childSnapshot.val().frequency +
      " </td></tr>");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

//   database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);
//   });

