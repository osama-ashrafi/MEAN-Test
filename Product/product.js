var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;



const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  childCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }]
});


const product = mongoose.model('products', productSchema);


router.get('/:category', function(req, res){
  var category = req.params.category;
  product.find({$in: {"child_Category": [category]}}).exec(function(error, productsList){
    if(error) {
      console.log(JSON.stringify(error));
      res.status(400).send("database error");
    }
    res.json(productsList);
  })
});



router.post('/', function(req, res){
  var myData,childCategory;
  
  product.find({name: { $in: [ req.category.map(item=> item.name) ] }})
  .then(data => {
    childCategory = data;
    myData  = {
      childCategory = childCategory,
      name = req.body.name,
      price = req.body.price
    }
  })
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


router.put('/', function(req, res){
  var myData,childCategory;
  
  myData  = {
    childCategory = req.body.childCategory,
    name = req.body.name,
    price = req.body.price
  }
  
  product.findOneAndUpdate({childCategory: myData.childCategory}, {name: myData.name, price: myData.price})
  .exec(function(error, data){
    if(error) {
      console.log(error);
      res.status(400).send("unable to update to database");
    }
    res.status(201).send('Entry updated!!');
  })
 
});

//export this router to use in our index.js
module.exports = router;