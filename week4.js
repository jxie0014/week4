let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('images'));
app.use(express.static('css'));

let db = [];

app.get('/', function (req, res) {
    res.render('index.html');
});
app.get('/listtasks', function (req, res) {
    res.render('listtasks.html', {db: db});
});
app.get('/newtask', function (req, res) {
    res.render('newtask.html');
});
app.post('/newtask', function (req, res) {
    db.push(req.body);
});
app.listen(8080);