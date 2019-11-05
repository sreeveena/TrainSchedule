// This script  will take following input value from user:
//Train name, destination, first train time and frequency of train on click of the submit button
//and calculate next arrival time and number of minutes away from the station.

// initialize firebase
var firebaseConfig = {
        apiKey: "AIzaSyCraMsD9hgOVt0gL1-n4MYiC9TqOZ5hH-M",
        authDomain: "fir-online-be2ad.firebaseapp.com",
        databaseURL: "https://fir-online-be2ad.firebaseio.com",
        projectId: "fir-online-be2ad",
        storageBucket: "fir-online-be2ad.appspot.com",
        messagingSenderId: "298274496474",
        appId: "1:298274496474:web:dc9b015057de41767c6ae3",
        measurementId: "G-BQC5E8Y1YZ"
      };
  firebase.initializeApp(firebaseConfig);
  
  // Create a variable to reference the database.
  var database = firebase.database();

var frequency = 0; 
var firstTrain = 0;  
//on click of submit button the input values enetered by the user will be collected and stored in 
//local variables and global variables like frequency and first train.

$("#trainInfoBtn").on("click", function(event){

    event.preventDefault();

    // Get the input values
    var trainName = $("#name").val().trim();
    var destination = $("#dest").val().trim();
    firstTrain = moment($("#firstTime").val().trim(), "HH:mm").format("HH:mm");
    frequency = parseInt($("#freq").val().trim());

    var firstTrainConverted = moment(firstTrain, "hh:mm");
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    var tRemain = diffTime % frequency;
    var minutesTillTrain = frequency - tRemain;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("HH:mm");
   
    // Code for "Setting values in the database"
    database.ref().push({
        train: trainName,
        destination: destination,
        time: firstTrain,
        frequency: frequency,
        nextTrain: nextTrain,
        minutesTillTrain: minutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
});
//dynamically table row and columns are generated in html for every user input.
database.ref().on("child_added", function(event){
var eventValue = event.val();

$(".tableBody").append("<tr class='row'><td class='name'> " +
eventValue.train +"</td>" +
"<td class='des'> "+ eventValue.destination + "</td>" +
"<td class='freq'> "+ eventValue.frequency + "</td>" +
"<td class='nextArrival'> "+ eventValue.nextTrain + "</td>" 
+"<td class='minutesAway'> "+ eventValue.minutesTillTrain+ "</td></tr>" );

// Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});





