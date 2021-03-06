// Get All Projects from DB and Display in My Projects Menu
function getProjects() {
  $("#projectlist").empty();
  $.get("api/project", function (data) {
    data.forEach(e => {
      $("#projectlist").append(
        `
              <a class="open-project" id='${e._id}' href="/edit/${e._id}">${e.name}</a><br />
              `
      );
    });
  });
};

getProjects();

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Responsive Buttons

$('#btn-desk').click(function() {
  console.log('Hello')
  $('#device').removeClass('dev-mobile');
});