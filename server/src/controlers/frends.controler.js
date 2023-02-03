const controler = require('./controler');
const {Frends} = require("../models");

module.exports = {
    ...controler(Frends),
}