let express = require('express');
let app = express();
// Database is an array of records
let db = [];
let newId= Math.round(Math.random()*1000);
//First record 
let item = {
    id: newId,
    name: 'TV',
    quantity: 20,
    price: 1500
};
//Insert the first record to the db
db.push(item);
app.get('/', function (req, res) {
    res.send('Warehouse management system');
});
app.get('/listAllItems', function (req, res) {
    res.send(generateList());
});
app.get('/newItem/:name/:quantity/:price', function (req, res) {
    let p = req.params;
    let newId= Math.round(Math.random()*1000);
    let newItem = {
        id: newId,
        name: p.name,
        quantity: parseInt(p.quantity),
        price: parseInt(p.price)
    }
    db.push(newItem);
    res.send(generateList());
});
app.get('/deleteItem/:item', function (req, res) {
    let p = req.params;
    for (let i = 0; i < db.length; i++) {
        if (db[i].id === parseInt(p.item)){
            db.splice(i, 1);
        }
    }
    res.send(generateList());
})
app.get('/totalValue', function (req, res) {
    let total = 0;
    for (let i = 0; i < db.length; i++) {
        total += db[i].quantity*db[i].price;
    }
    res.send('Warehouse value = '+total);
})
app.listen(3500);

function generateList() {
    let st = 'Id Name Quantity Price Cost</br>';
    for (let i = 0; i < db.length; i++) {
        st += db[i].id + ' | ' + db[i].name + ' | ' + db[i].quantity + ' | ' + db[i].price + ' | ' + db[i].quantity*db[i].price + '</br>';
    }
    return st;
} 