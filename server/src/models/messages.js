const {model, Schema, Schema:{Types:{ObjectId}}} = require('mongoose');
const schema = new Schema({
idUser:{
    type:ObjectId
},
idToUser:{
    type:ObjectId
},
message:{
    type:String,
    default:''
}
});
module.exports = model('messages', schema);