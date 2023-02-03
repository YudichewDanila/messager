module.exports = (app) =>{
    const {check} = require("express-validator");
    const authmiddleware = require("../middlewaree/authmiddleware");
    const {users, messeges, frend} = require('../controlers');
    app.route('/user').post(authmiddleware, users.get);
    app.route('/registrationuser').post([
        check('inputLogin', 'Логин не должен быть пустым').notEmpty(),
        check('inputName', 'Имя не должно быть пустым').notEmpty(),
        check('inputSurname', 'Фамилия не должна быть пустой').notEmpty(),
        check('inputPassword', 'Пароль должен быть больше 2-х символов').isLength({min:2}),
    ],users.registration);
    app.route('/auth').post(users.authorization);
    app.route('/serch').post(users.serchUser);
    app.route('/getUserProfile').post(authmiddleware, users.getUserProfile);
    app.route('/updateUserProfile').post(users.updateUserProfile);
    app.route('/addAvatar').post(users.updateUserImage);
    app.route('/messeges').post(messeges.getMesseges);
    app.route('/addfrend').post(frend.addFrend);
    app.route('/updatestatusfrend').put(frend.UpdateStatusFrend);
    app.route('/getfrend').get(frend.getFrend);
}