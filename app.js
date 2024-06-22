function saveTask(){
    console.log("Saving tasks");

    const title=$("#txtTitle").val();
    const description=$("#txtDescription").val();
    const color=$("#selColor").val();
    const date=$("#selDate").val();
    const status=$("#selStatus").val(); 
    const budget=$("#numBudget").val();
    console.log(title, description, color, date, status, budget);

    let taskToSave = new Task(title, description,color,date,status,budget);
    console.log(taskToSave);

    $.ajax({
        type: "POST",
        url:"http://fsdiapi.azurewebsites.net/api/tasks/",

        data: JSON.stringify(taskToSave),
        contentType: "application/json",


        success: function(response){
            console.log(response);
            displayTask(taskToSave);
        },
        error: function(error){
            console.log(error);
        }
    });

}
function deleteTask(id){
    console.log("Delete task btn works", id)

    $.ajax({
        type: "DELETE",
        url: `http://fsdiapi.azurewebsites.net/api/tasks/${id}/`,
        success: function () {
            $("#" + id).remove();
        },
        error: function (error) {
            console.log("Error:", error);
        },
    })
}
function loadTask(){
    $.ajax({
        type: "GET",
        url:"http://fsdiapi.azurewebsites.net/api/tasks",
        success:function(response){
             let data =JSON.parse(response)
            console.log(data)
            for(let i=0;i<data.length;i++)
                {
                    let task = data[i];
                    if(task.name=="Richard")
                        {
                            displayTask(task)
                        }
                }
        }, 
        error: function(error){
            console.log(error);
        }
    });

    
}

function displayTask(task){
    let syntax =` 
    <div class='task' id="${task._id}">
        <div class='info'>
            <h3>${task.title}</h3>
            <h5>${task.description}</h5>
        </div>
        <label class='status'>${task.status}</label>
        <div class='date-budget'>
            <label>${task.date}</label>
            <label>${task.budget}</label>
        </div>
        <div class="mb-3" >
            <button class="form-label" type="button" class="btn btn-secondary" id="btnDelete" onClick="deleteTask('${task._id}')">Delete</button>
        </div>
    </div>
    `
    $(".list-task").append(syntax);
}
function testRequest(){
    $.ajax({
        type: "GET",
        url:"http://fsdiapi.azurewebsites.net",
        success:function(response){
            console.log(response)
        },
        error: function(error){
            console.log(error);
        }
    });
}
function init(){
    console.log("task manager");
   
    loadTask();

    $("#btnSave").click(saveTask);
    // $("#btnDelete").click(deleteTask);
}
window.onload  = init;