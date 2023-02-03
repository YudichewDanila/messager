const path = require('path');
const fs = require('fs');
const {Frends} = require("../models");
const controler = (model) =>({
    async get(req,res){
        try{
             const user = req.user;
          const item = await Frends.find({$and:[{idToUser:{$ne:user.id}}, {idUser:user.id}, {status:2}]});
            return res.status(200).send(item);
        }catch(err){
            console.log('Ошибка:'+err);
        }
    },

    async serchUser(req, res){
        try{
            let serchValue = req.body.serchValue;   
            let idUser = req.body.idUser;    
      let item = await model.find( {$text: { $search: serchValue }},{Surname:1, Name:1, ImageAvatar:1} ); 
      item = item.filter(i=> i.id != idUser);
      let frends = await Frends.find({idUser:idUser});
     if(frends.length != 0){
        for(let i = 0; i < frends.length; i++){
            item = item.filter(it => it.id != frends[i].idToUser);
        }
     }
      return res.status(200).send(item);

        }catch(err){
            console.log('Ошибка:'+err);
        }
    },
    async getUserProfile(req, res){
        try{
            const user = req.user; 
            let User = await model.find({_id:user.id});
            user.image = User[0].ImageAvatar;
            return res.status(200).json(user);
        }catch(err){
            console.log('Ошибка:'+err); 
        }
    },

    async getMesseges(req, res){
        try{
            const item = await model.find({$or: [{$and : [{idUser:req.body.idChat.id},{idToUser:req.body.toidChat.id}]},{$and : [{idToUser:req.body.idChat.id},{idUser:req.body.toidChat.id}]}]});
            return res.status(200).send(item);
        }catch(err){
            console.log('Ошибка:'+err); 
        }  
    },

    async updateUserProfile(req, res){
        try{
            let {Id, Surname, Name, Image} = req.body;

            await model.updateOne({_id:Id}, {Name:Name, Surname:Surname, Image:Image});
            let item = await model.findOne({_id:Id});
            item = {
                Name:item.Name,
                Surname:item.Surname,
                Image:item.ImageAvatar,
            }

            return res.status(200).send(item);
        }catch(err){
            console.log('Ошибка:'+err); 
        }    
    },

    async updateUserImage(req, res){
        try{
            const image = req.files.file;  
            const homedirectory = path.resolve(__dirname);
            let typeimage = image.mimetype;
            typeimage = typeimage.replace('image/','');
            const pathLoader = `${homedirectory}/../../../client/src/assets/img/avatarlist/${image.name}.${typeimage}`;
            fs.writeFile(pathLoader, image.data, (err)=>{
                if(err){
                    console.log(err)
                    return
                }
                
            })
            let imgname = `${image.name}.${typeimage}`;
            await model.updateOne({_id:image.name}, {ImageAvatar:imgname});
        }catch(e){
            console.log(e);
        }
    },

    async addFrend(req, res){
        try{
            const frend = req.body;
            const item = await model.find({$and: [{idUser:frend.idUser},{idToUser:frend.idToUser}]});

            if(item.length == 0){
            const frends = new model({idUser:frend.idUser, idToUser:frend.idToUser, idToUserName:frend.Name, idToUserSurname:frend.Surname, idToUserImageAvatar:frend.ImageAvatar, status:frend.status});
            const frends2 = new model({idUser:frend.idToUser, idToUser:frend.idUser, idToUserName:frend.Name2, idToUserSurname:frend.Surname2, idToUserImageAvatar:frend.ImageAvatar2, status:1});
            await frends.save();
            await frends2.save();
            let status = {status:200}
            return res.status(200).send(status);
            }
            
        }catch(e){
            console.log(e);
        }
    },

    async getFrend(req, res){
        try{
           let frends = req.query;
           let item = await model.find({idUser:frends.idUser});
           return res.status(200).send(item);
        }catch(e){
            console.log(e);
        }
    },

    async UpdateStatusFrend(req, res){
        try{
           let data = req.body;
           switch(data.status){
            case 2:
            await model.updateOne({idUser:data.usertoid, idToUser:data.userid}, {$set:{status:data.status}});
            await model.updateOne({idUser:data.userid, idToUser:data.usertoid}, {$set:{status:data.status}});
            break;
            case 3:
                await model.deleteOne({idUser:data.usertoid, idToUser:data.userid});
                await model.deleteOne({idUser:data.userid, idToUser:data.usertoid});
            break;
            
           }
         }catch(e){
             console.log(e);
         }
         finally{
            let item = {status:200}
            return res.status(200).send(item);
         }
    }

    })
    
    module.exports = controler;