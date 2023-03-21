var express = require('express');
var router = express.Router();
var Task = require('../controllers/tasks');
var User = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.list()
  .then(tasks=>{
    User.list()
    .then(users=>{
      res.render('index',{tasks:tasks, users:users, d:data});

    })
    .catch(err=>{
      res.render('error',{error:err,msg:"Unable to get list of users... [Error: " + err + "]",d:data})
    })

  })
  .catch(err=>{
    res.render('error',{error:err,msg:"Unable to get list of tasks... [Error: " + err + "]",d:data})
  })
});

/* GET new user page. */
router.get('/adduser', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  User.list() 
  .then(users =>{
    res.render('addUser',{users:users, d:data});
  })
  .catch(err=>{
    res.render('error',{error:err,msg:"Unable to get list of users... [Error: " + err + "]",d:data})
    
  })
});

/* GET done task page. */
router.get('/tasks/done/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.doneTask(req.params.idTask)
  .then(task=>{
    res.redirect("/")
  })
  .catch(err=>{
    res.render('error',{error:err,msg:"Task not found... [Error: " + err + "]",d:data})
  })
});


/* GET delete task page. */
router.get('/tasks/delete/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.idTask)
  .then(task=>{
    console.log(task)
    res.render('confirmDelete',{task:task,d:data})
  })
 .catch(err=>{
    res.render('error',{error:err,msg:"Task not found... [Error: " + err + "]",d:data})
  })
});


router.get('/tasks/confirm_delete/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)  
  Task.deleteTask(req.params.idTask)
    .then(task=>{
      res.redirect("/")
    })
   .catch(err=>{
      res.render('error',{error:err,msg:"Task not found... [Error: " + err + "]",d:data})
    })
    
});

/* GET edit task page. */
router.get('/tasks/edit/:done/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.editTask(req.params.idTask)
 .then(task=>{
    Task.list()
    .then(tasks=>{
      User.list()
      .then(users=>{
        res.render('editTask',{task:task,tasks:tasks,users:users,d:data})
      })    
      .catch(err=>{
        res.render('error',{error:err,msg:"Unable to get list of users... [Error: " + err + "]",d:data})
      })
    })
    .catch(err=>{
      res.render('error',{error:err,msg:"Unable to get list of tasks... [Error: " + err + "]",d:data})
    })
  })
 .catch(err=>{
    res.render('error',{error:err,msg:"Task not found... [Error: " + err + "]",d:data})
  })
});

/* POST from home page. */
router.post('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.addTask(req.body)
  .then(task=>{
    res.render('confirmForm',{task:task, d:data})
  })
  .catch(err=>{
    res.render('error',{error:err,msg:"Unable to get list of tasks... [Error: " + err + "]",d:data})
  })
});

/* POST from user page. */
router.post('/adduser', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  User.addUser(req.body)
  .then(user=>{

    res.render('confirmUser',{user:user, d:data})
  })
  .catch(err=>{
    res.render('error',{error:err, msg:"Unable to get list of users... [Error: " + err + "]",d:data})
  })
});

/*POST from edit task page. */
router.post('/tasks/edit/:done/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  if(req.params.done == 'done'){
    Task.updateDoneTask(req.params.idTask, req.body)
    .then(task=>{
      res.redirect('/')
    })
    .catch(err=>{
      res.render('error',{error:err, msg:"Unable to get task... [Error: " + err + "]",d:data})
    })
  }
  else if(req.params.done == 'todo'){
    Task.updateToDoTask(req.params.idTask, req.body)
    .then(task=>{
      res.redirect('/')
    })
    .catch(err=>{
      res.render('error',{error:err, msg:"Unable to get task... [Error: " + err + "]",d:data})
    })
  }
})


module.exports = router;
