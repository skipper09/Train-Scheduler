// $(document).ready(function() {

// Initialize Firebase
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
    rate = "";


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

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().station);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().rate);
    console.log(childSnapshot.val().dateAdded);

    // full list of items to the well
    $(".table").append("<tr><td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().station + "</td>" + "<td>" + childSnapshot.val().rate + "</td>" + "<td>" + " " + "</td>" + "<td>" + " " + "</td></tr>");




    // <div class='well'><span id='name'> " + childSnapshot.val().name +
    //     " </span><span id='email'> " + childSnapshot.val().email +
    //     " </span><span id='age'> " + childSnapshot.val().age +
    //     " </span><span id='comment'> " + childSnapshot.val().comment + " </span></div>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

//     // Change the HTML to reflect
//     $("#name-display").html(snapshot.val().name);
//     $("#email-display").html(snapshot.val().email);
//     $("#age-display").html(snapshot.val().age);
//     $("#comment-display").html(snapshot.val().comment);
// });





// });
