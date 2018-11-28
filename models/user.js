var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/lvorytower',{useMongoClient:true});
var userSchema = new Schema({
    num_value:{
        type:String,
        required:true
    },
    pwd_value:{
        type:String,
        required:true
    },
    email_value:{
        type:String,
        required:true
    },
    head_portrait:{
        type:String,
        default:'/public/images/head_portrait/head_main.png'
    }

});
//先占页。。。
module.exports = mongoose.model('User',userSchema);