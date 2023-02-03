const jwt = require('jsonwebtoken');
const {secretkey} = require('../config');
module.exports = (req, res, next)=>{
    if(req.method === "OPTIONS"){
        next();
    }

    try{
       
        const token = req.headers.authorization.split(' ')[1];

        if(!token){ 
        console.log('Пользователь не авторизован');
        return res.status(403).json({message:'Пользователь не авторизован'});
    }
        const decodedData = jwt.verify(token, secretkey);
        req.user = decodedData;
        next();
    }catch(e){
        console.log('Пользователь не авторизован');
        return res.status(403).json({message:'Пользователь не авторизован'});
    };
}