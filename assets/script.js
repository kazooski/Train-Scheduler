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

    
    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      firstTrainTime: firstTrainTime,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

database.ref().on("child_added", function(childSnapshot) {

    // console.log(childSnapshot.val().trainName);
    // console.log(childSnapshot.val().destination);
    // console.log(childSnapshot.val().frequency);
    // console.log(childSnapshot.val().firstTrainTime);
    // console.log(childSnapshot.val().dateAdded);


    frequency = childSnapshot.val().frequency;
    firstTrainTime = childSnapshot.val().firstTrainTime;
    
    // Next Arrival and Minutes Away using moment.js
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var timeRemaining = diffTime % frequency;
    minutesAway = frequency - timeRemaining;
    var nextTrainTime = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextTrainTime).format("HH:mm");
    

    // full list of items to the well
    $("#train-list").append("<tr><td> " +
      childSnapshot.val().trainName +
      " </td><td> " + childSnapshot.val().destination +
      " </td><td> " + childSnapshot.val().frequency +
      " </td><td> " + nextArrival +
      " </td><td> " + minutesAway +
      " </td></tr>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});