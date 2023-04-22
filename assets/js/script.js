// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var saveBtn = $(".saveBtn");
var currentDayEl = $("#currentDay");

// This function initializes the program
// aswell as sets the most current date
// and checks local storage content
function displayDate() {
  var todayDate = moment().format("dddd, MMM Do YYYY");
  currentDayEl.text(todayDate);
}

displayDate();

// Function to save the content entered into the row
// to local storage
function saveRow() {
  var currentDay = $(this).parent().attr("id");
  var schedule = $(this).siblings(".schedule").val();
  localStorage.setItem(currentDay, schedule);
}

// Function iterates through each time-block El
// and based on the current hour of the day

function rowColoring() {
  var currentHour = moment().hour();
  $(".time-block").each(function () {
    var chosenTime = parseInt($(this).attr("id"));

    // Coverting to 24-hour format in order for
    // color change to happen since HTML time-block
    // is in standard PM hours

    if ($(this).children(".hour").text().includes("PM") && chosenTime !== 12) {
      chosenTime += 12;
    }

    $(this).removeClass("past present future");

    if (chosenTime > currentHour) {
      $(this).addClass("future");
    } else if (chosenTime === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("past");
    }
  });
}

// This function ensures that the row colors change
// accroding to the time of day

function loadSchedules() {
  $(".time-block").each(function () {
    var id = $(this).attr("id");
    var schedule = localStorage.getItem(id);

    if (schedule !== null) {
      $(this).children(".schedule").val(schedule);
    }
  });
}
rowColoring();
loadSchedules();

// Save button ability
saveBtn.on("click", saveRow);
