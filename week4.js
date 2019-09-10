let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('images'));
app.use(express.static('css'));

let Task = require('./models/task');
let Developer = require('./models/developer');

mongoose.connect('mongodb://localhost:27017/todoDB', function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
    } else {
        console.log('Successfully connected');
    }
});

app.get('/', function (req, res) {
    res.render('index.html');
});
app.get('/listdevelopers', function (req, res) {
    Developer.find({}, function (err, docs) {
        if (err) {
            res.send('Error');
            console.log(err);
        } else {
            res.render('listdevelopers.html', { db: docs });
        }
      });
});
app.get('/listtasks', function (req, res) {
    Task.find({}).populate('assignto').exec(function (err, docs) {
        if (err) {
            res.send('Error');
            console.log(err);
        } else {
            res.render('listtasks.html', { db: docs });
        }
      });
});
app.get('/newdeveloper', function (req, res) {
    res.render('newdeveloper.html');
});
app.post('/newdeveloper', function (req, res) {
    let developer = new Developer({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: req.body.firstname,
            lastName: req.body.lastname
            },
        level: req.body.level,
        address: {
            state: req.body.state,
            suburb: req.body.suburb,
            street: req.body.street,
            unit: req.body.unit
        }
    });
    developer.save(function (err) {
        if (err) {
            res.send('Error');
            console.log(err);
        } else {
            res.redirect('/listdevelopers');
        }
    });
});
app.get('/newtask', function (req, res) {
    res.render('newtask.html');
});
app.post('/newtask', function (req, res) {
    let task = new Task({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        assignto: req.body.assignto,
        due: req.body.due,
        status: req.body.status,
        desc: req.body.desc
    });
    task.save(function (err) {
        if (err) {
            res.send('Error');
            console.log(err);
        } else {
            res.redirect('/listtasks');
        }
    });
});

app.get('/deletetask', function (req, res) {
    res.render('deletetask.html');
});
app.post('/deletetask', function (req, res) {
    Task.deleteOne({ '_id': req.body.todelete}, function (err, doc) {
        if (err) {
            res.send('Error');
            console.log(err);
        } else {
            res.redirect('/listtasks');
        }
    });
});
app.get('/deletecompleted', function (req, res) {
    Task.deleteMany({ 'status': 'Complete' }, function (err, doc) {
        if (err) {
            res.send('Error');
            console.log(err);
        } else {
            res.redirect('/listtasks');
        }
    });
});
app.get('/updatetask', function (req, res) {
    res.render('updatetask.html');
});
app.post('/updatetask', function (req, res) {
    Task.updateMany({ '_id': req.body.toupdate }, { $set: { 'status': req.body.newstatus } }, function (err, doc) {
        if (err) {
            res.send('Error');
            console.log(err);
        } else {
            res.redirect('/listtasks');
        }
    });
});
app.get('/:oldfirstname/:newfirstname', function (req, res) {
    Developer.updateMany({ 'name.firstName': req.params.oldfirstname }, { $set: { 'name.firstName': req.params.newfirstname } }, function (err, doc) {
        if (err) {
            res.send('Error');
            console.log(err);
        } else {
            res.redirect('/listdevelopers');
        }
    });
});
app.get('/findNotTomorrow', function (req, res) {
    let tasktofind = { taskdue: { $ne: '2019-09-04' } };
    db.collection('week5table').find(tasktofind).toArray(function (err, data) {
        if (err) {
            res.send('Error');
        } else {
            res.render('listtasks.html', { db: data });
        }
    });
});
app.listen(8080);