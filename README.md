# TrainSchedule
Technologies used:
HTML
CSS
JAVASCRIPT
Jquery
moment (firebase database)

This assignment has one HTML page, one javascript file and one CSS file:
1. index.html
2. moment.js
3. style.css


  In this train schedule assignment  the program will take following input value from user:
Train name, destination, first train time and frequency of train on click of the submit button
and calculate next arrival time and number of minutes away from the station and gives the information to the user.

basic html 
'''
<body>
    <div class="container">
        <br>
        <!-- Jumbotron Title -->
        <div class="jumbotron">
          <h1 class="text-center">Anytime is Train Time</h1>
          <h3 class="text-center">Choo Choo. Chee Chee.</h3>
        </div>
        <div class="row">
            <!-- table columns... -->
            <div class="col-lg-12 col-md-12 col-sm-12">
                <!--Table for the train schedule-->
                <div class="panel panel-default">      
                    <div class="panel-body">Current Train Schedule</div>
                </div>
                <div class="table1" >
                    <table  class="table" id= "trainTable" > 
                        <thead id="tableRow">
                            <tr>
                                <th>Train Name</th>
                                <th> Destination</th>
                                <th>Frequency(min)</th>
                                <th>Next Arrival</th>
                                <th>Minutes Away</th>
                            </tr>
                        </thead>
                        <!-- dynamic code generated in javascript -->
                        <tbody class="tableBody">
                        </tbody> 
                    </table>
                </div>
                <br>
            </div>
        </div>
        <div class="row">
            <!-- table columns... -->
            <div class="col-lg-12 col-md-12 col-sm-12">
                <!--Table for the train schedule-->
                <div class="panel panel-default">
                        <div class="panel-body">Add Train </div>
                </div>
                <div class="table1">
                    <table  id= "trainTable"> 
                        <form>
                         <div class="form-group">
                                <label class="label" for="name">Train Name</label><br>
                                <input type="text" class="form-control"
                                    id="name" placeholder="Train Name"><br>
                                <label class="label" for="dest">Destination</label><br>
                                <input type="text" class="form-control"
                                    id="dest" placeholder="Destination" ><br>
                                <label class="label" for="firstTrain">First Train Time (HH:mm - military tie)</label><br>
                                <input type="text" class="form-control" id="firstTime" placeholder="First Train Time(24:00)">
                                <br>
                                <label class="label" for="freq">Frequency (min)</label><br>
                                <input type="text" class="form-control" id="freq" placeholder="Frequency (min)">
                                <br>
                                <button class="btn btn-primary btn-lg" id="trainInfoBtn" type="submit">Submit</button>    
                            </div>
                        </form>
                    </table>
                </div>
            </div>
        </div>
      <script src="javascript/moment.js"></script>
    <!-- Link to Moment.js should go here -->
  <script src="https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min.js"></script>
</body>
'''
function for onclick of submit button in html in moment.js

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


Dynamically table row and columns are generated in html for every user input in moment.js.

'''
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
'''
[!image](https://user-images.githubusercontent.com/7834767/68534867-8aa89f00-02ee-11ea-8669-f19b999ed422.png)
[!image](https://user-images.githubusercontent.com/7834767/68534868-8aa89f00-02ee-11ea-99af-7b6559214fe6.png)