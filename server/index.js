const express = require('express');
const cors = require('cors');
const mongobd = require("mongoose");

const ws = require('ws');
const fileUpload = require('express-fileupload');
const routes = require('./src/route');
const webSocket = require('./src/controlers/webSocket');
const PORT = 8082;
const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(fileUpload({}));
app.listen(PORT,()=>{console.log('Server start'+ PORT)});

const {mongoDb} = require('./src/config');
mongobd.connect(mongoDb);

routes(app);


const WebSocetServer = new ws.Server({
    port:8083,
},()=>{
  console.log('WebSocetServer start!');  
})
webSocket(WebSocetServer);