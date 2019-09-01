//import packages
let express = require('express');
let bodyParser = require('body-parser');
let mongodb = require('mongodb');

//configure express
let app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('images'));
app.use(express.static('css'));

//configure mongodb
let MongoClient = mongodb.MongoClient;
//connection url
let url = "mongodb://localhost:27017/";
//reference to database
let db;
//connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("fit2095db");
        }
    });

app.get('/', function (req, res) {
    res.render('index.html');
});
app.get('/listtasks', function (req, res) {
    db.collection('week5table').find({}).toArray(function (err, data) {
        if (err) {
            res.redirect('/404');
        } else {
            res.render('listtasks.html', { db: data });
        }
    });
});
app.get('/newtask', function (req, res) {
    res.render('newtask.html');
});
app.post('/newtask', function (req, res) {
    let taskid = Math.round(Math.random()*1000);
    let task = req.body;
    db.collection('week5table').insertOne({
        taskid: taskid,
        taskname: task.taskname, 
        taskassign: task.taskassign,
        taskdue: task.taskdue,
        taskstatus: task.taskstatus,
        taskdesc: task.taskdesc
    });
    res.redirect('/listtasks');
});
app.get('/deletetask', function (req, res) {
    res.render('deletetask.html');
});
app.post('/deletetask', function (req, res) {
    let task = req.body;
    let tasktodelete = { taskid: parseInt(task.tasktodelete) };
    db.collection('week5table').deleteOne(tasktodelete, function (err, obj) {
        if (err) {
            res.redirect('/404');
        } else if (obj.result.n === 0) {
            res.send("Task Not Found");
        } else {
            res.redirect('/listtasks');
        }
    });
});
app.get('/deletecompleted', function (req, res) {
    let tasktodelete = { taskstatus: 'Complete' };
    db.collection('week5table').deleteMany(tasktodelete, function (err, obj) {
        if (err) {
            res.redirect('/404');
        } else {
            res.redirect('/listtasks');
        }
    });
});
app.get('/updatetask', function (req, res) {
    res.render('updatetask.html');
});
app.post('/updatetask', function (req, res) {
    let task = req.body;
    let tasktoupdate = { taskid: parseInt(task.tasktoupdate) };
    let update = { $set: {taskstatus: task.newstatus } };
    db.collection("week5table").updateOne(tasktoupdate, update, { upsert: false }, function (err, result) {
        if (err) {
            res.redirect('/404');
        } else if (result.result.n === 0){
            res.send("Task Not Found");
        } else {
            res.redirect('/listtasks');
        }
    });
});
app.listen(8080);