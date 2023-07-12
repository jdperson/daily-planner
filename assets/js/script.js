  // wait for page elements to load
$(document).ready(function () {

  // grab every save button
  var saveBtns = $(".saveBtn");

  // assign click listener to each save button
  saveBtns.on("click", function (event) {
    event.preventDefault();
    // retrieves hour number from time-block's id
    var hour = $(this).parent().attr("id").split("-")[1];
    var input = $(this).parent().children().eq(1).val();
    
    localStorage.setItem(hour, input);

    var popup = $("#popup");
    popup.show();

    setInterval(function () {
      popup.hide();
    }, 5000);
  })

  // returns current hour from 0-23
  var currentHour = dayjs().format("H");
  $(".time-block").each(function  () {

    // returns integer value x from id="hour-x"
    var hour = parseInt($(this).attr("id").split("-")[1]);

    if (hour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (hour == currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  })
  
  $(".time-block").each(function  () {
    var hour = parseInt($(this).attr("id").split("-")[1]);
    var input = localStorage.getItem(hour);

    if (input) {
      $(this).find(".description").val(input);
    }
  })
  
  var currentDay = $("#currentDay");
  currentDay.text(dayjs().format("dddd, MMMM D"));
});
