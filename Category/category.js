var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  parent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }],
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
});

categorySchema.virtual('child_categories', {
  ref: 'categories',
  localField: '_id',
  foreignField: 'parent'
});


const category = mongoose.model('categories', categorySchema);

router.get('/', function(req, res){
  category.find().populate('child_categories').exec(function(error, categories){
    if(error) {
      console.log(JSON.stringify(error));
      res.status(400).send("database error");
    }
    res.json(categories);
  })
});


router.post('/', function(req, res){
  var myData;
  debug.collection('categories').findOne({name: req.parentName})
  .then(data => {
    var parentData = data;
    myData  = {
      parent = parentData,
      name = req.name
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

//export this router to use in our index.js
module.exports = router;