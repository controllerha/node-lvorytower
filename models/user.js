var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test',{useMongoClient:true});
var userSchema = new Schema({

});
//先占页。。。
module.exports = mongoose.model('User',userSchema);