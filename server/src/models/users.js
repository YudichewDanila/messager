const {model, Schema} = require('mongoose');
let schema = new Schema({
    Surname:{
        type:String,
        default:''
    },
    Name:{
        type:String,
        default:''
    },
    FullName:{
        type:String,
        default:''
    },
    ImageAvatar:{
        type:String,
        default:''
    },
    Login:{
        type:String,
        default:''
    },
    Password:{
        type:String,
        default:''
    },
    
   
});


schema.index( {FullName: "text"});



module.exports = model('users', schema);



