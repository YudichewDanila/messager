const {model, Schema, Schema:{Types:{ObjectId}}} = require('mongoose');
const schema = new Schema({
idUser:{
    type:ObjectId
},
idToUser:{
    type:ObjectId
},

idToUserName:{
    type:String,
    default:''
},

 idToUserSurname:{
    type:String,
    default:''
 },

  idToUserImageAvatar:{
    type:String,
    default:''
  },

status:{
    type:String,
    default:''
}
});
module.exports = model('frends', schema);