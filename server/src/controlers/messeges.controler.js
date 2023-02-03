const controler = require('./controler');
const {Messages} = require("../models");

module.exports = {
    ...controler(Messages),
}