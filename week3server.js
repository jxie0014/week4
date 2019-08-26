let express = require('express');
let app = express();
let router = require('./week3router.js');

app.use('/', router);
app.listen(3500);
