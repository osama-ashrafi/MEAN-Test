var express = require('Express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/test");


var categoryRoute = require('./Category/category');
var productRoute = require('./Product/product');

//both index.js and things.js should be in same directory
app.use('/category', categoryRoute);
app.use('/product', productRoute);


app.listen(3000);