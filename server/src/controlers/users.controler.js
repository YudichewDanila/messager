const controler = require('./controler');
const authcontroler = require('./authcontroler');
const {Users} = require("../models");

module.exports = {
    ...controler(Users),
    ...authcontroler(Users),
}