var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';

  var config = {
    apiKey: "AIzaSyDb5kiYH4oeYQP6-0z6ghJZovtsCiKkuGA",
    authDomain: "train-scheduler-27089.firebaseapp.com",
    databaseURL: "https://train-scheduler-27089.firebaseio.com",
    projectId: "train-scheduler-27089",
    storageBucket: "train-scheduler-27089.appspot.com",
    messagingSenderId: "184767518897"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var connectedRef = database.ref("/connections");

$(document).ready(function() {

     $("#add-train").on("click", function(event) {
      event.preventDefault();
     	name = $('#name-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTrainTime = $('#first-train-time-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");

     	database.ref().push({
     		name: name,
     		destination: destination,
     		firstTrainTime: firstTrainTime,  
     		frequency: frequency,
        nextTrainFormatted: nextTrainFormatted,
        minutesTillTrain: minutesTillTrain
     	});

      console.log(keyHolder.path.u[0]);

      $('#name-input').val('');
     	$('#destination-input').val('');
     	$('#first-train-time-input').val('');
     	$('#frequency-input').val('');

     	return false;
     });

      database.ref().on("child_added", function(childSnapshot) {

		$('.train-schedule').append("<tr class='table-row'>" +
               "<td class='col-md-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-md-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-md-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-md-2'>" + childSnapshot.val().nextTrainFormatted + 
               "</td>" +
               "<td class='col-md-2'>" + childSnapshot.val().minutesTillTrain + 
               "</td>" +
                "</tr>");
    console.log(childSnapshot.val().name);

}, function(errorObject){
	console.log("Errors handled: " + errorObject.code)
});



}); 
