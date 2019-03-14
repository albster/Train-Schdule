var recordCount = 0;

var config = {
    apiKey: "AIzaSyCzYbWrtlNkhZBb_83sjXNGdPh80GRqic8",
    authDomain: "killerdiller-46a7e.firebaseapp.com",
    databaseURL: "https://killerdiller-46a7e.firebaseio.com",
    storageBucket: "killerdiller-46a7e.appspot.com",
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function (event) {
      event.preventDefault();
  
      var trainName = $("#train-name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrain = $("#first-train-input").val().trim();
      var frequency = $("#frequency-input").val().trim();
  
      recordCount = 0;
  
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
  
  //On load this function is called for each document in firebase
  //and it is called again after a record is added
  database.ref().on("child_added", function (document) {
      recordCount += 1;
  
      console.log(document.key);
      console.log(document.val());
  
      var name = document.val().name;
      var destination = document.val().destination;
      var frequency = document.val().frequency;
      var firstTrain = document.val().firstTrain;
      var arrivalMinutes;
      var arrivalTime;
  
      //23:00 -> 11:00PM
      var trainTime = moment(firstTrain, "hh:mm").subtract(1, "years");
  
      //number of minutes between first train and now
      var minuteDifference = moment().diff(moment(trainTime), "minutes");
      var remainder = minuteDifference % frequency;
      arrivalMinutes = frequency - remainder;
  
      var nextTrain = moment().add(arrivalMinutes, "minutes");
      arrivalTime = moment(nextTrain).format("hh:mm");
  
  
      $("#train-table > tbody").append(
          $("<tr>").append(
              $("<td>").text(name),
              $("<td>").text(destination),
              $("<td>").text(frequency),
              $("<td>").text(arrivalTime),
              $("<td>").text(arrivalMinutes)
          )
      );
  
      console.log("Record:" + recordCount);
  });