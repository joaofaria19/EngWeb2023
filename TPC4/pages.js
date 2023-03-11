
exports.homePage = function(tasks,d){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>ToDo List</title>
        <meta charset="UTF-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4 w3-border w3-round-xlarge">
            <header class="w3-container w3-blue-gray" style="display:flex">
                <h2 style="width:100%">ToDo Form</h2>
                <button class="w3-button w3-right">Add a new user</button>
            </header>
            <form class="w3-container" method="POST">
                <fieldset>
                    <label class="w3-text-blue-gray">Limit Date</label>
                    <input class="w3-input w3-round" type="date" name="date">
                    <br/>
                    <label class="w3-text-blue-gray">Who's going to do it</label>
                    <input class="w3-input w3-round" type="text" name="who" placeholder="Write who will do the task here">
                    <br/>
                    <label class="w3-text-blue-gray">Task description</label>
                    <textarea class="w3-input w3-round" name="desc" rows="3" cols="40" placeholder="Write your task description here"></textarea>
                    <br/>
                    <a href="/tasks/submit"><button class="w3-btn w3-hover-light-grey w3-blue-gray w3-round-xlarge w3-right w3-large w3-padding-large">Submit</button></a>
                </fieldset>
            </form>
        </div>
        <div class="w3-container" style="display:flex;">
            <div class="w3-panel w3-border w3-round-large" style="width:50%">
                <h3>ToDo List</h3>
                <ul class="w3-ul w3-border">`

        for(let i =0; i<tasks.length; i++){
            if(tasks[i].done == false){
                pagHTML+=`
                    <li class="w3-display-container">
                        ${tasks[i].desc} (${tasks[i].date})<br/>
                        <h5 class="w3-text-blue-grey w3-">${tasks[i].who}</h5>
                        <span class="w3-display-right">
                            <a href="/tasks/edit/${tasks[i].id}"><button class="w3-button w3-round w3-padding-large">Edit</button></a>
                            <a href="/tasks/done/${tasks[i].id}"><button class="w3-button w3-round w3-padding-large">Done</button></a>
                        </span>
                   </li>
                
                `
            }
        }

        pagHTML+=`
                </ul>
            </div>
            <div class="w3-panel w3-border w3-round-large" style="width:50%">
                <h3>Done List</h3>
                <ul  class="w3-ul w3-border">`
                
        for(let i =0; i<tasks.length; i++){
            if(tasks[i].done == true){
                pagHTML+=`
                    <li class="w3-display-container w3-light-grey">
                        ${tasks[i].desc}
                        <a href="/tasks/delete/${tasks[i].id}"><button class="w3-btn w3-round w3-display-right">Delete</button></a>
                        
                    </li>                
                `
            }
        }
        pagHTML+=`
                </ul>
            </div>
        </div>
        <footer class="w3-container w3-blue-grey">
            <address>Gerado por aluno::a97652 em ${d} </address>
        </footer>
    </body>
</html>
    `
    return pagHTML
}

exports.confirmPage = function(msg,d){
    var pagHTML=`
<!DOCTYPE html>
<html>
    <head>
        <title>Confirm Page</title>
        <meta charset="UTF-8">
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="public/w3.css"/>
    </head>
    <body>
        <header class="w3-container w3-blue-gray">
            <h3>${msg}</h3>
        </header>
        <footer class="w3-container w3-blue-grey">
            <address>Gerado por aluno::a97652 em ${d} - <b>[ <a href="http://localhost:7777/">Back</a> ]</b></address>
        </footer>
    </body>
</html>
`
    return pagHTML
}

exports.confirmFormPage = function(d){
    var pagHTML=`
<!DOCTYPE html>
<html>
    <head>
        <title>Confirm Page</title>
        <meta charset="UTF-8">
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="public/w3.css"/>
    </head>
    <body>
        <header class="w3-container w3-blue-gray">
            <h2>New task added!</h2>
        </header>

        <table class="w3-table w3-table-all">
            <tr>
               <td><b>Limit Date: </b>10/02/2023</td>
            </tr>
            <tr>
                <td><b>Who's going to do it: </b>James Peterson</td>
             </tr>
             <tr>
                 <td><b>Task desecription: </b>Comprar ovos </td>
             </tr>
        </table>
        <footer class="w3-container w3-blue-grey">
            <address>Gerado por aluno::a97652 em ${d} - <b>[ <a href="http://localhost:7777/">Back</a> ]</b></address>
        </footer>
    </body>
</html>
`
    return pagHTML
}

exports.editTaskFormPage = function(task,d){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>Edit Task</title>
        <meta charset="UTF-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-blue-gray" style="display:flex">
                <h2 style="width:100%">Edit Task</h2>
            </header>
            <form class="w3-container" method="POST">
                <fieldset>
                    <label class="w3-text-blue-gray">Limit Date</label>
                    <input class="w3-input w3-round" type="date" name="date" value=${task.date}>
                    <br/>
                    <label class="w3-text-blue-gray">Who's going to do it</label>
                    <input class="w3-input w3-round" type="text" name="who" placeholder="Write who will do the task here" value=${task.who}>
                    <br/>
                    <label class="w3-text-blue-gray">Task description</label>
                    <textarea class="w3-input w3-round" name="desc" rows="3" cols="40" placeholder="Write your task description here" value=${task.desc}></textarea>
                    <br/>
                    <span class="w3-right">
                        <a href="/tasks/delete/${task.id}"><button class="w3-btn w3-hover-light-grey w3-red w3-round-xlarge w3-large w3-padding-large">Delete</button></a>
                        <a href="/tasks/edit/submit/${task.id}"><button class="w3-btn w3-hover-light-grey w3-blue-gray w3-round-xlarge w3-large w3-padding-large">Submit</button></a>
                    </span>
                </fieldset>
            </form>
        </div>
        <footer class="w3-container w3-blue-grey">
            <address>Gerado por aluno::a97652 em ${d} - <b>[ <a href="http://localhost:7777/">Back</a> ]</b></address>
        </footer>
    </body>
</html>
`
    return pagHTML
}