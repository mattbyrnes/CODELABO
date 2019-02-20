$(document).ready(function () {

  const socket = io();

  var proId;
  var url = window.location.href;
  var docId = url.split("/");
  var docId = docId[4];

  if (docId) {
    proId = docId

    var testproject = function (res) {
      title.setValue(res.name)
      editor.setValue(res.html)
      editorCSS.setValue(res.css)
      editorJS.setValue(res.javascript)
    }
    
    $.get(`/api/project/${proId}`)
    .then((res) => testproject(res))

  } else {

title.setValue(`Untitled Project`)

editor.setValue(`<h1>
  Welcome to CODELABO
</h1>

<h2 id="hello">
  This text is changed by the JS
</h2>

<p>
This is an online code editor and my final project for the <a href="https://bootcamp.pe.gatech.edu/">Georgia Tech Coding Boot Camp</a>.
</p>`)

editorCSS.setValue(`<style> 

body{
  font-family: sans-serif;
  background: #111;
  padding: 20px;
  color: #fff;
}

h1 {color: #fff;} 

h2 {color: #f92672;}

p {color: #e6db74;} 

a {color: #a6e22e;}

</style>`)

editorJS.setValue(`<script>

document.getElementById("hello").innerHTML = "Hello World!";

</script>`)

  }

  //Get ALL Projects and List in Finder
  const getAllProjects = function () {
    $.getJSON('/api/project')
      .then(function (data) {
        const projectItem = data.map((e) =>
        `
        <a class="open-project" id='${e._id}' href="/edit/${e._id}">
          ${e.name} 
          <button class="del-btn"> <i class="fas fa-trash-alt"></i> </button>
        </a>
        
        `
        )
        $('#projectlist').html(projectItem);
        $('.fa-times').on('click', deleteDoc);
      })
  };
  getAllProjects();

  // Update on Keyup
  $(document).keyup(function () {
    console.log("project id", proId)
    if (!proId) {
      proId = 1;
      createProject()
    } else {
      console.log("updating")
      $.ajax({
        url: `/api/project/${proId}`,
        type: "PUT",
        data: { name: title.getValue(), html: editor.getValue(), css: editorCSS.getValue(), javascript: editorJS.getValue() }
      }).then(res => console.log(res));
    }
  })

  // Create Project
  const createProject = function () {
    const newProject = {
      // projectTitle: "",
      projectContent: ""
    };
    $.ajax({ url: '/api/project', method: 'POST', data: newProject }).then(function (res) {
      console.log(res)
      proId = res._id;
      window.history.pushState('page2', 'Title', `/edit/${proId}`);
    });
  };

  // Delete Project
  $(document).on('click', '.del-btn', function (res) {
    console.log('Delete');
    $.ajax({ method: 'DELETE', url: `/api/project/${proId}` })
    socket.emit('delete-project', res)
  });

});
