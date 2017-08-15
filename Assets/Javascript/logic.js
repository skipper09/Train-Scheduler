var config = {
    apiKey: "AIzaSyAfaCfX9nRApCydoT9xwwp0lhJ9VLwM6Bw",
    authDomain: "train-scheduler-b4cec.firebaseapp.com",
    databaseURL: "https://train-scheduler-b4cec.firebaseio.com",
    projectId: "train-scheduler-b4cec",
    storageBucket: "train-scheduler-b4cec.appspot.com",
    messagingSenderId: "397302452079"
  };

  firebase.initializeApp(config);

var database = firebase.database(),
    name = "",
    station = "",
    time = "",
    rate = "",
    arrival = "",
    minutesAway = "";

function timeFunction(frequency, firstTime) {

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years"),
        currentTime = moment(),
        diffTime = moment().diff(moment(firstTimeConverted), "minutes"),
        tRemainder = diffTime % frequency;

    minutesAway = frequency - tRemainder;

    var nextTrain = moment().add(minutesAway, "minutes");

    arrival = moment(nextTrain).format("hh:mm");
}


$("#submitButton").on("click", function(event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    station = $("#station-input").val().trim();
    time = $("#time-input").val().trim();
    rate = $("#rate-input").val().trim();

    database.ref().push({
        name: name,
        station: station,
        time: time,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    alert(name + " has been added.");
});

database.ref().on("child_added", function(childSnapshot) {

    name = childSnapshot.val().name
    station = childSnapshot.val().station
    time = childSnapshot.val().time
    rate = childSnapshot.val().rate

    timeFunction(rate, time);

    $(".table").append("<tr><td>" + name + "</td>" + "<td>" + station + "</td>" + "<td>" + rate + "</td>" + "<td>" + arrival + "</td>" + "<td>" + minutesAway + "</td></tr>");

}, function(errorObject) {

    console.log("Errors handled: " + errorObject.code);

});
