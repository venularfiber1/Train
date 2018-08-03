$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyBUGqTIVq_65WvDwQzkCUIdSPl5nG-PAm8",
        authDomain: "train-b84cb.firebaseapp.com",
        databaseURL: "https://train-b84cb.firebaseio.com",
        projectId: "train-b84cb",
        storageBucket: "train-b84cb.appspot.com",
        messagingSenderId: "653499015629"
      };
  
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-btn").on("click", function(event) {
  		event.preventDefault();

	  var name = $("#name-input").val().trim();
	  var dest = $("#destination-input").val().trim();
	  var first = $("#first-input").val().trim();
      var freq = $("#freq-input").val().trim();
      
	  var newTrain = {
	  	name: name,
	  	destination: dest,
	  	start: first,
	  	frequency: freq
	  };

  		database.ref().push(newTrain);
  		alert("New Train Added");
	  $("#name-input").val("");
	  $("#destination-input").val("");
	  $("#first-input").val("");
	  $("#freq-input").val("");
  	});

	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  var name = childSnapshot.val().name;
	  var dest = childSnapshot.val().destination;
	  var first = childSnapshot.val().start;
	  var freq = childSnapshot.val().frequency;

  		var freq;

   		 var firstTime = 0;

	   var firsttime = moment(firstTime, "HH:mm").subtract(1, "years");
	  
	    var current = moment();
	   
		var differance = moment().diff(moment(firsttime), "minutes");
		
	    var remainder = differance % freq;
	   
	    var minutes = freq - remainder;
	   
	    var next = moment().add(minutes, "minutes");

	  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq +  "</td><td>" + moment(next).format("HH:mm") + "</td><td>" + minutes + "</td></tr>");
	});

});