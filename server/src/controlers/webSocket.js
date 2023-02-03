const ws = require('ws');
const {Messages} = require("../models");
module.exports = (WebSocetServer) =>{

    WebSocetServer.on('connection',function connection(ws){
      
        ws.on('message', function(message){
            message = JSON.parse(message);
            let idUser = message.id;
            let ToidUser = message.idto;
          
            switch (message.event){
                case 'connect':
                    ws.id = message.id;    
                break;
                case 'message':
                    MessageToUser(message, idUser, ToidUser)
                break;
                case 'updatedata':
                    UpdataData(message, idUser, ToidUser)
                break;
            }
        })
        function MessageToUser(message, idUser, ToidUser){
            
            WebSocetServer.clients.forEach(client=>{
                if(client.id === idUser || client.id === ToidUser ){
                    client.send(JSON.stringify(message));
                }
            })
            const mes = new Messages({idUser:idUser, idToUser:ToidUser, message:message.message});
            mes.save();
        }

        function UpdataData(message, idUser, ToidUser){
         
            WebSocetServer.clients.forEach(client=>{
                if(client.id === idUser || client.id === ToidUser ){
                    client.send(JSON.stringify(message));
                }
            })
        }
        
    })
}

