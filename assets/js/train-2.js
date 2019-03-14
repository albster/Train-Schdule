// Initialize Firebase
var config = {
    apiKey: "AIzaSyCzYbWrtlNkhZBb_83sjXNGdPh80GRqic8",
    authDomain: "killerdiller-46a7e.firebaseapp.com",
    databaseURL: "https://killerdiller-46a7e.firebaseio.com",
    projectId: "killerdiller-46a7e",
    storageBucket: "killerdiller-46a7e.appspot.com",
    messagingSenderId: "235827778626"
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function (event) {
      event.preventDefault();
  
      var trainName = $("#train-name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrain = $("#first-train-input").val().trim();
      var frequency = $("#frequency-input").val().trim();
  
      database.ref().push({
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      });
  
      //this is also perfectly fine
      //Creates local "temporary" object for holding train data
      //var newTrain = {
      //    name: trainName,
      //    destination: destination,
      //    firstTrain: firstTrain,
      //    frequency: frequency
      //};
  
      // Uploads train data to the database
      //database.ref().push(newTrain);
  
      // Alert
      alert("Train successfully added");
  
      // Clears all of the text-boxes
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");
  });