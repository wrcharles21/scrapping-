

// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<div class='card'>"+
     "<img class='card-img-top' src='"+ data[i].img +"' alt='Card image cap'>"+
     "<div class='card-body'"+
     "<h4 class='card-title' href='"data[i].link +"'><b>" + data[i].title + "</b></h4>"+
     "<p class='card-text'>" + data[i].description + "</p>" +
     "<a href='" + data[i].link + "'class='btn btn-primary'>Link Full Article </>" +
     "</div>" +
     "</div>" + "<br>"
      
});

$(document).on("click", "p", function () {
   $("#comments").empty();

   var thisId = $(this).attr("class");

   $.ajax({
        method: "GET",
        url: "/articles/" + thisId
   })
      .done(function(data){
        console.log(data);

      $("#comments").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#comments").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Comment</button>");
      // If there's a note in the article
      if (data.comment) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.comment.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.comment.body)
      })
