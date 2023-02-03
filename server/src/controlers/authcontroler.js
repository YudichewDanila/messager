const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {secretkey} = require('.././config');
const bcrypt = require('bcryptjs');
const generateAccessToken = (id, name, surname )=>{
    const payload = {
        id,
        name,
        surname,
    }
    return jwt.sign(payload, secretkey, {expiresIn:"24h"})
}

const authcontroler = (model) =>({
   
    async registration(req, res){     
        try{
        const eror = validationResult(req); 
        if(!eror.isEmpty()){return res.status(400).json({message:eror.errors})}  
        const {inputLogin, inputSurname, inputName, inputPassword} = req.body;
        const candidat = await model.findOne({Login:inputLogin});
        if(candidat){return res.status(400).json({message:'Пользователь с таким логином уже существует'})}
        let password = bcrypt.hashSync(inputPassword, 5);
        const user = new model({Name:inputName, Surname:inputSurname, FullName:inputName+' '+ inputSurname, Login:inputLogin, Password:password});
        await user.save();
        res.status(200).json({message:'Пользователь зарегистрирован!', status:200});
        }catch(e){
            console.log('Ошибка:'+e);
            res.status(400).json({message:'Ошибка'+e});
        }
    },

    async authorization(req, res){
        try{
        const {inputLogin, inputPassword} = req.body;
        const user = await model.findOne({Login:inputLogin});
        if(!user){return res.status(400).json({message:'Пользователь не найден, возможно вы ввели не правельный логин или пароль'});}
        const validPassword = bcrypt.compareSync(inputPassword, user.Password);
        if(!validPassword){return res.status(400).json({message:'Пользователь не найден, возможно вы ввели не правельный логин или пароль'});}
        const token = generateAccessToken(user._id, user.Name, user.Surname);
        return res.status(200).json({token});
        }catch(e){
            console.log('Ошибка:'+e);
            res.status(400).json({message:'Ошибка'+e});
        }
    }
})

module.exports = authcontroler;