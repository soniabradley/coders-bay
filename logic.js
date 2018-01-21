
// Initialize Firebase 
var config = {
    apiKey: "AIzaSyAu2Jv1HEOxpira5jsZCjXz1sbHcqL18Ns",
    authDomain: "codersbay-fad03.firebaseapp.com",
    databaseURL: "https://codersbay-fad03.firebaseio.com",
    projectId: "codersbay-fad03",
    storageBucket: "codersbay-fad03.appspot.com",
    messagingSenderId: "1056797270560"
  };
  firebase.initializeApp(config);

//   Create a variable to reference the database
var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No One Yet :(";

var highPrice = initialBid;
var highBidder = initialBidder;

// ---------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {
      // Set the local variables for highBidder equal to the stored values in firebase.
      highBidder = snapshot.val().highBidder;
      highPrice = parseInt(snapshot.val().highPrice);
      // Print to Screen
      $("#highestBidder").html(snapshot.val().highBidder);
    $("#highestPrice").html("$" + snapshot.val().highPrice);

    // Print the initial data to the console.
    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);
  }

  // Keep the initial variables for highBidder equal to the initial values
  else {

    // Change the HTML to reflect the initial value
    $("#highestBidder").html(highBidder);
    $("#highestPrice").html("$" + highPrice);

    }
})  
// --------------------------------------------------------------

// Whenever a user clicks the submitBid
$("#submitBid").on("click", function() {
    
    // Get the input values, .val().trim() removes white spaces from the string
    var bidderName = $("#bidderName").val().trim();
    var bidderPrice = $("#bidderPrice").val().trim();
  
    // Log the Bidder and Price (Even if not the highest)
    console.log(bidderName);
    console.log(bidderPrice);

    if (bidderPrice > highPrice) {
    alert("You are the highest bidder.");
        // Send data to Firebase
        database.ref().set({
          highBidder: bidderName,
          highPrice: bidderPrice
        })
} else {
  alert("You have to bid higher");
}
    // Keeps entry info on screen, same as event.preventDefault();
    return false;
})